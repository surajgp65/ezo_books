import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuesComponent } from './ques/ques.component';
import { DepositComponent } from './deposit/deposit.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  { path: 'ques', component: QuesComponent },
  { path: 'deposit', component: DepositComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
