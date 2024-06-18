import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {

  public contentHeader: object;

  constructor() { }

  ngOnInit(): void {
    this.contentHeader = {
      headerTitle: 'Accounts',
      actionButton: false,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Accounts',
            isLink: false
          },
        ]
      }
    }
  }

}
