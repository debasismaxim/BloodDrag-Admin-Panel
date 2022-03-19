import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MmService } from 'src/app/member-management/mm.service';
import { AppConstants } from 'src/app/shared/app.constants';
import { TmService } from 'src/app/ticket-management/tm.service';
import { AlertService } from 'src/app/_common/services/alert.service';
import { environment } from 'src/environments/environment';

declare var $: any;
declare var tinymce: any;

@Component({
  selector: 'app-add-ticket',
  templateUrl: './add-ticket.component.html',
  styleUrls: ['./add-ticket.component.scss']
})
export class AddTicketComponent implements OnInit {

  tillDate = ''
  createTicketForm: FormGroup;
  onlyNumberRegex = /^\d+$/;
  ticketTypeList: any = []
  eventList: any[] = []
  allMemberList: any[] = [];
  eventTickets: any[] = [];
  ticketQuantity = 0;
  tickets: any;
  expandData = '';
  ticketCount: any;
  ticketCart: any;
  selectedEvent: any;
  subTotalPrice = 0;
  totalPrice = 0;
  taxPrice = 0;
  payLoad:any[] = [];
  constructor(public mmSrvc: MmService, private tmSrvc: TmService, private fb: FormBuilder, private alertSrvc: AlertService) { }

  ngOnInit(): void {
    this.getAllEvents()
    this.createTicketForm = this.fb.group({
      eventId: ['', Validators.required],
      member : ['',Validators.required],
    });
    this.getTicketTypeList()
    this.getAllUsers();
  }

  getAllUsers() {
    this.mmSrvc.getAllMemberList().subscribe(res => {
      if (!res.error) {
        this.allMemberList = res.data
        console.log(this.allMemberList);
      }
    })
  }
  submitForm(f:any){
    if(this.createTicketForm.invalid){
      return;
    }
    this.payLoad =  this.payLoad.map(v => ({...v, userId: this.createTicketForm.get('member')?.value}))
    this.tmSrvc.addToCart(this.payLoad).subscribe(res => {
      if (!res.error) {
        // this.alertSrvc.success("Added to cart successfully.")
      }
      const cartList = res.data;
      const items = [];
      for (let event of cartList) {
        items.push({
          "cartId" : event['_id'],
          "quantity" : event['noOfTickets']
        })
      }
      const formData = {
        items : items,
        payMode : 'cash',
        userId : this.createTicketForm.get('member')?.value,
        transactionId : '12345'
    }
    this.tmSrvc.purchaseTicket(formData).subscribe(res => {
      if (!res.error) {
        $(window).scrollTop(0)
        f.resetForm();
        this.alertSrvc.success("Ticket added successfully.")
      }

    })
    })
   
  }


  createTicket(f: any) {
    // console.log(this.memberForm.value)
    tinymce.triggerSave();
    let payLoad = JSON.parse(JSON.stringify(this.createTicketForm.value))
    payLoad.availableNumberOfTickets = payLoad.totalNumberOfTickets;
    this.tmSrvc.createTicket(payLoad).subscribe(res => {
      if (!res.error) {
        $(window).scrollTop(0)
        f.resetForm();
        setTimeout(() => {
          tinymce.get(0).setContent("")
        }, 50);
        this.alertSrvc.success("Ticket added successfully.")
      }

    })
  }

  addTicket(ticket: any) {
    const ticketId = ticket['ticketTypeId'];
    const ticketData = ticket['ticketId'];
    if (!this.ticketCount) {
      this.ticketCount = {};
    }
    if (!this.ticketCount[ticketId]) {
      this.ticketCount[ticketId] = 0;
    }
    this.ticketCount[ticketId] = this.ticketCount[ticketId] * 1 + 1;
    this.ticketQuantity = this.ticketQuantity * 1 + 1;
    if (!this.ticketCart) {
      this.ticketCart = {};
    }
    if (this.ticketCart && !this.ticketCart[ticketId]) {
      this.ticketCart[ticketId] = [];
    }
    this.ticketCart[ticketId].push({
      eventId: this.selectedEvent,
      ticketTypeId: ticketId,
      ticketId: ticketData,
      price : parseFloat(ticket['price']).toFixed(2),
      tax : parseFloat(ticket['tax']).toFixed(2)
    });
    console.log(this.ticketCart);
    this.calculatePrice();
  }
  substractTicket(ticket: any) {
    const ticketId = ticket['ticketTypeId'];
    if (this.ticketCount && this.ticketCount[ticketId] && this.ticketCount[ticketId] > 0) {
      this.ticketCount[ticketId] = this.ticketCount[ticketId] * 1 - 1;
      this.ticketQuantity = this.ticketQuantity * 1 - 1;
    }
    this.ticketCart[ticketId].splice(this.ticketCart[ticketId].length - 1, 1);
    if (!this.ticketCount[ticketId]) {
      delete this.ticketCount[ticketId];
    }
    this.calculatePrice();
  }


