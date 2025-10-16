import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { ExpenseFormComponent } from './components/expense-form/expense-form.component';
import { ExpenseListComponent } from './components/expense-list/expense-list.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'expense-form', component: ExpenseFormComponent },
  { path: 'expense-list', component: ExpenseListComponent },
   { path: 'reports', component: ReportsComponent },
  { path: '**', redirectTo: '' } // fallback
];
