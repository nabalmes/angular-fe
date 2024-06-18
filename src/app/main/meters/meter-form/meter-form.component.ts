import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-meter-form',
  templateUrl: './meter-form.component.html',
  styleUrls: ['./meter-form.component.scss']
})
export class MeterFormComponent implements OnInit {

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
            name: 'Meters',
            isLink: true,
            link: '/meters'
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
