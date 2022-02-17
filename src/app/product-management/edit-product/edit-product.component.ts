import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/app/_common/services/alert.service';
import { environment } from 'src/environments/environment';
import { PmService } from '../pm.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { ActivatedRoute } from '@angular/router';
declare var $: any;
declare var tinymce: any;

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  startDate = ''
  productId: any
  today = new Date()
  productForm: FormGroup;
  featuredProduct = false;
  categoryList: any = []
  typeList: any = []
  productTags: any = []
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  productDetails: any
  productImageBaseUrl = environment.baseUrl + "/uploads/products/"

  constructor(private pmSrvc: PmService, private fb: FormBuilder,
    private alertSrvc: AlertService, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getAllCategoryList()
    this.getAllTypeList()
    this.productId = this.activeRoute.snapshot.params['productId'];
    this.getProductDetails(this.productId)
    this.productForm = this.fb.group({
      itemTitle: ['', Validators.required],
      model: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      images: [''],
    });
  }

  getAllCategoryList() {
    this.pmSrvc.getCategoryList().subscribe(res => {
      if (!res.error) {
        this.categoryList = res.data
        this.setEditForm()
      }

    })
  }
  getAllTypeList() {
    this.pmSrvc.getTypeList().subscribe(res => {
      if (!res.error) {
        this.typeList = res.data
        this.setEditForm()
      }

    })
  }
  getProductDetails(id: number) {
    this.pmSrvc.getProductgroup(id).subscribe(res => {
      if (!res.error) {
        this.productDetails = res.data;
        this.setEditForm()
      }
    })
  }

  setEditForm() {
    console.log(this.productDetails);
    this.productForm.patchValue({
      itemTitle: this.productDetails.itemTitle,
      model: this.productDetails.model,
      category: this.productDetails.category,
      price: this.productDetails.price,
      types: this.productDetails.types,
      description: this.productDetails.description,
      images: this.productDetails.images,
      tags: this.productDetails.tags,
    })
    this.featuredProduct = this.productDetails.featured;
    this.productTags = JSON.parse(JSON.stringify(this.productDetails.tags))
    this.categoryList.forEach((cat: any) => {
      if (this.productDetails.category.includes(cat.id)) {
        cat.selected = true
      }
    });
    this.typeList.forEach((typ: any) => {
      if (this.productDetails.types.includes(typ.id)) {
        typ.selected = true
      }
    });
  }


  readFile(e: any) {
    let input = e.target
    let files = []
    if (input.files && input.files[0]) {
      for (var i = 0; i < e.target.files.length; i++) {
        files.push(e.target.files[i]);
      }
      this.pmSrvc.uploadEventImages(files).pipe(first()).subscribe(res => {
        if (!res.error) {
          let fileNames: any[] = []
          if (this.productForm.value.images && this.productForm.value.images.length) {
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




  removeImage(imageIndex: number) {
    this.productForm.value.images.splice(imageIndex, 1)
  }

  createProduct(f: any) {
    // console.log(this.memberForm.value)
    tinymce.triggerSave();
    let payLoad = JSON.parse(JSON.stringify(this.productForm.value))
    payLoad.category = this.categoryList.filter((d: any) => d.selected).map((d: any) => d.id)
    payLoad.types = this.typeList.filter((d: any) => d.selected).map((d: any) => d.id)
    payLoad.tags = this.productTags;
    if (!payLoad.category.length || !payLoad.types.length) {
      return;
    }
    payLoad.featured = this.featuredProduct;
    this.pmSrvc.updateProductGroup(this.productId, payLoad).subscribe(res => {
      if (!res.error) {
        $(window).scrollTop(0)
        // setTimeout(() => {
        //   tinymce.get(0).setContent("")
        // }, 50);
        this.alertSrvc.success("Product updated successfully.")
      }

    })
  }




  ngAfterViewInit() {

    tinymce.init({
      selector: '#desc',
      height: 300,
      setup: (ed: any) => {
        ed.on('change', (e: any) => {
          this.productForm.controls['description'].setValue(ed.getContent())
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