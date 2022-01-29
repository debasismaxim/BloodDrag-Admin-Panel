import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { DeleteConfirmDialogComponent } from 'src/app/_common/components/delete-confirm-dialog/delete-confirm-dialog.component';
import { AlertService } from 'src/app/_common/services/alert.service';
import { MmService } from '../mm.service';
declare var $: any

@Component({
  selector: 'app-view-members',
  templateUrl: './view-members.component.html',
  styleUrls: ['./view-members.component.scss']
})
export class ViewMembersComponent implements OnInit {

  allMemberList:any;
  firstLoad = true
  constructor(private mmSrvc: MmService, private alertSrvc: AlertService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllMembers()

  }

  changeUserStatus(status: number, memberId: number) {
    // this.mmSrvc.editMemberDetails({userId: memberId, status: status}).subscribe(res => {
    //   if(!res.error) {
    //     const msg = status==0 ? "Member deactivated successfully.": (status == 1 ? "Member Activated successfully.": "Member deleted successfully.")
    //     this.alertSrvc.success(msg)
    //     this.getAllMembers()
    //   }
      
    // })
    const warnMsg = status==0 ? "Are you sure to deactivate this memeber?": (status == 1 ? "Do you want to activate this member?": "Do you want to delete this member?")
      const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
        width: '400px',
        disableClose: true,
        data: {message: warnMsg}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if(result) {
          this.mmSrvc.editMemberDetails({userId: memberId, status: status}).subscribe(res => {
            if(!res.error) {
              const msg = status==0 ? "Member deactivated successfully.": (status == 1 ? "Member Activated successfully.": "Member deleted successfully.")
              this.alertSrvc.success(msg)
              this.getAllMembers()
            }
          })
        }
      })
  }

  getAllMembers() {
    this.mmSrvc.getAllMemberList().subscribe(res => {
      if(!res.error) {
        this.allMemberList = res.data
        if(this.firstLoad)
        this.initiateDataTable()
        this.firstLoad =false
      }
      
    })
  }

  deleteUser(memberId: any) {
    
    const warnMsg = "Are you sure to delete this member?"
      const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
        width: '400px',
        disableClose: true,
        data: {message: warnMsg}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if(result) {
          this.mmSrvc.deleteUser({userId: memberId}).subscribe(res => {
            if(!res.error) {
              const msg = "Member deleted successfully."
              this.alertSrvc.success(msg)
              this.getAllMembers()
            }
          })
        }
      })
  }

  initiateDataTable() {
    setTimeout(()=> {
      $('#member').DataTable({
        //DataTable Options
        "aaSorting": []
      });
    }, 200)
    
  }

  ngAfterViewInit() {
    
  }

}
