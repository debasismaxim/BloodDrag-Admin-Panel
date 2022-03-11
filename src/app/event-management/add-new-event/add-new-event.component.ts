import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/app/_common/services/alert.service';
import { environment } from 'src/environments/environment';
import { EmService } from '../em.service';
declare var $:any;
declare var tinymce: any;

@Component({
  selector: 'app-add-new-event',
  templateUrl: './add-new-event.component.html',
  styleUrls: ['./add-new-event.component.scss']
})
export class AddNewEventComponent implements OnInit {

  profilePic: any;
  startDate = ''
  today = new Date()
  countryList:any = []
  stateList: any = []
  cityList: any = []
  countryName: string = "";
  stateName: string = ""
  selectedCountry: any;
  selectedState: any
  addEventForm: FormGroup;
  eventImageBaseUrl = environment.baseUrl + "/uploads/events/"
  constructor(private emSrvc: EmService, private fb: FormBuilder, private alertSrvc: AlertService) { }

  ngOnInit(): void {
    this.getCountryList()
    this.addEventForm = this.fb.group({
      name: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      location: ['', Validators.required],
      zip:  ['', Validators.required],
      link:  [''],
      description: ['', Validators.required],
      images: [''],
      registeredCarsAllowed: ['', Validators.required],
      vipRegisteredCarsAllowed: ['', Validators.required],
      mapCode: ['']
    });
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
            if(this.addEventForm.value.images && this.addEventForm.value.images.length ) {
              fileNames = fileNames.concat(this.addEventForm.value.images)
            }
            res.data.forEach((file: any) => {
              fileNames.push(file.filename)
            });
            this.addEventForm.patchValue({
              'images': fileNames
            })
          }
        })
    }
  }

  getCountryList() {
    
    this.emSrvc.getCountryList().pipe(first()).subscribe(res => {
        this.countryList = res;
    })
  }

  getStateListByCountry(countryName: any) {
    console.log(countryName)
    if(countryName && this.countryList.length && countryName != this.selectedCountry?.name) {
      this.selectedCountry = this.countryList.filter((d: any) => d.name == countryName)[0]
      this.emSrvc.getStateListByCountry(this.selectedCountry).pipe(first()).subscribe(res => {
        this.stateList = res;
        if(this.addEventForm.value.state) {
          if(!this.stateList.filter((d: any) => d.name == this.addEventForm.value.state).length) {
            this.addEventForm.patchValue({
              state: ""
            })
          }
        }
      })
    }
    
  }


  removeImage(imageIndex:number) {
    this.addEventForm.value.images.splice(imageIndex, 1)
  }

  createEvent(f: any) {
    // console.log(this.memberForm.value)
    tinymce.triggerSave();
    let payLoad = JSON.parse(JSON.stringify(this.addEventForm.value))
    payLoad.country = this.countryList.filter((d:any) => d.name == payLoad.country)[0]
    payLoad.state = this.stateList.filter((d:any) => d.name == payLoad.state)[0] || null

    this.emSrvc.createEvent(payLoad).subscribe(res => {
      if(!res.error) {
        $(window).scrollTop(0)
        f.resetForm();
        setTimeout(() => {
          tinymce.get(0).setContent("")
        }, 50);
        this.alertSrvc.success("Event added successfully.")
      }
      
    })
  }


 

  ngAfterViewInit() {
    $(".js-datepicker1").datepicker({
      startDate: new Date()
    }).on('hide', function(selectedDate: any) {
      console.log(selectedDate)
      $(".js-datepicker2").val(null)
        $(".js-datepicker2").datepicker("setStartDate", selectedDate.date);
  });;
    $(".js-datepicker2").datepicker();
    $('.timepicker1, .timepicker2').timepicker({
      showInputs: false,
      defaultTime: null
    });
    $(".js-datepicker1").change(() => {
      this.addEventForm.controls['startDate'].setValue($(".js-datepicker1").val())
    })
    $(".js-datepicker2").change(() => {
      this.addEventForm.controls['endDate'].setValue($(".js-datepicker2").val())
    })
    $(".timepicker1").change(() => {
      this.addEventForm.controls['startTime'].setValue($(".timepicker1").val())
    })
    $(".timepicker2").change(() => {
      this.addEventForm.controls['endTime'].setValue($(".timepicker2").val())
    })
    tinymce.init({
      selector: '#desc',
      height: 300,
      setup : (ed: any) => {
        ed.on('change', (e: any)=> {
          this.addEventForm.controls['description'].setValue(ed.getContent())
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