  calculatePrice() {
    this.payLoad = [];
    const ticketData = Object.keys(this.ticketCart);
    this.totalPrice = 0;
    this.taxPrice = 0;
    this.subTotalPrice = 0;
    for(let ticketId of ticketData){
      let totalPrice = 0;
      const ticketDetails = this.ticketCart[ticketId][0];
      console.log(ticketDetails);
            const quantity = this.ticketCart[ticketId].length;
            let subTotalPrice = ticketDetails['price'] * quantity * 1;
            this.subTotalPrice = subTotalPrice * 1 + this.subTotalPrice * 1;
            let tax: any;
            tax = (subTotalPrice * ticketDetails['tax'] * 1) / 100
            tax = parseFloat(tax.toString()).toFixed(2);
            this.taxPrice = tax * 1 + this.taxPrice;
            totalPrice = totalPrice * 1 + subTotalPrice * 1 + tax * 1;
            this.totalPrice = this.totalPrice * 1 + totalPrice * 1;
            this.payLoad.push({
              "eventId": ticketDetails['eventId'],
              "totalPrice": totalPrice,
              "tax": ticketDetails['tax'],
              "subTotalPrice": subTotalPrice,
              "perTicketPrice": ticketDetails['price'],
              "noOfTickets": quantity,
              "ticketId" : ticketDetails['ticketId'],
              "ticketTypeId": ticketDetails['ticketTypeId'],
              "transactionId": null
            });
    }
  }

  ticketSelection(ticketId: any, eventId: any, ticketData: any) {
    if (!this.ticketCart) {
      this.ticketCart = {};
    }
    if (this.ticketCart && !this.ticketCart[eventId]) {
      this.ticketCart[eventId] = [];
    }
    this.ticketCart[eventId].push({
      eventId: eventId,
      ticketTypeId: ticketId,
      ticketId: ticketData
    });
  }

  getAllEvents() {
    this.tmSrvc.getEventList().subscribe(res => {
      if (!res.error)
        this.eventList = res.data
    })
  }

  getTicketTypeList() {
    this.tmSrvc.getTicketTypeList().subscribe(res => {
      if (!res.error) {
        this.ticketTypeList = res.data
        console.log(this.ticketTypeList);
      }

    })
  }
  getEventData(event: any) {
    console.log(event.target.value);
    if (event.target.value.length > 0) {
      this.selectedEvent = event.target.value;
      this.tmSrvc.getEventTickets({ eventId: event.target.value }).subscribe((res) => {
        this.eventTickets = res.data;
        if (!this.tickets) {
          this.tickets = {};
        }
        this.tickets[event.target.value] = {};
        this.tickets[event.target.value] = res.data;
        console.log(this.tickets);
      })
    }
  }

  getSelectedEvent() {
    if (this.createTicketForm.value.eventId) {
      return this.eventList.filter((d) => d.id == this.createTicketForm.value.eventId)[0]
    } else return ""
  }

  setMaxDateTicket() {
    if (this.createTicketForm.value.eventId) {
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
      setup: (ed: any) => {
        ed.on('change', (e: any) => {
          this.createTicketForm.controls['shortDescription'].setValue(ed.getContent())
        });
      },
      plugins: 'print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap emoticons',
      menubar: 'file edit view insert format tools table help',
      toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
      toolbar_sticky: false,
      image_advtab: true,
      document_base_url: environment.currentUrl + "assets/vendor/tinymce",
      relative_url: true,
      skin_url: environment.currentUrl + "assets/vendor/tinymce/skins/ui/oxide",
      external_filemanager_path: "filemanager/",
      filemanager_title: "Filemanager",
      theme_url: environment.currentUrl + "assets/vendor/tinymce/themes/silver/theme.js",
      external_plugins: { "filemanager": environment.currentUrl + "assets/vendor/filemanager/plugin.min.js" },
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
