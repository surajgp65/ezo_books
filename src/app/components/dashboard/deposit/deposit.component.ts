import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.scss'],
})
export class DepositComponent implements OnInit {
  add2000: any = '';
  add500: any = '';
  add200: any = '';
  add100: any = '';

  total2000: any = 0;
  total500: any = 0;
  total200: any = 0;
  total100: any = 0;

  totalCount: any = 0;
  withdrawal: any;

  logs: any[] = [];

  constructor() {}

  ngOnInit(): void {}

  depositMoney() {
    let depositedAmount =
      this.add2000 * 2000 +
      this.add500 * 500 +
      this.add200 * 200 +
      this.add100 * 100;

    this.totalCount += depositedAmount;
    this.total2000 += Number(this.add2000); // Convert to number before adding
    this.total500 += Number(this.add500);
    this.total200 += Number(this.add200);
    this.total100 += Number(this.add100);

    this.logs.push({
      type: 'deposit',
      message: `Deposited:  2000: ${this.add2000}, 500: ${this.add500}, 200: ${this.add200}. 100: ${this.add100}`,
      timestamp: new Date(),
    });

    // Reset input fields
    this.add2000 = '';
    this.add500 = '';
    this.add200 = '';
    this.add100 = '';
  }

  withdraw() {
    const requestedAmount = this.withdrawal;

    if (requestedAmount <= this.totalCount) {
      // Calculate the number of denominations to be withdrawn
      let withdraw2000 = Math.floor(requestedAmount / 2000);
      let withdraw500 = Math.floor((requestedAmount % 2000) / 500);
      let withdraw200 = Math.floor(((requestedAmount % 2000) % 500) / 200);
      let withdraw100 = Math.floor(
        (((requestedAmount % 2000) % 500) % 200) / 100
      );

      // Check if the required denominations are available for withdrawal
      if (
        withdraw2000 <= this.total2000 &&
        withdraw500 <= this.total500 &&
        withdraw200 <= this.total200 &&
        withdraw100 <= this.total100
      ) {
        // Update the machine state
        this.total2000 -= withdraw2000;
        this.total500 -= withdraw500;
        this.total200 -= withdraw200;
        this.total100 -= withdraw100;
        this.totalCount -= requestedAmount;

        console.log('Withdrawn denominations:');
        console.log('2000:', withdraw2000);
        console.log('500:', withdraw500);
        console.log('200:', withdraw200);
        console.log('100:', withdraw100);

        this.logs.push({
          type: 'withdraw_success',
          message: 'Withdrawn: ' + requestedAmount,
          timestamp: new Date(),
        });
      } else {
        this.logs.push({
          type: 'withdraw_failed',
          message: 'Cannot Withdraw',
          timestamp: new Date(),
        });
      }
      this.withdrawal = '';
    } else {
      this.logs.push({
        type: 'withdraw_failed',
        message: 'Cannot Withdraw',
        timestamp: new Date(),
      });
    }
    // Reset input fields
    this.add2000 = '';
    this.add500 = '';
    this.add200 = '';
    this.add100 = '';
  }
}
