import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppConstants } from 'src/app/shared/app.constants';
import { AlertService } from 'src/app/_common/services/alert.service';
import { environment } from 'src/environments/environment';
import { TmService } from '../tm.service';
declare var $:any;
declare var tinymce: any;

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.scss']
})
export class CreateTicketComponent implements OnInit {

  tillDate = ''
  createTicketForm: FormGroup;
  onlyNumberRegex = /^\d+$/;
  ticketTypeList:any = []
eventList:any[] = []
  constructor(private tmSrvc: TmService, private fb: FormBuilder, private alertSrvc: AlertService) { }

  ngOnInit(): void {
    this.getAllEvents()
    this.createTicketForm = this.fb.group({
      ticketTypeId: ['', Validators.required],
      eventId: ['', Validators.required],
      price: ['', Validators.required],
      participantFreeTicket: [false, Validators.required],
      participantFreeTicketNumber: [''],
      totalNumberOfTickets: ['', Validators.required],
      shortDescription: ['', Validators.required],
      tillDate: ['', Validators.required],
    });
    this.getTicketTypeList()
  }



  createTicket(f: any) {
    // console.log(this.memberForm.value)
    tinymce.triggerSave();
    let payLoad = JSON.parse(JSON.stringify(this.createTicketForm.value))
    payLoad.availableNumberOfTickets = payLoad.totalNumberOfTickets;
    this.tmSrvc.createTicket(payLoad).subscribe(res => {
      if(!res.error) {
        $(window).scrollTop(0)
        f.resetForm();
        setTimeout(() => {
          tinymce.get(0).setContent("")
        }, 50);
        this.alertSrvc.success("Ticket added successfully.")
      }
      
    })
  }

  getAllEvents() {
    this.tmSrvc.getEventList().subscribe(res => {
      if(!res.error)
        this.eventList = res.data
    })
  }

  getTicketTypeList() {
    this.tmSrvc.getTicketTypeList().subscribe(res => {
      if(!res.error) {
        this.ticketTypeList = res.data
      }
      
    })
  }

  getSelectedEvent() {
    if(this.createTicketForm.value.eventId) {
      return this.eventList.filter((d) => d.id == this.createTicketForm.value.eventId)[0]
    } else return ""
  }

  setMaxDateTicket() {
    if(this.createTicketForm.value.eventId) {
      let selectedEvent = this.eventList.filter((d) => d.id == this.createTicketForm.value.eventId)[0]
      $(".js-datepicker1").datepicker("setEndDate", new Date(selectedEvent.startDate));
    }
    
  }
 

  ngAfterViewInit() {
    $(".js-datepicker1").datepicker({
      startDate: new Date()
    });
    $(".js-datepicker1").change(() => {
      this.createTicketForm.controls['tillDate'].setValue($(".js-datepicker1").val())
    })
    tinymce.init({
      selector: '#desc',
      height: 300,
      setup : (ed: any) => {
        ed.on('change', (e: any)=> {
          this.createTicketForm.controls['shortDescription'].setValue(ed.getContent())
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
  }
  ngOnDestroy() {
    tinymce.remove()
  }
}
