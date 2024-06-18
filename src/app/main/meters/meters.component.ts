import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-meters',
  templateUrl: './meters.component.html',
  styleUrls: ['./meters.component.scss']
})
export class MetersComponent implements OnInit {

  public contentHeader: object;

  constructor() { }

  ngOnInit(): void {
    this.contentHeader = {
      headerTitle: 'Meters',
      actionButton: false,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Meters',
            isLink: false
          },
        ]
      }
    }
  }


}
