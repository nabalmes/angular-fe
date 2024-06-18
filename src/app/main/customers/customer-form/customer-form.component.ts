import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent implements OnInit {

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
            name: 'Customers',
            isLink: true,
            link: '/customers'
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
