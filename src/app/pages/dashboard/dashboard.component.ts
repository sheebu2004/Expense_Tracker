import { Component, OnInit, ViewChild } from '@angular/core';
import { ExpenseFormComponent } from '../../components/expense-form/expense-form.component';
import { ExpenseListComponent } from '../../components/expense-list/expense-list.component';
import { Expense } from '../../models/expense.model';
import { NgChartsModule, BaseChartDirective } from 'ng2-charts';
import { ChartType, ChartData } from 'chart.js';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../components/header/header.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    ExpenseFormComponent,
    ExpenseListComponent,
    NgChartsModule,
    CommonModule,
    HeaderComponent
],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  expenses: Expense[] = [];

  public pieChartLabels: string[] = ['Food', 'Travel', 'Shopping', 'Bills', 'Other'];
  public pieChartData: ChartData<'pie', number[], string> = {
    labels: ['Food', 'Travel', 'Shopping', 'Bills', 'Other'],
    datasets: [{ data: [] }]
  };
  public pieChartType: ChartType = 'pie';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  ngOnInit(): void {
    this.loadExpenses();
    this.updateChartData();
  }

  loadExpenses() {
    const data = localStorage.getItem('expenses');
    this.expenses = data ? JSON.parse(data) : [];
  }

  updateChartData() {
    const totals = { Food: 0, Travel: 0, Shopping: 0, Bills: 0, Other: 0 };
    this.expenses.forEach(exp => {
      totals[exp.category as keyof typeof totals] += exp.amount;
    });

    this.pieChartData.datasets[0].data = Object.values(totals);

    // ✅ Force refresh the chart
    this.chart?.update();
  }

  refreshChart() {
    this.loadExpenses();
    this.updateChartData();
  }
}
