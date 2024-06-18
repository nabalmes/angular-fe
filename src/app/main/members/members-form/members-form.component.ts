import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { APIService } from 'app/psgc-api';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import countries from '../../../../../assets/json/countries.json';
import zipcodes from 'assets/json/zipcodes.json';
import { NgForm } from '@angular/forms';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { MembersService } from 'app/api';
import { environment } from 'environments/environment';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-member-form',
  templateUrl: './members-form.component.html',
  styleUrls: ['./members-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MembersFormComponent implements OnInit {

  public contentHeader: object;
  public memberInfo: any = {
    id: null,
    firstName: null,
    middleName: null,
    lastName: null,
    suffixName: null,
    gender: null,
    birthdate: null,
    age: null,
    province: null,
    city: null,
    barangay: null,
    emailAddress: null,
    phoneNumber: null,
  }
  public submitted:boolean=false;

  private unsubscribeAll: Subject<any>;
  public provinceChoices = [];
  public cityChoices = [];
  public barangayChoices = [];
  public members: object;

  public customDateOptions: FlatpickrOptions = {
    altFormat: 'Y-m-d',
    altInput: true,
    maxDate: "today"
  }

  @ViewChild('memberForm') memberForm: NgForm;
  @BlockUI()blockUI:NgBlockUI;

  constructor(
    private activatedRoute: ActivatedRoute, 
    private datePipe: DatePipe,
    private psgiApiService: APIService,
    private changeDetector: ChangeDetectorRef,
    private memberService: MembersService,
    private toastr: ToastrService,
    private router: Router) { 
      this.unsubscribeAll = new Subject();
    }

  retrieveMemberDetails() {
    this.memberInfo = this.members ? this.members : null;
  }

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
            name: 'Members',
            isLink: true,
            link: '/members'
          },
          {
            name: breadcrumb,
            isLink: false
          }
        ]
      }
    }

    this.setAddressAPI();

    if (this.isEditRoute() || this.isViewRoute()){
      this.members = this.activatedRoute.snapshot.data
      ? this.activatedRoute.snapshot.data.Members.data
      : [];     

      this.retrieveMemberDetails();    
      this.customDateOptions.defaultDate = new Date(this.memberInfo.birthdate);        
    }    

    if (this.isViewRoute()){
      this.customDateOptions.clickOpens = false;
    }
  }

  setAddressAPI () {
    this.psgiApiService.provincesGet().pipe(takeUntil(this.unsubscribeAll)).subscribe(provinces => {
      this.provinceChoices = provinces.map(p => {
        return {name: p.name, code: p.code, isRegion: 0}
      });
  
       // added regions
      const addedRegions = [
        {name: 'Soccsksargen', code: '120000000', isRegion: 1  },
        {name: 'NCR', code: '130000000', isRegion: 1  },
        {name: 'Zamboanga Peninsula', code: '090000000', isRegion: 1  }
      ];
      this.provinceChoices = this.provinceChoices.concat(addedRegions);
      
      this.provinceChoices = this.provinceChoices.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
  
      if (this.memberInfo.city && this.memberInfo.barangay) {
        const provinceObj = this.provinceChoices.find(p => p.name === this.memberInfo.province);
        if (provinceObj.isRegion) {
          this.psgiApiService.regionsRegionCodeCitiesMunicipalitiesGet(provinceObj.code).pipe(takeUntil(this.unsubscribeAll)).subscribe(cities => {
            this.cityChoices = cities.map(c => {
              return {name: c.name, code: c.code}
            }).sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
  
            this.psgiApiService.citiesMunicipalitiesCityOrMunicipalityCodeBarangaysGet(this.cityChoices.find(p => p.name === this.memberInfo.city).code).pipe(takeUntil(this.unsubscribeAll)).subscribe(barangays => {
              this.barangayChoices = barangays.map(c => {
                return {name: c.name, code: c.code}
              }).sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
            });
          });
        } else {
          this.psgiApiService.provincesProvinceCodeCitiesMunicipalitiesGet(provinceObj.code).pipe(takeUntil(this.unsubscribeAll)).subscribe(cities => {
            this.cityChoices = cities.map(c => {
              return {name: c.name, code: c.code}
            }).sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
  
            this.psgiApiService.citiesMunicipalitiesCityOrMunicipalityCodeBarangaysGet(this.cityChoices.find(p => p.name === this.memberInfo.city).code).pipe(takeUntil(this.unsubscribeAll)).subscribe(barangays => {
              this.barangayChoices = barangays.map(c => {
                return {name: c.name, code: c.code}
              }).sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
            });
          });
        }
      }    
    });
  }

  onChangeProvince(event) {
    const target = event.target;
    const provinceCode = target.options[target.selectedIndex].getAttribute('data-value');
    // const provinceCode = this.provinceChoices.find(p => p.name === event).code;
    // console.log(provinceCode);
    this.cityChoices = [];
    this.barangayChoices = [];
    this.memberInfo.city = null;
    this.memberInfo.barangay = null;
    this.memberInfo.zipCode = null;

    this.psgiApiService.provincesProvinceCodeCitiesMunicipalitiesGet(provinceCode).pipe(takeUntil(this.unsubscribeAll)).subscribe(cities => {
      this.cityChoices = cities.map(c => {
        return {name: c.name, code: c.code}
      }).sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
    });
  }

  onChangeCity(event) {
    const target = event.target;
    const cityCode = target.options[target.selectedIndex].getAttribute('data-value');
    this.barangayChoices = [];
    this.memberInfo.barangay = null;
    this.memberInfo.zipCode = null;

    this.psgiApiService.citiesMunicipalitiesCityOrMunicipalityCodeBarangaysGet(cityCode).pipe(takeUntil(this.unsubscribeAll)).subscribe(barangays => {
      this.barangayChoices = barangays.map(c => {
        return {name: c.name, code: c.code}
      }).sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
    });
   
    this.memberInfo.zipCode = this.getZipCode(target.value);
  }

  getZipCode(location): string {
    return Object.keys(zipcodes).find((zipcode) => {
        const value = zipcodes[zipcode];
        if (typeof value === 'string') {
            return value === location;
        }
        return value.includes(location);
    }) || null;
  }

  onSubmit() {    
    this.submitted=true;
    console.log("Submitted!", this.memberInfo);

    if (this.members && this.memberInfo.id) {
      this.blockUI.start();
      this.memberService.apiVversionMembersUpdateMemberPut(
        environment.apiVersion, this.memberInfo)
        .pipe(takeUntil(this.unsubscribeAll))
        .subscribe((response) =>  {
        console.log("Response: ", response.data);
        this.blockUI.stop();
        this.router.navigate(['/members']);
      },(httpError: HttpErrorResponse) => {
        this.blockUI.stop();
        this.toastr.error("", httpError.error.Message, {
          timeOut: 3000,
          positionClass: "toast-bottom-center",
          toastClass: "toast ngx-toastr",
        });
      })
    }
    else {
      const { id, ...membersPOST } = this.memberInfo
      this.blockUI.start();
      this.memberService.apiVversionMembersCreateMemberPost(
        environment.apiVersion, membersPOST)
        .pipe(takeUntil(this.unsubscribeAll))
        .subscribe((response) =>  {
        console.log("Response: ", response.data);
        this.blockUI.stop();
        this.router.navigate(['/members']);
      },(httpError: HttpErrorResponse) => {
        this.blockUI.stop();
        this.toastr.error("", httpError.error.Message, {
          timeOut: 3000,
          positionClass: "toast-bottom-center",
          toastClass: "toast ngx-toastr",
        });
      })
    }    
  }

  


  isAddNewRoute(): boolean {
    const urlSegments = this.router.url.split("/");
    return (
      urlSegments.length >= 2 &&
      urlSegments[1] === "members" &&
      urlSegments[2] === "add"
    );
  }

  isEditRoute(): boolean {
    const urlSegments = this.router.url.split("/");
    return (
      urlSegments.length >= 2 &&
      urlSegments[1] === "members" &&
      urlSegments[2] === "edit"
    );
  }

  isViewRoute(): boolean {
    const urlSegments = this.router.url.split("/");
    return (
      urlSegments.length >= 2 &&
      urlSegments[1] === "members" &&
      urlSegments[2] === "view"
    );
  }

  

  onChangeBirthday(event) {
    this.memberInfo.birthdate =  this.datePipe.transform(event.target.value, "yyyy-MM-dd") + "T00:00:00.000Z";
      this.memberInfo.birthdate = Array.isArray(this.memberInfo.birthdate) ? this.memberInfo.birthdate[0] : this.memberInfo.birthdate;
    this.memberInfo.age = this.calculateAge(event.target.value);
  }

  calculateAge(dob) { 
    var diff_ms = Date.now() - new Date(dob).getTime();
    var age_dt = new Date(diff_ms); 
  
    return Math.abs(age_dt.getUTCFullYear() - 1970);
  }  

  ngAfterContentChecked(){
    this.changeDetector.detectChanges();
  }
}
