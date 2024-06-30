import { Component, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-landslide-inventory',
  templateUrl: './landslide-inventory.component.html',
  styleUrls: ['./landslide-inventory.component.scss']
})
export class LandslideInventoryComponent implements OnInit {
  public reportsData = []
  public loadingIndicator = true;
  public ColumnMode = ColumnMode;
  constructor() { }

  ngOnInit(): void {
  }

}
