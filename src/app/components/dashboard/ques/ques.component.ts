import { Component, OnInit } from '@angular/core';
import { HttpRequestService } from 'src/app/common-services/http-request.service';

@Component({
  selector: 'app-ques',
  templateUrl: './ques.component.html',
  styleUrls: ['./ques.component.scss'],
})
export class QuesComponent implements OnInit {
  productData: any;

  constructor(private http: HttpRequestService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    try {
      this.http
        .request('get', 'https://db.ezobooks.in/kappa/image/task', null)
        .subscribe((response: any) => {
          this.productData = response.items;
        });
    } catch (error) {}
  }
}
