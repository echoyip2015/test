import { Component } from '@angular/core';

import { TestService } from '../test.service';
import { Observable } from 'rxjs';
import { ColumnMode } from '@swimlane/ngx-datatable';


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

  ColumnMode = ColumnMode;

  constructor(private testService: TestService) {
    
    this.fetch((data:any) => {
      this.rows = data;
      setTimeout(() => {
        this.loadingIndicator = false;
      }, 5000);
    });
  }

  fetch(cb:any) {
    const _this =this
    let sdata = {"_start": 0, "_limit":10, "_sort": this.sort, "_order": 'ASC'};
    _this.testService.getBackendData(sdata).subscribe(
       succ => {
         // refresh the list
         return succ;
       },
       error => {
        this.defult((data:any) => {
          this.rows = data;
        });
         console.error("Error search!");
       }
    );
  }

  defult(cb:any){
    const req = new XMLHttpRequest();
    req.open('GET', `assets/test.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

}
