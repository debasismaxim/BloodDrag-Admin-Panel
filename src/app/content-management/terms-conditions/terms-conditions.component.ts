import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/_common/services/alert.service';
import { environment } from 'src/environments/environment';
import { CmService } from '../cm.service';
declare var $:any;
declare var tinymce: any;

@Component({
  selector: 'app-terms-conditions',
  templateUrl: './terms-conditions.component.html',
  styleUrls: ['./terms-conditions.component.scss']
})
export class TermsConditionsComponent  {

  termsConditionsForm: FormGroup;
  contentDetails: any
  
  constructor(private router: Router, private activeRoute: ActivatedRoute, private cmSrvc:CmService, private fb:FormBuilder, private alertSrvc: AlertService ) { }

  ngOnInit(): void {
    this.getContentDetails()
    this.termsConditionsForm = this.fb.group({
      termsAndConditions: ['', Validators.required]
    });
  }


  setEditForm() {
    this.termsConditionsForm.patchValue({
      termsAndConditions: this.contentDetails.termsAndConditions,
    });
    setTimeout(() => {
      tinymce.get(0).setContent(this.termsConditionsForm.value.termsAndConditions)
    }, 200);
  }

  getContentDetails() {
    this.cmSrvc.getContentData().subscribe(res => {
      if(!res.error) {
        this.contentDetails = res.data;
        this.setEditForm()
      }
      
    })
  }

  

  updateDetails(f: any) {
    this.cmSrvc.updateContentDetails(this.termsConditionsForm.value).subscribe(res => {
      if(!res.error) {
        // f.resetForm();
        $(window).scrollTop(0)
        this.alertSrvc.success("Terms and Conditions updated successfully.")
        this.contentDetails()
      }
      
    })
  }

  ngAfterViewInit() {
    
    setTimeout(() => {
      tinymce.init({
        selector: '#termsConditions',
        height: 300,
        setup : (ed: any) => {
          ed.on('change', (e: any)=> {
            this.termsConditionsForm.controls['termsAndConditions'].setValue(ed.getContent())
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
      tinymce.get(0).setContent(this.termsConditionsForm.value.termsAndConditions)
    }, 200);
      
    }, 300);
    
  }

  ngOnDestroy() {
    tinymce.remove()
  }

}
