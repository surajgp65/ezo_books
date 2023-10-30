import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.scss'],
})
export class DepositComponent implements OnInit {
  add: any = {
    add2000: 0,
    add500: 0,
    add200: 0,
    add100: 0,
  };

  total2000: any = 0;
  total500: any = 0;
  total200: any = 0;
  total100: any = 0;

  totalCount: any = 0;
  withdrawal: any;

  logs: any[] = [];

  constructor() {}

  ngOnInit(): void {}

  /* Deposit money */
  depositMoney() {
    let depositedAmount =
      this.add.add2000 * 2000 +
      this.add.add500 * 500 +
      this.add.add200 * 200 +
      this.add.add100 * 100;

    this.totalCount += depositedAmount;
    this.total2000 += Number(this.add.add2000); // Convert to number before adding
    this.total500 += Number(this.add.add500);
    this.total200 += Number(this.add.add200);
    this.total100 += Number(this.add.add100);

    this.logs.push({
      type: 'deposit',
      message: `Deposited:  2000: ${this.add.add2000 ?? '0'}, 500: ${
        this.add.add500 ?? '0'
      }, 
      200: ${this.add.add200 ?? '0'}, 100: ${this.add.add100 ?? '0'}`,
      timestamp: new Date(),
    });

    // Reset input fields
    this.add.add2000 = 0;
    this.add.add500 = 0;
    this.add.add200 = 0;
    this.add.add100 = 0;
  }

  withdraw() {
    const requestedAmount = this.withdrawal;

    if (
      requestedAmount >= 100 &&
      requestedAmount <= this.totalCount &&
      (requestedAmount % 100 < 1 || requestedAmount % 100 > 99)
    ) {
      let remainingAmount = requestedAmount;

      let withdraw2000 = Math.min(
        Math.floor(remainingAmount / 2000),
        this.total2000
      );
      remainingAmount -= withdraw2000 * 2000;

      let withdraw500 = Math.min(
        Math.floor(remainingAmount / 500),
        this.total500
      );
      remainingAmount -= withdraw500 * 500;

      let withdraw200 = Math.min(
        Math.floor(remainingAmount / 200),
        this.total200
      );
      remainingAmount -= withdraw200 * 200;

      let withdraw100 = Math.min(
        Math.floor(remainingAmount / 100),
        this.total100
      );

      if (
        withdraw2000 <= this.total2000 &&
        withdraw500 <= this.total500 &&
        withdraw200 <= this.total200 &&
        withdraw100 <= this.total100
      ) {
        this.total2000 -= withdraw2000;
        this.total500 -= withdraw500;
        this.total200 -= withdraw200;
        this.total100 -= withdraw100;
        this.totalCount -= requestedAmount;

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
    } else {
      this.logs.push({
        type: 'withdraw_failed',
        message: 'Cannot Withdraw',
        timestamp: new Date(),
      });
    }
    this.withdrawal = '';
    this.add.add2000 = 0;
    this.add.add500 = 0;
    this.add.add200 = 0;
    this.add.add100 = 0;
  }
}
