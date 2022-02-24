import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var $:any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  date = new Date();

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    $("body").addClass("sidebar-pinned")
  }
}
