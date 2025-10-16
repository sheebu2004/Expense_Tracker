import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Expense } from '../../models/expense.model';
import { CategoryFilterPipe } from '../../pipes/category-filter.pipe';
import { TotalAmountPipe } from '../../pipes/total-amount.pipe';

@Component({
  selector: 'app-expense-list',
  standalone: true,
  imports: [CommonModule, FormsModule, CategoryFilterPipe, TotalAmountPipe],
  templateUrl: './expense-list.component.html',
  styleUrl: './expense-list.component.scss'
})
export class ExpenseListComponent implements OnInit {
  @Output() expenseChanged = new EventEmitter<void>();

  expenses: Expense[] = [];
  selectedCategory: string = '';

  // Edit variables
  editId: string | null = null;
  editTitle = '';
  editAmount: number | null = null;
  editCategory = '';
  editDate = '';

  ngOnInit() {
    this.loadExpenses();
  }

  loadExpenses() {
    const data = localStorage.getItem('expenses');
    this.expenses = data ? JSON.parse(data) : [];
  }

  deleteExpense(id: string) {
    this.expenses = this.expenses.filter(exp => exp.id !== id);
    localStorage.setItem('expenses', JSON.stringify(this.expenses));
    this.expenseChanged.emit();
  }

  startEdit(exp: Expense) {
    this.editId = exp.id;
    this.editTitle = exp.title;
    this.editAmount = exp.amount;
    this.editCategory = exp.category;
    this.editDate = exp.date;
  }

  saveEdit() {
    if (!this.editId) return;

    this.expenses = this.expenses.map(exp => {
      if (exp.id === this.editId) {
        return {
          id: this.editId,
          title: this.editTitle,
          amount: this.editAmount || 0,
          category: this.editCategory,
          date: this.editDate
        };
      }
      return exp;
    });

    localStorage.setItem('expenses', JSON.stringify(this.expenses));
    this.cancelEdit();
    this.expenseChanged.emit();
  }

  cancelEdit() {
    this.editId = null;
    this.editTitle = '';
    this.editAmount = null;
    this.editCategory = '';
    this.editDate = '';
  }
}
