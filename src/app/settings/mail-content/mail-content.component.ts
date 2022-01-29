import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/_common/services/alert.service';
import { SettingsService } from '../settings.service';
declare var $: any;

@Component({
  selector: 'app-mail-content',
  templateUrl: './mail-content.component.html',
  styleUrls: ['./mail-content.component.scss']
})
export class MailContentComponent implements OnInit {

  allMailContents: any[] = []
  
  constructor(private settingsSrvc: SettingsService, private alertSrvc: AlertService) { }

  ngOnInit() {
    this.getAllBadges()
  }

  getAllBadges() {
    this.settingsSrvc.getAllMailContentList().subscribe(res => {
      if(!res.error) {
        this.allMailContents = res.data
        this.initiateDataTable()
      }
      
    })
  }

  initiateDataTable() {
    setTimeout(()=> {
      $('#member').DataTable({
        //DataTable Options
        "aaSorting": []
      });
    }, 200)
    
  }


}
