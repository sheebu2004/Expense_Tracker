import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Expense } from '../../models/expense.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-expense-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './expense-form.component.html',
  styleUrl: './expense-form.component.scss'
})
export class ExpenseFormComponent {
  @Output() expenseAdded = new EventEmitter<void>();
  expenseForm: FormGroup;
  isCustomCategory = false;

  constructor(private fb: FormBuilder) {
    this.expenseForm = this.fb.group({
      title: ['', Validators.required],
      amount: [null, [Validators.required, Validators.min(1)]],
      category: ['', Validators.required],
      customCategory: [''], // 👈 custom category field
      date: ['', Validators.required]
    });
  }

  onCategoryChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.isCustomCategory = value === 'Custom';

    if (this.isCustomCategory) {
      this.expenseForm.get('customCategory')?.setValidators([Validators.required]);
    } else {
      this.expenseForm.get('customCategory')?.clearValidators();
      this.expenseForm.get('customCategory')?.reset();
    }

    this.expenseForm.get('customCategory')?.updateValueAndValidity();
  }

  onSubmit() {
    if (this.expenseForm.valid) {
      const categoryValue =
        this.expenseForm.value.category === 'Custom'
          ? this.expenseForm.value.customCategory
          : this.expenseForm.value.category;

      const newExpense: Expense = {
        id: Date.now().toString(),
        title: this.expenseForm.value.title,
        amount: this.expenseForm.value.amount,
        category: categoryValue,
        date: this.expenseForm.value.date
      };

      const expenses = JSON.parse(localStorage.getItem('expenses') || '[]');
      expenses.push(newExpense);
      localStorage.setItem('expenses', JSON.stringify(expenses));

      this.expenseForm.reset();
      this.isCustomCategory = false;

      alert('✅ Expense added successfully!');
      this.expenseAdded.emit();
    }
  }
}
