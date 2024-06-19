import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.scss']
})
export class FamilyComponent implements OnInit {


  public contentHeader: object;

  constructor() { }

  ngOnInit(): void {
    this.contentHeader = {
      headerTitle: 'Family',
      actionButton: false,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'family',
            isLink: false
          },
        ]
      }
    }
  }
}