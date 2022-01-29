import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConstants } from 'src/app/shared/app.constants';
import { AlertService } from 'src/app/_common/services/alert.service';
import { environment } from 'src/environments/environment';
import { TmService } from '../tm.service';
declare var $:any;
declare var tinymce: any;

@Component({
  selector: 'app-edit-ticket',
  templateUrl: './edit-ticket.component.html',
  styleUrls: ['./edit-ticket.component.scss']
})
export class EditTicketComponent implements OnInit {

  ticketId: any;
  ticketDetails: any;
  editTicketForm: FormGroup;
  eventList: any[] = [];
  onlyNumberRegex = /^\d+$/;
  ticketTypeList:any[] = []
  tillDate: any;
  
  constructor(private router: Router, private activeRoute: ActivatedRoute, private tmSrvc:TmService, private fb:FormBuilder, private alertSrvc: AlertService ) { }

  ngOnInit(): void {
    this.ticketId = this.activeRoute.snapshot.params['ticketId'];
    this.getTicketDetails(this.ticketId);
    this.getEventList()
    this.editTicketForm = this.fb.group({
      ticketTypeId: ['', Validators.required],
      eventId: ['', Validators.required],
      price: ['', Validators.required],
      totalNumberOfTickets: ['', Validators.required],
      participantFreeTicket: [false, Validators.required],
      participantFreeTicketNumber: [''],
      shortDescription: ['', Validators.required],
      tillDate: ['', Validators.required]
    });
    this.getTicketTypeList()
  }


  getTicketTypeList() {
    this.tmSrvc.getTicketTypeList().subscribe(res => {
      if(!res.error) {
        this.ticketTypeList = res.data
      }
      
    })
  }

  getTicketDetails(id: number) {
    this.tmSrvc.getTicketDetailsById(id).subscribe(res => {
      if(!res.error) {
        this.ticketDetails = res.data;
        this.setEditForm()
      }
      
    })
  }

  setEditForm() {
    this.editTicketForm.patchValue({
      ticketTypeId: this.ticketDetails.ticketTypeId,
      eventId: this.ticketDetails.eventId,
      price: this.ticketDetails.price,
      totalNumberOfTickets: this.ticketDetails.totalNumberOfTickets,
      participantFreeTicket: this.ticketDetails.participantFreeTicket,
      participantFreeTicketNumber: this.ticketDetails.participantFreeTicketNumber,
      shortDescription: this.ticketDetails.shortDescription,
      tillDate: this.ticketDetails.tillDate
    });
    tinymce.get(0).setContent(this.editTicketForm.value.shortDescription)
    this.setMaxDateTicket()
  }

  updateDetails(f: any) {
    tinymce.triggerSave();
    let payLoad = JSON.parse(JSON.stringify(this.editTicketForm.value))
    payLoad.availableNumberOfTickets = this.ticketDetails.availableNumberOfTickets + (payLoad.totalNumberOfTickets - this.ticketDetails.totalNumberOfTickets);
    this.tmSrvc.editTicketDetails(this.ticketId, payLoad).subscribe(res => {
      if(!res.error) {
        // f.resetForm();
        $(window).scrollTop(0)
        this.alertSrvc.success("Ticket updated successfully.")
        this.getTicketDetails(this.ticketId)
      }
      
    })
  }

  getEventList() {
    this.tmSrvc.getEventList().subscribe(res => {
      if(!res.error) {
        this.eventList = res.data
      }
      
    })
  }
  setMaxDateTicket() {
    if(this.editTicketForm.value.eventId) {
      let selectedEvent = this.eventList.filter((d) => d.id == this.editTicketForm.value.eventId)[0]
      $(".js-datepicker1").datepicker("setEndDate", new Date(selectedEvent.startDate));
    }
    
  }

  getEventNameById(id: number) {
    return this.eventList.filter((d: any) => d.id == id)[0]?.name
  }

  getSelectedEvent() {
    if(this.editTicketForm.value.eventId) {
      return this.eventList.filter((d) => d.id == this.editTicketForm.value.eventId)[0]
    } else return ""
  }

  getTicketTypeById(id: number) {
    return this.ticketTypeList.filter((d: any) => d.id == id)[0]?.name
  }


  ngAfterViewInit() {
    $(".js-datepicker1").datepicker({
      startDate: new Date()
    });

    $(".js-datepicker1").change(() => {
      this.editTicketForm.controls['tillDate'].setValue($(".js-datepicker1").val())
    })
    
    setTimeout(() => {
      tinymce.init({
        selector: '#desc',
        height: 300,
        setup : (ed: any) => {
          ed.on('change', (e: any)=> {
            this.editTicketForm.controls['shortDescription'].setValue(ed.getContent())
          });
    },
      plugins: 'print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap emoticons',
      menubar: 'file edit view insert format tools table help',
      toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
      toolbar_sticky: false,
      image_advtab: true,
      document_base_url: environment.currentUrl+ "assets/vendor/tinymce",
      relative_url: true,
      skin_url: environment.currentUrl+ "assets/vendor/tinymce/skins/ui/oxide",
      external_filemanager_path:"filemanager/",
       filemanager_title:"Filemanager" ,
       theme_url: environment.currentUrl+ "assets/vendor/tinymce/themes/silver/theme.js",
       external_plugins: { "filemanager" : environment.currentUrl+ "assets/vendor/filemanager/plugin.min.js"},
      content_css: [
        '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
        '//www.tiny.cloud/css/codepen.min.css'
      ],
      extended_valid_elements: 'span[*]',
      importcss_append: false,
    
    }, 300);
    setTimeout(() => {
      tinymce.get(0).setContent(this.editTicketForm.value.shortDescription)
    }, 200);
    })
  }

  ngOnDestroy() {
    tinymce.remove()
  }


}
