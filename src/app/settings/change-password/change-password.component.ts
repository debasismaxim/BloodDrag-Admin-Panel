import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/_common/services/alert.service';
import { AuthService } from 'src/app/_common/services/auth.service';
import { SettingsService } from '../settings.service';
declare var $:any

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  accountDetails:any;

  updateAccountForm: FormGroup;
  constructor(private settingSrvc: SettingsService, 
    private fb: FormBuilder, private alertSrvc: AlertService, private authSrvc: AuthService) { }

  ngOnInit(): void {
    this.getAccountDetails()
    this.updateAccountForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }


  getAccountDetails() {
    this.settingSrvc.getAccountDetails().subscribe(res => {
      if(!res.error) {
        this.accountDetails = res.data;
        this.setEditForm()
      }
      
    })
  }

  setEditForm() {
    this.updateAccountForm.patchValue({
      username: this.accountDetails.username
    });
  }

  updatePassword(f: any) {

    this.settingSrvc.updateAccountDetails(this.updateAccountForm.value).subscribe(res => {
        $(window).scrollTop(0)
        if(!res.data.passwordChanged){
          this.alertSrvc.error("Current password doesn't match")
        }
        
        if(res.data.passwordChanged) {
          f.resetForm();
          this.alertSrvc.success("Password changed successfully", {keepAfterRouteChange: true})
          setTimeout(() => {
            this.authSrvc.logout()
          }, 2000)
          
        }
        
      
    })
  }

}
