import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppConstants } from 'src/app/shared/app.constants';
import { DeleteConfirmDialogComponent } from 'src/app/_common/components/delete-confirm-dialog/delete-confirm-dialog.component';
import { AlertService } from 'src/app/_common/services/alert.service';
import { EmService } from '../em.service';
declare var $:any;

@Component({
  selector: 'app-view-events',
  templateUrl: './view-events.component.html',
  styleUrls: ['./view-events.component.scss']
})
export class ViewEventsComponent implements OnInit {

  allEventList:any = []
  statusList = AppConstants.eventStatus
  constructor(private emSrvc: EmService, private alertSrvc: AlertService, private dialog:MatDialog) { }

  ngOnInit() {
    this.getAllEvents()
  }

  getAllEvents() {
    this.emSrvc.getAllEventList().subscribe(res => {
      if(!res.error) {
        this.allEventList = res.data
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

  deleteById(id: number) {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      width: '400px',
      disableClose: true,
      data: {message: "Are you sure to delete the event?"}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.emSrvc.deleteById(id).subscribe(res => {
          if(!res.error) {
            this.alertSrvc.success("Event deleted successfully.")
            this.emSrvc.getAllEventList().subscribe(res => {
              if(!res.error) {
                this.allEventList = res.data
              }
              
            })
          }
          
        })
      }
    })
  }
}
