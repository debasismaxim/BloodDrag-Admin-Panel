import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/_common/services/alert.service';
import { AuthService } from 'src/app/_common/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor( public authSrvc: AuthService) { }

  ngOnInit(): void {
  }

  logout() {
    this.authSrvc.logout()
  }

  // openLoginDialog() {
  //   const dialogRef = this.dialog.open(LoginComponent, {disableClose: true});

  //   dialogRef.afterClosed().subscribe(result => {
  //     if(result == 'signUp') {
  //       this.openRegisterDialog()
  //     }
  //   });
  // }

  // openRegisterDialog() {
  //   const dialogRef = this.dialog.open(RegisterComponent, {disableClose: true});

  //   dialogRef.afterClosed().subscribe(result => {
  //     if(result == 'cancel') {}
  //     else if(result == 'signIn') {
  //       this.openLoginDialog()
  //     } else {
  //       this.alertSrvc.success(result, { keepAfterRouteChange: true });
  //     }
  //   });
  // }

}
