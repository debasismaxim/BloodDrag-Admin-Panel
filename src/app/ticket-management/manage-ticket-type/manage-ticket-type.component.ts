import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmDialogComponent } from 'src/app/_common/components/delete-confirm-dialog/delete-confirm-dialog.component';
import { AlertService } from 'src/app/_common/services/alert.service';
import { TmService } from '../tm.service';
declare var $:any;

@Component({
  selector: 'app-manage-ticket-type',
  templateUrl: './manage-ticket-type.component.html',
  styleUrls: ['./manage-ticket-type.component.scss']
})
export class ManageTicketTypeComponent implements OnInit {

  updateTicketTypeForm:FormGroup;
  createTicketTypeForm: FormGroup;
  ticketTypeList:any[] = []
  constructor(private tmSrvc: TmService, private fb: FormBuilder, private alertSrvc: AlertService, private dialog:MatDialog) { }

  ngOnInit(): void {
    this.updateTicketTypeForm = this.fb.group({
      name: ['', Validators.required],
      id: [''],
      seq : [1]
    });
    this.createTicketTypeForm = this.fb.group({
      name: ['', Validators.required],
      seq : [1]
    });
    this.getTicketTypeList()
  }

  openUpdateModal(ticketType: any) {
    $("#updateTicketTypeModal").modal("show")
    this.updateTicketTypeForm.patchValue({
      id: ticketType.id,
      name: ticketType.name,
      seq : ticketType.seq ? ticketType.seq : 1
    })
  }

  getTicketTypeList() {
    this.tmSrvc.getTicketTypeList().subscribe(res => {
      if(!res.error) {
        this.ticketTypeList = res.data
        this.ticketTypeList.sort(function(a, b) {
          return parseFloat(a.seq) - parseFloat(b.seq);
      });
      }
      
    })
  }

  updateTicketTypes(id: number, f: any) {
    this.tmSrvc.updateTicketTypes( id, this.updateTicketTypeForm.value).subscribe(res => {
      if(!res.error) {
        // f.resetForm();
        $("#updateTicketTypeModal").modal("hide")
        this.alertSrvc.success("Ticket types updated successfully.")
        this.getTicketTypeList()
      }
      
    })
  }

  createTicketTypes( f: any) {
    this.tmSrvc.createTicketTypes( this.createTicketTypeForm.value).subscribe(res => {
      if(!res.error) {
        $("#newTicketTypeModal").modal("hide")
        this.alertSrvc.success("Ticket types created successfully.")
        this.getTicketTypeList()
      }
      
    })
  }

  deleteById(id: number) {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      width: '400px',
      disableClose: true,
      data: {message: "Are you sure to delete the ticket type?"}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.tmSrvc.deleteTicketTypeById(id).subscribe(res => {
          if(!res.error) {
            this.alertSrvc.success("Ticket type deleted successfully.")
            this.getTicketTypeList()
          }
          
        })
      }
    })
  }

  getTicketTypeById(id: number) {
    return this.ticketTypeList.filter((d: any) => d.id == id)[0]?.name
  }


}
