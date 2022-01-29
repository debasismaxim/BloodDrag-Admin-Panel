import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/_common/services/alert.service';
import { environment } from 'src/environments/environment';
import { SettingsService } from '../settings.service';
declare var $: any;
declare var tinymce: any;

@Component({
  selector: 'app-edit-mail-content',
  templateUrl: './edit-mail-content.component.html',
  styleUrls: ['./edit-mail-content.component.scss']
})
export class EditMailContentComponent implements OnInit {

  mailContentDetails:any;
  mailContentId: number
  updateMailContentForm: FormGroup;
  constructor(private settingsSrvc: SettingsService, private activeRoute: ActivatedRoute, private fb: FormBuilder, private alertSrvc: AlertService) { }

  ngOnInit(): void {
    this.mailContentId = this.activeRoute.snapshot.params['mailContentId'];
    this.getMailContentDetails(this.mailContentId)
    this.updateMailContentForm = this.fb.group({
      title: ['', Validators.required],
      subject: ['', Validators.required],
      mailId: ['', Validators.required],
      content: ['', Validators.required],
    });
  }

  getMailContentDetails(id: number) {
    this.settingsSrvc.getMailContentDetailsById(id).subscribe(res => {
      if(!res.error) {
        this.mailContentDetails = res.data;
        this.setEditForm()
      }
      
    })
  }

  setEditForm() {
    this.updateMailContentForm.patchValue({
      title: this.mailContentDetails.title,
      subject: this.mailContentDetails.subject,
      mailId: this.mailContentDetails.mailId,
      content: this.mailContentDetails.content,
    });
    setTimeout(() => {
      tinymce.get(0).setContent(this.updateMailContentForm.value.content)
    }, 200);
  }

  updateMailContentDetails(f: any) {

    this.settingsSrvc.updateMailContent(this.updateMailContentForm.value, this.mailContentId).subscribe(res => {
      if(!res.error) {
        $(window).scrollTop(0)
        f.resetForm();
        this.alertSrvc.success("Mail Content updated successfully.")
        this.getMailContentDetails(this.mailContentId)
      }
      
    })
  }

  ngAfterViewInit() {
    
    setTimeout(() => {
      tinymce.init({
        selector: '#content',
        height: 300,
        setup : (ed: any) => {
          ed.on('change', (e: any)=> {
            this.updateMailContentForm.controls['content'].setValue(ed.getContent())
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
      tinymce.get(0).setContent(this.updateMailContentForm.value.content)
    }, 200);
      
    }, 300);
    
  }

  ngOnDestroy() {
    tinymce.remove()
  }

}
