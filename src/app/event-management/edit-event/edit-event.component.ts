import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/app/_common/services/alert.service';
import { environment } from 'src/environments/environment';
import { EmService } from '../em.service';
declare var $:any;
declare var tinymce: any;

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.scss']
})
export class EditEventComponent implements OnInit {

  eventId: any;
  eventDetails: any;
  editEventForm: FormGroup;
  countryList:any = []
  stateList: any = []
  cityList: any = []
  countryName: string = "";
  stateName: string = ""
  selectedCountry: any;
  selectedState: any
  eventImageBaseUrl = environment.baseUrl + "/uploads/events/"
  
  constructor(private router: Router, private activeRoute: ActivatedRoute, private emSrvc:EmService, private fb:FormBuilder, private alertSrvc: AlertService ) { }

  ngOnInit(): void {
    this.eventId = this.activeRoute.snapshot.params['eventId'];
    
    this.getCountryList()
    this.editEventForm = this.fb.group({
      name: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      location: ['', Validators.required],
      zip:  ['', Validators.required],
      description: [''],
      images: [''],
      registeredCarsAllowed: ['', Validators.required],
      vipRegisteredCarsAllowed: ['', Validators.required],
      mapCode: ['']
    });
  }



  getEventDetails(id: number) {
    this.emSrvc.getEventDetailsById(id).subscribe(res => {
      if(!res.error) {
        this.eventDetails = res.data;
        this.setEditForm()
      }
      
    })
  }

  setEditForm() {
    this.editEventForm.patchValue({
      name: this.eventDetails.name,
      startDate: this.eventDetails.startDate,
      endDate: this.eventDetails.endDate,
      startTime: this.eventDetails.startTime,
      endTime: this.eventDetails.endTime,
      country: this.eventDetails.country.name,
      state: this.eventDetails.state.name,
      location: this.eventDetails.location,
      zip:  this.eventDetails.zip,
      description: this.eventDetails.description,
      images: this.eventDetails.images,
      registeredCarsAllowed: this.eventDetails.registeredCarsAllowed,
      vipRegisteredCarsAllowed: this.eventDetails.vipRegisteredCarsAllowed,
      mapCode: this.eventDetails.mapCode
    });
    setTimeout(() => {
      tinymce.get(0).setContent(this.editEventForm.value.description)
    }, 200);
  }

  readFile(e:any) {
    let input = e.target
    let files = []
    if (input.files && input.files[0]) {
      for  (var i =  0; i <  e.target.files.length; i++)  {  
        files.push(e.target.files[i]);
      }
        this.emSrvc.uploadEventImages(files).pipe(first()).subscribe(res => {
          if(!res.error) {
            let fileNames: any[] = []
            
            if(this.editEventForm.value.images && this.editEventForm.value.images.length ) {
              fileNames = fileNames.concat(this.editEventForm.value.images)
            }
            res.data.forEach((file: any) => {
              fileNames.push(file.filename)
            });
            this.editEventForm.patchValue({
              'images': fileNames
            })
          }
        })
    }
  }

  removeImage(imageIndex:number) {
    this.editEventForm.value.images.splice(imageIndex, 1)
  }

  getCountryList() {
    
    this.emSrvc.getCountryList().pipe(first()).subscribe(res => {
        this.countryList = res;
        this.getEventDetails(this.eventId)
    })

  }

  getStateListByCountry(countryName: any) {
    console.log(countryName)
    if(countryName && this.countryList.length && countryName != this.selectedCountry?.name) {
      this.selectedCountry = this.countryList.filter((d: any) => d.name == countryName)[0]
      this.emSrvc.getStateListByCountry(this.selectedCountry).pipe(first()).subscribe(res => {
        this.stateList = res;
        if(this.editEventForm.value.state) {
          if(!this.stateList.filter((d: any) => d.name == this.editEventForm.value.state).length) {
            this.editEventForm.patchValue({
              state: ""
            })
          }
        }
      })
    }
    
  }

  updateDetails(f: any) {
    let payLoad = JSON.parse(JSON.stringify(this.editEventForm.value))
    payLoad.country = this.countryList.filter((d:any) => d.name == payLoad.country)[0]
    payLoad.state = this.stateList.filter((d:any) => d.name == payLoad.state)[0] || null
    this.emSrvc.editEventDetails(this.eventId, payLoad).subscribe(res => {
      if(!res.error) {
        // f.resetForm();
        $(window).scrollTop(0)
        this.alertSrvc.success("Event updated successfully.")
        this.getEventDetails(this.eventId)
      }
      
    })
  }

  ngAfterViewInit() {
    $(".js-datepicker1").datepicker();
    $(".js-datepicker2").datepicker();
    $('.timepicker1, .timepicker2').timepicker({
      showInputs: false,
      defaultTime: null
    });
    $(".js-datepicker1").change(() => {
      this.editEventForm.controls['startDate'].setValue($(".js-datepicker1").val())
    })
    $(".js-datepicker2").change(() => {
      this.editEventForm.controls['endDate'].setValue($(".js-datepicker2").val())
    })
    $(".timepicker1").change(() => {
      this.editEventForm.controls['startTime'].setValue($(".timepicker1").val())
    })
    $(".timepicker2").change(() => {
      this.editEventForm.controls['endTime'].setValue($(".timepicker2").val())
    })
    setTimeout(() => {
      tinymce.init({
        selector: '#description',
        height: 300,
        setup : (ed: any) => {
          ed.on('change', (e: any)=> {
            this.editEventForm.controls['description'].setValue(ed.getContent())
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
    
    });
    setTimeout(() => {
      tinymce.get(0).setContent(this.editEventForm.value.description)
    }, 200);
      
    }, 300);
    
  }

  ngOnDestroy() {
    tinymce.remove()
  }

}
