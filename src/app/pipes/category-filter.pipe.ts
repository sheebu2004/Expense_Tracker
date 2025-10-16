import { Pipe, PipeTransform } from '@angular/core';
import { Expense } from '../models/expense.model';

@Pipe({
  name: 'categoryFilter',
  standalone: true
})
export class CategoryFilterPipe implements PipeTransform {
  transform(expenses: Expense[], category: string): Expense[] {
    if (!category) return expenses;
    return expenses.filter(exp => exp.category === category);
  }
}
