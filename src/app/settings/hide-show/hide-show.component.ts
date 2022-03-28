import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/app/_common/services/alert.service';
import { environment } from 'src/environments/environment';
import { SettingsService } from '../settings.service';

declare var $: any;

@Component({
  selector: 'app-hide-show',
  templateUrl: './hide-show.component.html',
  styleUrls: ['./hide-show.component.scss']
})
export class HideShowComponent implements OnInit {
  color = "#1b2955";
  sections = [
    {
      "name": "banner",
      "show": true,
      "hide" : false
    },
    {
      "name": "slide",
      "show": true,
      "hide" : false
    },
    {
      "name": "notification",
      "show": true,
      "hide" : false
    },
    {
      "name": "upcoming",
      "show": true,
      "hide" : false
    },
    {
      "name": "featured",
      "show": true,
      "hide" : false

    }
  ]
  constructor(private alertSrvc: AlertService,private settingsSrvc: SettingsService,
    private fb: FormBuilder, private dialog: MatDialog) { }

  ngOnInit() {
    this.getSettings();
  }
  getSettings(){
    this.settingsSrvc.getHideShowSettings().subscribe(res => {
      if(!res.error) {
        this.sections = res.data;
        this.sections = this.sections.filter((obj)=> obj['name'] !='home');
        for(let section in this.sections){
          this.sections[section]['hide'] = !this.sections[section]['show'];
        }
      }
      
    })
  }
  updateSettings(){
      this.settingsSrvc.updateHideShowSettings({settings : this.sections}).subscribe((res:any) => {
        if(!res.error) {
          this.alertSrvc.success("Settings updated successfully.")
          this.getSettings();
        }
      })
  }
  onToggleShow(eventData:any,index : any){
    this.sections[index]['show'] = eventData.checked;
    this.sections[index]['hide'] = !eventData.checked;
  }
  onToggleHide(eventData:any,index : any){
    this.sections[index]['hide'] = eventData.checked;
    this.sections[index]['show'] = !eventData.checked;
  }
}
