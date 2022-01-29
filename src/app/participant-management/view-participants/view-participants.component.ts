import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppConstants } from 'src/app/shared/app.constants';
import { DeleteConfirmDialogComponent } from 'src/app/_common/components/delete-confirm-dialog/delete-confirm-dialog.component';
import { ErrorDialogComponent } from 'src/app/_common/components/error-dialog/error-dialog.component';
import { AlertService } from 'src/app/_common/services/alert.service';
import { PariticipantService } from '../pariticipant.service';
declare var $:any;

@Component({
  selector: 'app-view-participants',
  templateUrl: './view-participants.component.html',
  styleUrls: ['./view-participants.component.scss']
})
export class ViewParticipantsComponent implements OnInit {

  allPariticipantList:any = []
  eventList: any = []
  statusList = AppConstants.participantStatus
  selectedEvent: any = "";
  firstLoad = true
  constructor(private participantSrvc: PariticipantService, private alertSrvc: AlertService, private dialog:MatDialog) { }

  ngOnInit() {
    this.getEventList()
  }

  getAllParticipants(eventId: number) {
    this.participantSrvc.getAllParticipantList(eventId).subscribe(res => {
      if(!res.error) {
        this.allPariticipantList = res.data
        if(this.allPariticipantList.length ) {
          if(this.firstLoad) {
            this.firstLoad = false
            this.initiateDataTable()
          }
          
        } else {
          const dialogRef = this.dialog.open(ErrorDialogComponent, {
            width: '400px',
            disableClose: true,
            data: {message: "No participants requested for this event"}
          });
        }
        
      }
      
    })
  }


  getEventList() {
    this.participantSrvc.getEventList().subscribe(res => {
      if(!res.error) {
        this.eventList = res.data
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

  approveRejectParticipant(id: number, status:number) {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      width: '400px',
      disableClose: true,
      data: {message: `Are you sure to ${status == 2? 'approve': 'reject'} this participant?`}
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   if(result) {
    //     this.participantSrvc.appro(id).subscribe(res => {
    //       if(!res.error) {
    //         this.alertSrvc.success("Ticket deleted successfully.")
    //         this.tmSrvc.getAllTicketList(this.selectedEvent).subscribe(res => {
    //           if(!res.error) {
    //             this.allTicketList = res.data
    //           }
              
    //         })
    //       }
          
    //     })
    //   }
    // })
  }



  getEventNameById(id: number) {
    return this.eventList.filter((d: any) => d.id == id)[0]?.name
  }


}
