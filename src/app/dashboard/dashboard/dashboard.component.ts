import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    //For creating greetings on page
    var today = new Date();
    var curHr = today.getHours();
    var greeting_container = $(".js-greeting");
    if (curHr < 12) {
        greeting_container.text('Good Morning');
    } else if (curHr < 18) {
        greeting_container.text('Good Afternoon');
    } else {
        greeting_container.text('Good Evening');
    }
  }

}
