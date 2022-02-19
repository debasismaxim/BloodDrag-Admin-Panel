import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { DeleteConfirmDialogComponent } from 'src/app/_common/components/delete-confirm-dialog/delete-confirm-dialog.component';
import { AlertService } from 'src/app/_common/services/alert.service';
import { environment } from 'src/environments/environment';
import { HomeService } from '../home.service';
declare var $: any;

@Component({
  selector: 'app-manage-home-seo',
  templateUrl: './manage-home-seo.component.html',
  styleUrls: ['./manage-home-seo.component.scss']
})
export class ManageHomeSeoComponent implements OnInit {

  allHomeGridList: any = []
  updateHomeGridForm: FormGroup
  homeGridDetails: any
  homeGridId: any
  firstLoad = true
  type = 'home';
  homeGridIconBaseUrl = environment.baseUrl + "/uploads/home_assets/"

  constructor(private homeSrvc: HomeService, private alertSrvc: AlertService,
    private fb: FormBuilder, private dialog: MatDialog) { }

  ngOnInit() {
    this.getHomeSeo()
    this.updateHomeGridForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      keywords: ['', Validators.required],
    });
  }

  setHomeGridForm() {
    console.log(this.homeGridDetails);
    this.updateHomeGridForm.patchValue({
      title: this.homeGridDetails.title,
      description: this.homeGridDetails.description,
      keywords: this.homeGridDetails.keywords,
    })
  }

  setEditForm(homeGridData: any) {
    this.homeGridDetails = homeGridData;
    this.homeGridId = homeGridData ? homeGridData.id : '';
    this.setHomeGridForm()
  }

  getHomeSeo() {
    this.homeSrvc.getSEOData(this.type).subscribe(res => {
      if (!res.error) {
        this.allHomeGridList = res.data
        console.log(this.allHomeGridList);
        if (this.allHomeGridList) {
          this.setEditForm(this.allHomeGridList);
        }
      }

    })
  }

  updateHomeBanner(f: any) {
    let payLoad = JSON.parse(JSON.stringify(this.updateHomeGridForm.value))
    payLoad['type'] = this.type;
    this.homeSrvc.saveSEOData(payLoad).subscribe(res => {
      if (!res.error) {
        $(window).scrollTop(0)
        f.resetForm();
        this.alertSrvc.success("Saved successfully.")
        this.getHomeSeo()
      }

    })
  }

  readFile(e: any) {
    let input = e.target
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(input.files[0]);
      this.homeSrvc.uploadSocialIcon(input.files[0]).pipe(first()).subscribe(res => {

        if (!res.error) {
          this.updateHomeGridForm.patchValue({
            'image': <string>res.data.filename
          })
        }
      })
    }
  }

  initiateDataTable() {
    setTimeout(() => {
      $('#member').DataTable({
        //DataTable Options
        "aaSorting": []
      });
    }, 200)

  }

  deleteById(id: number) {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      width: '400px',
      disableClose: true,
      data: { message: "Are you sure to delete the Home grid?" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.homeSrvc.delteHomeGrid(id).subscribe(res => {
          if (!res.error) {
            this.alertSrvc.success("Home grid deleted successfully.")
            this.homeSrvc.getAllHomeGridList().subscribe(res => {
              if (!res.error) {
                this.allHomeGridList = res.data
              }

            })
          }

        })
      }
    })

  }

}
