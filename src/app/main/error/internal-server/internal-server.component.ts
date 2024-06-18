import { Component, OnInit } from '@angular/core';
import { CoreConfigService } from '@core/services/config.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-internal-server',
  templateUrl: './internal-server.component.html',
  styleUrls: ['./internal-server.component.scss']
})
export class InternalServerComponent implements OnInit {

  public coreConfig: any;

  // Private
  private unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {CoreConfigService} coreConfigService
   */
  constructor(private coreConfigService: CoreConfigService) {
    this.unsubscribeAll = new Subject();

    // Configure the layout
    this.coreConfigService.config = {
      layout: {
        navbar: {
          hidden: true
        },
        footer: {
          hidden: true
        },
        menu: {
          hidden: true
        },
        customizer: false,
        enableLocalStorage: false
      }
    };
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Subscribe to config changes
    this.coreConfigService.config.pipe(takeUntil(this.unsubscribeAll)).subscribe(config => {
      this.coreConfig = config;
    });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

}
