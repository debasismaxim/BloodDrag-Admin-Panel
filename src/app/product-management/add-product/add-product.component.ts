import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/app/_common/services/alert.service';
import { environment } from 'src/environments/environment';
import { PmService } from '../pm.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
declare var $:any;
declare var tinymce: any;

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  startDate = ''
  today = new Date()
  productForm: FormGroup;
  categoryList:any = []
  categoryListBackup = []
  typeList:any = []
  typeListBackup:any = []
  productTags: any = []
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  productImageBaseUrl = environment.baseUrl + "/uploads/products/"

  constructor(private pmSrvc: PmService, private fb: FormBuilder, private alertSrvc: AlertService) { }

  ngOnInit(): void {
    this.getAllCategoryList()
    this.getAllTypeList()
    this.productForm = this.fb.group({
      itemTitle: ['', Validators.required],
      model: ['', Validators.required],
      category: [''],
      price: ['', Validators.required],
      types: [''],
      description: ['', Validators.required],
      images: ['', Validators.required],
      tags: ['']
    });
  }

  getAllCategoryList() {
    this.pmSrvc.getCategoryList().subscribe(res => {
      if(!res.error) {
        this.categoryList = res.data
        this.categoryListBackup = JSON.parse(JSON.stringify(this.categoryList))
      }
      
    })
  }
  getAllTypeList() {
    this.pmSrvc.getTypeList().subscribe(res => {
      if(!res.error) {
        this.typeList = res.data
        this.typeListBackup = JSON.parse(JSON.stringify(this.typeList))
      }
      
    })
  }

  readFile(e:any) {
    let input = e.target
    let files = []
    if (input.files && input.files[0]) {
      for  (var i =  0; i <  e.target.files.length; i++)  {  
        files.push(e.target.files[i]);
      }
        this.pmSrvc.uploadEventImages(files).pipe(first()).subscribe(res => {
          if(!res.error) {
            let fileNames: any[] = []
            if(this.productForm.value.images && this.productForm.value.images.length ) {
              fileNames = fileNames.concat(this.productForm.value.images)
            }
            res.data.forEach((file: any) => {
              fileNames.push(file.filename)
            });
            this.productForm.patchValue({
              'images': fileNames
            })
          }
        })
    }
  }

  


  removeImage(imageIndex:number) {
    this.productForm.value.images.splice(imageIndex, 1)
  }

  createProduct(f: any) {
    // console.log(this.memberForm.value)
    tinymce.triggerSave();
    let payLoad = JSON.parse(JSON.stringify(this.productForm.value))
    payLoad.category = this.categoryList.filter( (d:any) => d.selected).map((d:any) => d.id)
    payLoad.types = this.typeList.filter( (d:any) => d.selected).map((d:any) => d.id)
    payLoad.tags = this.productTags;
    if(!payLoad.category.length || !payLoad.types.length ) {
      return;
    }
    this.pmSrvc.createProductgroup(payLoad).subscribe(res => {
      if(!res.error) {
        $(window).scrollTop(0)
        f.resetForm();
        setTimeout(() => {
          tinymce.get(0).setContent("")
        }, 50);
        this.alertSrvc.success("Product added successfully.")
      }
      
    })
  }


 

  ngAfterViewInit() {
    
    tinymce.init({
      selector: '#desc',
      height: 300,
      setup : (ed: any) => {
        ed.on('change', (e: any)=> {
          this.productForm.controls['description'].setValue(ed.getContent())
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
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.productTags.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(tag: string): void {
    const index = this.productTags.indexOf(tag);

    if (index >= 0) {
      this.productTags.splice(index, 1);
    }
  }
  ngOnDestroy() {
    tinymce.remove()
  }
  

}
