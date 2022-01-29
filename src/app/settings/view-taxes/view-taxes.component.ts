import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/app/_common/services/alert.service';
import { SettingsService } from '../settings.service';
declare var $:any;

@Component({
  selector: 'app-view-taxes',
  templateUrl: './view-taxes.component.html',
  styleUrls: ['./view-taxes.component.scss']
})
export class ViewTaxesComponent implements OnInit {

  allTaxesList:any = []
  updateTaxForm:FormGroup
  taxDetails: any
  taxId: any
  countryName: string = "";
  stateName: string = ""
  countryList: any = [];
  stateList:any = []
  selectedCountry: any;
  selectedState: any
  firstLoad = true
  
  constructor(private settingsSrvc: SettingsService, private alertSrvc: AlertService, private fb: FormBuilder) { }

  ngOnInit() {
    this.getAllTaxes()
    this.updateTaxForm = this.fb.group({
      country: ['', Validators.required],
      state: ['', Validators.required],
      tax: ['', Validators.required]
    });
    this.getCountryList()
  }

  setTaxForm() {
    this.updateTaxForm.patchValue({
      country: this.taxDetails.country.name,
      state: this.taxDetails.state.name,
      tax: this.taxDetails.tax
    })
  }

  setEditForm(taxData:any) {
    this.taxDetails = taxData;
    this.taxId = taxData.id;
    this.setTaxForm()
  }

  getCountryList() {
    
    this.settingsSrvc.getCountryList().pipe(first()).subscribe(res => {
        this.countryList = res;
    })
  }

  getStateListByCountry(countryName: any) {
    console.log(countryName)
    if(countryName && this.countryList.length && countryName != this.selectedCountry?.name) {
      this.selectedCountry = this.countryList.filter((d: any) => d.name == countryName)[0]
      this.settingsSrvc.getStateListByCountry(this.selectedCountry).pipe(first()).subscribe(res => {
        this.stateList = res;
      })
    }
    
  }

  getAllTaxes() {
    this.settingsSrvc.getAllTaxes().subscribe(res => {
      if(!res.error) {
        this.allTaxesList = res.data
        if(this.firstLoad) {
          this.initiateDataTable()
          this.firstLoad = false
        }
        
      }
      
    })
  }

  updateTax(f: any) {
    let payLoad = JSON.parse(JSON.stringify(this.updateTaxForm.value))
    payLoad.country = this.countryList.filter((d:any) => d.name == payLoad.country)[0]
    payLoad.state = this.stateList.filter((d:any) => d.name == payLoad.state)[0] || null
    if(!this.taxId) {
      this.settingsSrvc.createTax(payLoad).subscribe(res => {
        if(!res.error) {
          $(window).scrollTop(0)
          f.resetForm();
          this.alertSrvc.success("Tax Created successfully.")
          this.getAllTaxes()
        }
        
      })
    } else {
      this.settingsSrvc.updateTaxDetails(payLoad, this.taxId).subscribe(res => {
        if(!res.error) {
          $(window).scrollTop(0)
          this.taxId = undefined
          f.resetForm();
          this.alertSrvc.success("Tax updated successfully.")
          this.getAllTaxes()
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
    this.settingsSrvc.deleteById(id).subscribe(res => {
      if(!res.error) {
        this.alertSrvc.success("Event deleted successfully.")
        this.settingsSrvc.getAllTaxes().subscribe(res => {
          if(!res.error) {
            this.allTaxesList = res.data
          }
          
        })
      }
      
    })
  }

}
