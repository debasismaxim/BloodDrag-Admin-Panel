import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/_common/services/alert.service';
import { SettingsService } from '../settings.service';
declare var $:any

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.scss']
})
export class CouponsComponent implements OnInit {

  allCouponsList:any = []
  updateCouponForm:FormGroup
  couponDetails: any
  couponId: any
  countryName: string = "";
  stateName: string = ""
  countryList: any = [];
  stateList:any = []
  selectedCountry: any;
  couponTypes = ["$", "Percentage(%)"]
  selectedState: any
  firstLoad = true;
  expiryDate = ''
  
  constructor(private settingsSrvc: SettingsService, private alertSrvc: AlertService, private fb: FormBuilder) { }

  ngOnInit() {
    this.getAllCoupons()
    this.updateCouponForm = this.fb.group({
      code: ['', Validators.required],
      value: ['', Validators.required],
      unitType: ['', Validators.required],
      useLimit: ['', Validators.required],
      expiryDate: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  setCouponForm() {
    this.updateCouponForm.patchValue({
      code: this.couponDetails.code,
      value: this.couponDetails.value,
      unitType: this.couponDetails.unitType,
      useLimit: this.couponDetails.useLimit,
      expiryDate: this.couponDetails.expiryDate,
      status: this.couponDetails.status
    })
  }

  setEditForm(couponData:any) {
    this.couponDetails = couponData;
    this.couponId = couponData.id;
    this.setCouponForm()
  }

  getAllCoupons() {
    this.settingsSrvc.getAllCoupons().subscribe(res => {
      if(!res.error) {
        this.allCouponsList = res.data
        if(this.firstLoad) {
          this.initiateDataTable()
          this.firstLoad = false
        }
        
      }
      
    })
  }

  updateCoupon(f: any) {
    let payLoad = JSON.parse(JSON.stringify(this.updateCouponForm.value))
    if(!this.couponId) {
      this.settingsSrvc.createCoupon(payLoad).subscribe(res => {
        if(!res.error) {
          $(window).scrollTop(0)
          f.resetForm();
          this.alertSrvc.success("Coupon Created successfully.")
          this.getAllCoupons()
        }
        
      })
    } else {
      this.settingsSrvc.updateCouponDetails(payLoad, this.couponId).subscribe(res => {
        if(!res.error) {
          $(window).scrollTop(0)
          this.couponId = undefined
          f.resetForm();
          this.alertSrvc.success("Coupon updated successfully.")
          this.getAllCoupons()
        }
        
      })
    }
    
  }

  initiateDataTable() {
    setTimeout(()=> {
      $('#member').DataTable({
        //DataTable Options
        "aaSorting": []
      });
    }, 200)
    
  }

  deleteById(id: number) {
    this.settingsSrvc.deleteCouponById(id).subscribe(res => {
      if(!res.error) {
        this.alertSrvc.success("Coupon deleted successfully.")
        this.settingsSrvc.getAllCoupons().subscribe(res => {
          if(!res.error) {
            this.allCouponsList = res.data
          }
          
        })
      }
      
    })
  }
  ngAfterViewInit() {
    $(".js-datepicker1").datepicker({
      startDate: new Date()
    });
  
    $(".js-datepicker1").change(() => {
      this.updateCouponForm.controls['expiryDate'].setValue($(".js-datepicker1").val())
    })
  
  }

}
