import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppConstants } from 'src/app/shared/app.constants';
import { DeleteConfirmDialogComponent } from 'src/app/_common/components/delete-confirm-dialog/delete-confirm-dialog.component';
import { AlertService } from 'src/app/_common/services/alert.service';
import { environment } from 'src/environments/environment';
import { OmService } from '../om.service';
declare var $:any

@Component({
  selector: 'app-view-tickets',
  templateUrl: './view-tickets.component.html',
  styleUrls: ['./view-tickets.component.scss']
})
export class ViewTicketsComponent implements OnInit {

  allOrderList:any = []
  statusList = AppConstants.cartStatus
  badgeImageBaseUrl = environment.baseUrl + "/uploads/tickets/"
  
  constructor(private omSrvc: OmService, private alertSrvc: AlertService, private dialog:MatDialog) { }

  ngOnInit() {
    this.getAllOrders()
  }

  getAllOrders() {
    this.omSrvc.getAllTicketPurchased().subscribe(res => {
      if(!res.error) {
        this.allOrderList = res.data
        console.log(this.allOrderList);
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

  // getBadgeType(key: number) {
  //   return this.badgeTypeList.filter((d: any) => d.key == key)[0]
  // }


}
