import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DeleteConfirmDialogComponent } from 'src/app/_common/components/delete-confirm-dialog/delete-confirm-dialog.component';
import { AlertService } from 'src/app/_common/services/alert.service';
import { MmService } from '../mm.service';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.scss']
})
export class MemberDetailsComponent implements OnInit {

  memberId: any;
  memberDetails: any;
  constructor(private router: Router, private activeRoute: ActivatedRoute, 
    private mmSrvc:MmService, private alertSrvc: AlertService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.memberId = this.activeRoute.snapshot.params['memberId'];
    this.getMemberDetails(this.memberId)
  }

  getMemberDetails(id: number) {
    this.mmSrvc.getMemberDetailsById(id).subscribe(res => {
      if(!res.error) {
        this.memberDetails = res.data;
        if(this.memberDetails.status == 2) {
          this.router.navigate(["/mm/view-members"])
        }
      }
      
    })
  }

  changeUserStatus(status: number) {
    
    const warnMsg = status==0 ? "Are you sure to deactivate this memeber?": (status == 1 ? "Are you sure to activate this member?": "Are you sure to delete this member?")
      const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
        width: '400px',
        disableClose: true,
        data: {message: warnMsg}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if(result) {
          this.mmSrvc.editMemberDetails({userId: this.memberId, status: status}).subscribe(res => {
            if(!res.error) {
              const msg = status==0 ? "Member deactivated successfully.": (status == 1 ? "Member Activated successfully.": "Member deleted successfully.")
              this.alertSrvc.success(msg)
              this.getMemberDetails(this.memberId)
            }
          })
        }
      })
  }

  deleteUser() {
    
    const warnMsg = "Are you sure to delete this member?"
      const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
        width: '400px',
        disableClose: true,
        data: {message: warnMsg}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if(result) {
          this.mmSrvc.deleteUser({userId: this.memberId}).subscribe(res => {
            if(!res.error) {
              const msg = "Member deleted successfully."
              this.alertSrvc.success(msg)
              this.router.navigate(['/mm/view-members'])
            }
          })
        }
      })
  }

}
