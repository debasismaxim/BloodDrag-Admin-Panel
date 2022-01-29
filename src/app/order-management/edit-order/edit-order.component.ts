import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AppConstants } from 'src/app/shared/app.constants';
import { DeleteConfirmDialogComponent } from 'src/app/_common/components/delete-confirm-dialog/delete-confirm-dialog.component';
import { AlertService } from 'src/app/_common/services/alert.service';
import { environment } from 'src/environments/environment';
import { OmService } from '../om.service';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.scss']
})
export class EditOrderComponent implements OnInit {

  orderId:any
  orderDetails:any
  productImageBaseUrl = environment.baseUrl + "/uploads/products/"
  orderStatusList:any = AppConstants.orderStatus;
  constructor(private omSrvc: OmService, private activeRoute: ActivatedRoute, 
    private fb: FormBuilder, private alertSrvc: AlertService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.orderId = this.activeRoute.snapshot.params['orderId'];
    this.getOrderDetails(this.orderId)
  }

  getOrderDetails(id: number) {
    this.omSrvc.getOrderDetails(id).subscribe(res => {
      if(!res.error) {
        this.orderDetails = res.data;
      }
    })
  }

  updateOrderStatus(updatedStatus: number , objId: string) {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      width: '400px',
      disableClose: true,
      data: {message: "Are you sure to update status?"}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        let payLoad = {
          id: objId,
          orderStatus: updatedStatus
        }
        this.omSrvc.updateOrderDetails(payLoad).subscribe((res:any) => {
          this.alertSrvc.success(res.message)
        })
      }
    })
  }

}
