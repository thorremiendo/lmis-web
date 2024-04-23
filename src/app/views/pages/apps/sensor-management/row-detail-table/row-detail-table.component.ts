import { Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-row-detail-table',
  templateUrl: './row-detail-table.component.html',
  styleUrls: ['./row-detail-table.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RowDetailTableComponent implements OnInit {
  @Input() data: any;
  @ViewChild('myTable') table: any;

  rows: any[] = [];
  expanded: any = {};
  timeout: any;

  ColumnMode = ColumnMode;

  constructor() {
  }

  ngOnInit(): void {
    this.rows = this.data;
    this.rows.shift()
    console.log(this.rows, 'row data')

  }

  onPage(event: any) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      console.log('paged!', event);
    }, 100);
  }

  toggleExpandRow(row: any) {
    console.log('Toggled Expand Row!', row);
    this.table.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event: any) {
    console.log('Detail Toggled', event);
  }

}
