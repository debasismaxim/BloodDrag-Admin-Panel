import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// import { ReCaptchaV3Service } from 'ng-recaptcha';
import { AlertService } from 'src/app/_common/services/alert.service';
import { AuthService } from 'src/app/_common/services/auth.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginFormConfig: any = {
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
    recaptchaReactive : [null,Validators.required]
  }
  siteKey = environment.recaptcha.siteKey;
  loginForm: FormGroup;
  errorMessage: string = '';
  isTextFieldType: boolean;
  submitted = false;

  constructor(private fb: FormBuilder, private authSrvc: AuthService, 
    // private recaptchaV3Service: ReCaptchaV3Service,
    private alertSrvc: AlertService, private router: Router, private route: ActivatedRoute) {
    // this.loginForm = this.fb.group(this.loginFormConfig);
   }

  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    this.loginForm = this.fb.group(this.loginFormConfig);
  }


  loginAdmin(f: any) {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }else{
    this.authSrvc.login(f.value).subscribe(res => {
      if(res.error) {
        this.errorMessage = res.message;
        setTimeout(() => {
          this.errorMessage = ''
        }, 3000);
      } else {
        this.route.queryParams
          .subscribe(params => {
            if(params && params.returnUrl)
              this.router.navigate(["/"+params.returnUrl])
            else
              this.router.navigate(["/dashboard"])
          }
        );
      }
    }, err => {
      this.errorMessage = err;
      setTimeout(() => {
        this.errorMessage = ''
      }, 3000);
    })
   }
  }

  // togglePasswordFieldType(){
  //   this.isTextFieldType = !this.isTextFieldType;
  // }

}
