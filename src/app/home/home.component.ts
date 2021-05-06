import { Component, OnInit } from '@angular/core';

import { TestService } from '../test.service';
import { Observable, from } from 'rxjs';
import { ColumnMode } from '@swimlane/ngx-datatable';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  rows:any = [];
  loadingIndicator = true;
  reorderable = true;
  sort = 'account_executive';
  columns = [
    { name: 'Account Executive', prop: 'account_executive' },
    { name: 'Daily Turnover', prop:'accumulated_turnover'},
    { name: 'Accumulated Turnover', prop:'daily_turnover'}
  ];

  ColumnMode = ColumnMode;
  private timer:any;

  constructor(private testService: TestService) {
    this.timer = setInterval(() => {
      this.fetch();
      }, 5000)
  }

  ngOnInit (){
    this.fetch();
  }

  ngOnDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    
    }
  }

  fetch() {
    const _this = this
    const params = {"_start": 0,  "_sort": this.sort, "_order": 'ASC'}
    _this.testService.getBackendData(params).subscribe(
       resp => {
         // refresh the list
         _this.rows = resp;
       },
       error => {
         console.error("Error search!");
       }
    );
  }

  

}
