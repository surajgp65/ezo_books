import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { QuesComponent } from './ques/ques.component';
import { DepositComponent } from './deposit/deposit.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DashboardComponent,
    QuesComponent,
    DepositComponent,
    HomeComponent,
  ],
  imports: [CommonModule, DashboardRoutingModule, ScrollingModule, FormsModule],
})
export class DashboardModule {}
