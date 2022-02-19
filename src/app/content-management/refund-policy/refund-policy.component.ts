import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeService } from 'src/app/homepage/home.service';
import { AlertService } from 'src/app/_common/services/alert.service';
import { environment } from 'src/environments/environment';
import { CmService } from '../cm.service';
declare var $:any;
declare var tinymce: any;

@Component({
  selector: 'app-refund-policy',
  templateUrl: './refund-policy.component.html',
  styles: [
  ]
})
export class RefundPolicyComponent implements OnInit {

  refundPolicyForm: FormGroup;
  contentDetails: any
  type="refund";
  constructor(public homeSrvc : HomeService,private router: Router, private activeRoute: ActivatedRoute, private cmSrvc:CmService, private fb:FormBuilder, private alertSrvc: AlertService ) { }

  ngOnInit(): void {
    this.getContentDetails()
    this.refundPolicyForm = this.fb.group({
      refundPolicy: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      keywords: ['', Validators.required],
    });
  }


  setEditForm() {
    this.refundPolicyForm.patchValue({
      refundPolicy: this.contentDetails.refundPolicy,
      title: this.contentDetails.title,
      description:this.contentDetails.description,
      keywords: this.contentDetails.keywords
    });
    setTimeout(() => {
      tinymce.get(0).setContent(this.refundPolicyForm.value.refundPolicy)
    }, 200);
  }

  getContentDetails() {
    this.cmSrvc.getContentData().subscribe(res => {
      if(!res.error) {
        this.contentDetails = res.data;
        this.homeSrvc.getSEOData(this.type).subscribe(res => {
          if(!res.error) {
            this.contentDetails = {...this.contentDetails,...res.data};
            this.setEditForm();
          }
          
        })
      }
      
    })
  }

  

  updateDetails(f: any) {
    const updateSeo = this.refundPolicyForm.value;
    updateSeo['type'] = this.type;
    this.cmSrvc.updateContentDetails(this.refundPolicyForm.value).subscribe(res => {
      if(!res.error) {
        this.homeSrvc.saveSEOData(updateSeo).subscribe(res => {
          if(!res.error) {
            $(window).scrollTop(0)
            this.alertSrvc.success("Refund Policy updated successfully.")
            this.getContentDetails()
          }
        })
      }
    })
  }

  ngAfterViewInit() {
    
    setTimeout(() => {
      tinymce.init({
        selector: '#refundPolicy',
        height: 300,
        setup : (ed: any) => {
          ed.on('change', (e: any)=> {
            this.refundPolicyForm.controls['refundPolicy'].setValue(ed.getContent())
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
      tinymce.get(0).setContent(this.refundPolicyForm.value.refundPolicy)
    }, 200);
      
    }, 300);
    
  }

  ngOnDestroy() {
    tinymce.remove()
  }

}
