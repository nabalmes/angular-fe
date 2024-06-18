import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { MembersService } from 'app/api';
import { environment } from 'environments/environment';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MembersComponent implements OnInit {

  public contentHeader: object;
  public rows = [];
  private unsubscribeAll:Subject<any>;
  public ColumnMode = ColumnMode;
  public SelectionType = SelectionType;

  constructor(private memberService: MembersService,
    private toastr: ToastrService) 
  {
    this.unsubscribeAll = new Subject();
   }

  @BlockUI() blockUI: NgBlockUI;
  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild("searchInput", { static: false }) searchInput: ElementRef;

  page = {
    pageNumber: 0,
    size: 10,
    totalCount: undefined,
    totalPages: undefined,
    search: null,
  };

  ngOnInit(): void {
    this.contentHeader = {
      headerTitle: 'Members',
      actionButton: false,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Members',
            isLink: false
          },
        ]
      }
    }

    this.setPage({offset: 0});
  }


  setPage(pageInfo) {
    this.page.pageNumber = pageInfo.offset;
    sessionStorage.setItem("lastPage", pageInfo.offset);
    this.blockUI.start();
    this.memberService.apiVversionMembersMembersListGet(
        environment.apiVersion,
        this.page.search,
        this.page.pageNumber + 1,
        this.page.size
      )
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(
        (response) => {
          console.log("Response: ", response.data);
          const { data, page, totalCount, totalPages } = response;
          this.rows = data.map((r) => {
            return r;
          });

          this.page.pageNumber = page - 1;
          this.page.totalCount = totalCount;

          this.blockUI.stop();
        },
        (httpError: HttpErrorResponse) => {
          this.blockUI.stop();
          this.toastr.error("", httpError.error.Message, {
            timeOut: 3000,
            positionClass: "toast-bottom-center",
            toastClass: "toast ngx-toastr",
          });
        }
      );
  }

  filterMembers(evt) {
    const val = evt.target.value;
    this.page.search = val;
    this.setPage({ offset: 0 });
  }

  deleteMember(memberId){ 
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#7367F0",
      cancelButtonColor: "#E42728",
      confirmButtonText: "Yes, delete it!",
      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-danger ml-1",
      },
    }).then((result) => {
      if (result.value) {
        this.blockUI.start();
        this.memberService.apiVversionMembersDeleteByIdDelete(environment.apiVersion, memberId)
        .pipe(takeUntil(this.unsubscribeAll))
        .subscribe(
          (response) => {
            console.log("Deleted successfully!");
            this.blockUI.stop();
            window.location.reload();
          },(httpError: HttpErrorResponse) => {
            this.blockUI.stop();
            this.toastr.error("", httpError.error.Message, {
              timeOut: 3000,
              positionClass: "toast-bottom-center",
              toastClass: "toast ngx-toastr",
            });
          });
          }});    
  }





}
