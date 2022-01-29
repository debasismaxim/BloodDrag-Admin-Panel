import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { DeleteConfirmDialogComponent } from 'src/app/_common/components/delete-confirm-dialog/delete-confirm-dialog.component';
import { AlertService } from 'src/app/_common/services/alert.service';
import { environment } from 'src/environments/environment';
import { MmService } from '../mm.service';
declare var $:any;

@Component({
  selector: 'app-add-new-member',
  templateUrl: './add-new-member.component.html',
  styleUrls: ['./add-new-member.component.scss']
})
export class AddNewMemberComponent implements OnInit {

  profilePic: any;
  countryList:any = []
  stateList: any = []
  cityList: any = []
  selectedCountry: any ;
  selectedState: any;
  selectedCity: any;
  memberForm: FormGroup;
  profileImageBaseUrl = environment.baseUrl + "/uploads/profile_pics/"
  constructor(private mmSrvc: MmService, private fb: FormBuilder,
    private dialog:MatDialog, private alertSrvc: AlertService) { }

  ngOnInit(): void {
    this.getCountryList()
    this.memberForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', Validators.required],
      password: ['', Validators.required],
      residentAddress: [''],
      profilePic: [''],
      country:  [''],
      state: [''],
      city: [''],
      zip: [''],
      bio: ['']
    });
  }

  change(){
    console.log(this.memberForm)
  }

  removeImage(e:any) {
    
    e.preventDefault()
    e.stopPropagation();
    const warnMsg = "Are you sure to remove this profile picture?"
      const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
        width: '400px',
        disableClose: true,
        data: {message: warnMsg}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if(result) {
          this.memberForm.patchValue({
            profilePic: ""
          })
          let x:any = document.getElementById("avatar-img")
          x.setValue("")
        }
      })

  }

  getCountryList() {
    
    this.mmSrvc.getCountryList().pipe(first()).subscribe(res => {
        this.countryList = res;
    })
  }

  getStateListByCountry(countryName: any) {
    this.selectedCountry = this.countryList.filter((d: any) => d.name == countryName)[0]
    this.mmSrvc.getStateListByCountry(this.selectedCountry).pipe(first()).subscribe(res => {
      this.stateList = res;
    })
  }

  getCityListByState(stateName: any, countryName: any) {
    this.selectedState = this.stateList.filter((d: any) => d.name == stateName)[0]
    this.mmSrvc.getCityListByState(this.selectedState, this.selectedCountry).pipe(first()).subscribe(res => {
      this.cityList = res;
    })
  }
  
  
  readFile(e:any) {
    let input = e.target
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $(input).parents('.avatar-input').find('.avatar-img').attr('src', e.target?.result || "assets/img/users/default.jpg");
        };

        reader.readAsDataURL(input.files[0]);
        this.mmSrvc.uploadFile(input.files[0]).pipe(first()).subscribe(res => {
          if(!res.error) {
            this.memberForm.patchValue({
              'profilePic': <string>res.data.filename
            })
          }
        })
    }
  }

  createMember(f: any) {
    let payLoad = JSON.parse(JSON.stringify(this.memberForm.value));
    payLoad.country = this.countryList.filter( (d:any) => d.name == payLoad.country)[0]
    payLoad.state = this.stateList.filter((d:any) => d.name == payLoad.state)[0]
    payLoad.city = this.cityList.filter((d:any) => d.name == payLoad.city)[0]

    this.mmSrvc.createMember(payLoad).subscribe(res => {
      if(!res.error) {
        $(window).scrollTop(0)
        $(".avatar-file-picker").parents('.avatar-input').find('.avatar-img').attr('src', "assets/img/users/default.jpg");
        f.resetForm();
        this.alertSrvc.success("Member created successfully.")
      }
      
    }, err => {
      $(window).scrollTop(0)
      this.alertSrvc.error(err)
    })
  }

}
