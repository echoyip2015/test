import { Component } from '@angular/core';

import { TestService } from '../test.service';
import { Observable } from 'rxjs';
import { ColumnMode } from '@swimlane/ngx-datatable/public-api';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent {

  rows = [];
  loadingIndicator = true;
  reorderable = true;
  sort = 'account_executive';
  columns = [
    { prop: 'Account Executives' },
    { prop: 'Daily Turnover'},
    { prop: 'Accumulated Turnover'}
  ];

  // ColumnMode = ColumnMode;

  constructor(private testService: TestService) {
    
  console.log(ColumnMode,'111')
    this.fetch((data:any) => {
      this.rows = data;
      setTimeout(() => {
        this.loadingIndicator = false;
      }, 5000);
    });
  }

  fetch(cb:any) {

    let sdata = {"_start": 0, "_limit":10, "_sort": this.sort, "_order": 'ASC'};
    this.testService.getBackendData(sdata).subscribe(
       succ => {
         console.log(succ)
         const _this = this;
         // refresh the list
         cb = succ
         return true;
       },
       error => {
         console.error("Error search!");
       }
    );
  }

}
