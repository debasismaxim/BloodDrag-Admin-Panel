import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppConstants } from 'src/app/shared/app.constants';
import { DeleteConfirmDialogComponent } from 'src/app/_common/components/delete-confirm-dialog/delete-confirm-dialog.component';
import { ErrorDialogComponent } from 'src/app/_common/components/error-dialog/error-dialog.component';
import { AlertService } from 'src/app/_common/services/alert.service';
import { TmService } from '../tm.service';
declare var $:any;

@Component({
  selector: 'app-view-tickets',
  templateUrl: './view-tickets.component.html',
  styleUrls: ['./view-tickets.component.scss']
})
export class ViewTicketsComponent implements OnInit {

  allTicketList:any = []
  eventList: any = []
  statusList = AppConstants.ticketStatus
  ticketTypeList:any[] = []
  selectedEvent: any = ""
  constructor(private tmSrvc: TmService, private alertSrvc: AlertService, private dialog:MatDialog) { }

  ngOnInit() {
    this.getEventList()
    this.getTicketTypeList()
  }

  getAllTickets(eventId: number) {
    this.tmSrvc.getAllTicketList(eventId).subscribe(res => {
      if(!res.error) {
        this.allTicketList = res.data
        if(this.allTicketList.length ) {
          this.initiateDataTable()
        } else {
          const dialogRef = this.dialog.open(ErrorDialogComponent, {
            width: '400px',
            disableClose: true,
            data: {message: "No tickets available for this event"}
          });
        }
        
      }
      
    })
  }

  getTicketTypeList() {
    this.tmSrvc.getTicketTypeList().subscribe(res => {
      if(!res.error) {
        this.ticketTypeList = res.data
      }
      
    })
  }

  getEventList() {
    this.tmSrvc.getEventList().subscribe(res => {
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

  deleteById(id: number) {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      width: '400px',
      disableClose: true,
      data: {message: "Are you sure to delete the ticket?"}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.tmSrvc.deleteById(id).subscribe(res => {
          if(!res.error) {
            this.alertSrvc.success("Ticket deleted successfully.")
            this.tmSrvc.getAllTicketList(this.selectedEvent).subscribe(res => {
              if(!res.error) {
                this.allTicketList = res.data
              }
              
            })
          }
          
        })
      }
    })
  }



  getEventNameById(id: number) {
    return this.eventList.filter((d: any) => d.id == id)[0]?.name
  }

  getTicketTypeById(id: number) {
    return this.ticketTypeList.filter((d: any) => d.id == id)[0]?.name
  }

}
