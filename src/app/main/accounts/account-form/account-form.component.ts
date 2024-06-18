import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.scss']
})
export class AccountFormComponent implements OnInit {

  public contentHeader: object;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const title = this.activatedRoute.snapshot.data.title;
    const breadcrumb = this.activatedRoute.snapshot.data.breadcrumb;

    this.contentHeader = {
      headerTitle: title,
      actionButton: false,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Accounts',
            isLink: true,
            link: '/accounts'
          },
          {
            name: breadcrumb,
            isLink: false
          }
        ]
      }
    }
  }

}
