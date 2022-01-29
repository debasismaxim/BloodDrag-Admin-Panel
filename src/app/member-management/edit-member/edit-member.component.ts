import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { DeleteConfirmDialogComponent } from 'src/app/_common/components/delete-confirm-dialog/delete-confirm-dialog.component';
import { AlertService } from 'src/app/_common/services/alert.service';
import { environment } from 'src/environments/environment';
import { MmService } from '../mm.service';
declare var $: any

@Component({
  selector: 'app-edit-member',
  templateUrl: './edit-member.component.html',
  styleUrls: ['./edit-member.component.scss']
})
export class EditMemberComponent implements OnInit {

  memberId: any;
  memberDetails: any;
  editMemberForm: FormGroup;
  countryList:any = []
  stateList: any = []
  cityList: any = []
  selectedCountry: any ;
  selectedState: any;
  selectedCity: any;
  countryName:any
  stateName: string;
  profileImageBaseUrl = environment.baseUrl + "/uploads/profile_pics/"
  constructor(private router: Router, private activeRoute: ActivatedRoute, private dialog: MatDialog,
    private mmSrvc:MmService, private fb:FormBuilder, private alertSrvc: AlertService ) { }

  ngOnInit(): void {
    this.memberId = this.activeRoute.snapshot.params['memberId'];
    
    this.editMemberForm = this.fb.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", Validators.required],
      userPassword: [''],
      residentAddress: [""],
      userId: [""],
      mobile: [""],
      profilePic: [""],
      country:  [""],
      state: [""],
      city: [""],
      zip: [""],
      userType: [""],
      bio: [""]
    });
    this.getCountryList()
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
          this.editMemberForm.patchValue({
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
        this.getMemberDetails(this.memberId)
        // if(this.editMemberForm.value.country) {
          // this.getStateListByCountry(this.editMemberForm.value.country)
        // }
    })
  }

  getStateListByCountry(countryName: any) {
    console.log(countryName)
    if(countryName && this.countryList.length && countryName != this.selectedCountry?.name) {
      this.selectedCountry = this.countryList.filter((d: any) => d.name == countryName)[0]
      this.mmSrvc.getStateListByCountry(this.selectedCountry).pipe(first()).subscribe(res => {
        this.stateList = res;
        if(!this.selectedState) {
          this.getCityListByState(this.editMemberForm.value.state, this.editMemberForm.value.country)
        } else {
          this.editMemberForm.patchValue({
            state: "",
            city: ""
          })
        }
      })
    }
    
  }

  getCityListByState(stateName: any, countryName: any) {
    if(stateName && this.countryList.length && this.stateList.length && stateName != this.selectedState?.name) {
      this.selectedState = this.stateList.filter((d: any) => d.name == stateName)[0]
      this.mmSrvc.getCityListByState(this.selectedState, this.selectedCountry).pipe(first()).subscribe(res => {
        this.cityList = res;
        if(this.editMemberForm.value.city) {
          if(!this.cityList.filter((d: any) => d.name == this.editMemberForm.value.city).length) {
            this.editMemberForm.patchValue({
              city: ""
            })
          }
        }
      })
    }
  }
  

  getMemberDetails(id: number) {
    this.mmSrvc.getMemberDetailsById(id).subscribe(res => {
      if(!res.error) {
        this.memberDetails = res.data;
        this.setEditForm()
      }
    })
  }

  setEditForm() {
    this.editMemberForm.patchValue({
      firstName: this.memberDetails.firstName,
      lastName: this.memberDetails.lastName,
      email: this.memberDetails.email,
      userPassword: '',
      mobile: this.memberDetails.mobile,
      residentAddress: this.memberDetails.residentAddress,
      country: this.memberDetails.country?.name,
      state: this.memberDetails.state?.name,
      city: this.memberDetails.city?.name,
      zip: this.memberDetails.zip,
      userType: this.memberDetails.userType,
      userId: this.memberDetails.userId,
      bio: this.memberDetails.bio,
      profilePic: this.memberDetails.profilePic
    });
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
            this.editMemberForm.patchValue({
              'profilePic': <string>res.data.filename
            })
          }
        })
    }
  }

  updateDetails(f: any) {
    let payLoad = JSON.parse(JSON.stringify(this.editMemberForm.value));
    payLoad.country = this.countryList.filter( (d:any) => d.name == payLoad.country)[0]
    payLoad.state = this.stateList.filter((d:any) => d.name == payLoad.state)[0]
    payLoad.city = this.cityList.filter((d:any) => d.name == payLoad.city)[0]
    this.mmSrvc.editMemberDetails(payLoad).subscribe(res => {
      if(!res.error) {
        // f.resetForm();
        $(window).scrollTop(0)
        this.alertSrvc.success("Member updated successfully.")
        this.getMemberDetails(this.memberId)
      }
      
    }, err => {
      $(window).scrollTop(0)
      this.alertSrvc.error(err)
    })
  }

}
