import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CustomersComponent implements OnInit {

  public contentHeader: object;

  constructor() { }

  ngOnInit(): void {
    this.contentHeader = {
      headerTitle: 'Customers',
      actionButton: false,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Customers',
            isLink: false
          },
        ]
      }
    }
  }


}
