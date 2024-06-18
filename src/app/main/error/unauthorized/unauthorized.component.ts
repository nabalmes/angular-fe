import { Component, OnInit } from '@angular/core';
import { CoreMenuService } from '@core/components/core-menu/core-menu.service';
import { CoreConfigService } from '@core/services/config.service';
import { AuthService } from 'app/common/services/auth.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.scss']
})
export class UnauthorizedComponent implements OnInit {

  public coreConfig: any;
  public homeUrl;

  // Private
  private unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {CoreConfigService} coreConfigService
   */
  constructor(private coreConfigService: CoreConfigService, private coreMenuService: CoreMenuService) {
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

    const menu = this.coreMenuService.getCurrentRoleMenu();
    if (menu.length > 0) {
      this.homeUrl = menu[0].url;
    }
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
