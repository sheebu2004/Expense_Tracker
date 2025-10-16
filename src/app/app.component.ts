import { Component } from '@angular/core';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    DashboardComponent // ✅ Only standalone components
  ],
  template: '<app-dashboard></app-dashboard>',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {}
