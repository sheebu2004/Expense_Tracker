import { Pipe, PipeTransform } from '@angular/core';
import { Expense } from '../models/expense.model';

@Pipe({
  name: 'totalAmount',
  standalone: true
})
export class TotalAmountPipe implements PipeTransform {
  transform(expenses: Expense[]): number {
    return expenses.reduce((sum, exp) => sum + exp.amount, 0);
  }
}
