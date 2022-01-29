import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppConstants } from 'src/app/shared/app.constants';
import { DeleteConfirmDialogComponent } from 'src/app/_common/components/delete-confirm-dialog/delete-confirm-dialog.component';
import { AlertService } from 'src/app/_common/services/alert.service';
import { environment } from 'src/environments/environment';
import { BadgeService } from '../badge.service';
declare var $:any;

@Component({
  selector: 'app-view-badges',
  templateUrl: './view-badges.component.html',
  styleUrls: ['./view-badges.component.scss']
})
export class ViewBadgesComponent implements OnInit {

  allBadgeList:any = []
  statusList = AppConstants.badgeStatus
  badgeTypeList = AppConstants.badgeTypes
  badgeImageBaseUrl = environment.baseUrl + "/uploads/badge_icons/"
  
  constructor(private badgeSrvc: BadgeService, private alertSrvc: AlertService, private dialog:MatDialog) { }

  ngOnInit() {
    this.getAllBadges()
  }

  getAllBadges() {
    this.badgeSrvc.getAllBadgeList().subscribe(res => {
      if(!res.error) {
        this.allBadgeList = res.data
        this.initiateDataTable()
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

  getStatus(key: number) {
    return this.statusList.filter((d: any) => d.key == key)[0]
  }

  getBadgeType(key: number) {
    return this.badgeTypeList.filter((d: any) => d.key == key)[0]
  }

  deleteById(id: number) {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      width: '400px',
      disableClose: true,
      data: {message: "Are you sure to delete the badge?"}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.badgeSrvc.deleteById(id).subscribe(res => {
          if(!res.error) {
            this.alertSrvc.success("Event deleted successfully.")
            this.badgeSrvc.getAllBadgeList().subscribe(res => {
              if(!res.error) {
                this.allBadgeList = res.data
              }
              
            })
          }
          
        })
      }
    })
  }

}
