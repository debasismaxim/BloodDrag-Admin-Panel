import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/app/_common/services/alert.service';
import { environment } from 'src/environments/environment';
import { PmService } from '../pm.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { ActivatedRoute } from '@angular/router';
import { DeleteConfirmDialogComponent } from 'src/app/_common/components/delete-confirm-dialog/delete-confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
declare var $:any;

@Component({
  selector: 'app-manage-product-dtails',
  templateUrl: './manage-product-dtails.component.html',
  styleUrls: ['./manage-product-dtails.component.scss']
})
export class ManageProductDtailsComponent implements OnInit {

  startDate = ''
  step = 0;
  productId: any
  today = new Date()
  productForm: FormGroup;
  colorList:any = []
  sizeList:any = []
  productTags: any = []
  colorListBackup: any
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  productDetails: any
  productImageBaseUrl = environment.baseUrl + "/uploads/products/"
  onlyNumberRegex = /^\d+$/;
  childProducts: any

  constructor(private pmSrvc: PmService, private fb: FormBuilder, 
    private alertSrvc: AlertService, private activeRoute: ActivatedRoute, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllcolorList()
    this.getAllSizeList()
    
    this.productId = this.activeRoute.snapshot.params['productId'];
    this.getAllChildProducts()
    this.getProductDetails(this.productId)
    this.productForm = this.fb.group({
      itemTitle: ['', Validators.required],
      model: ['', Validators.required],
      price: ['', Validators.required],
      size: ['', Validators.required],
      availableQuantity: ['', Validators.required],
      weight: ['', Validators.required],
      dimensionL: ['', Validators.required],
      dimensionW: ['', Validators.required],
      dimensionD: ['', Validators.required],
      images: ['']
    });
  }

  getAllChildProducts() {
    this.pmSrvc.getAllChildProducts(this.productId).subscribe(res => {
      if(!res.error) {
        this.childProducts = res.data
        this.childProducts.forEach((el:any) => {
          el.colorList = JSON.parse(JSON.stringify(this.colorListBackup));
          el.colorList.forEach((c: any) => {
            if(el.colors.includes(c.id)) {
              c.selected = true
            
            }
          });
        });
      }
      
    })
  }

  getAllcolorList() {
    this.pmSrvc.getColorList().subscribe(res => {
      if(!res.error) {
        this.colorList = res.data
        this.colorListBackup = JSON.parse(JSON.stringify(this.colorList))
      }
      
    })
  }
  getAllSizeList() {
    this.pmSrvc.getAllSizes().subscribe(res => {
      if(!res.error) {
        this.sizeList = res.data
      }
    })
  }
  getProductDetails(id: number) {
    this.pmSrvc.getProductgroup(id).subscribe(res => {
      if(!res.error) {
        this.productDetails = res.data;
        this.setEditForm()
      }
    })
  }

  setEditForm() {
    this.productForm.patchValue({
      itemTitle: this.productDetails.itemTitle,
      model: this.productDetails.model,
    })
    // this.productTags = JSON.parse(JSON.stringify(this.productDetails.tags))
    // this.categoryList.forEach((cat:any) => {
    //   if(this.productDetails.category.includes(cat.id)) {
    //     cat.selected = true
    //   }
    // });
    // this.typeList.forEach((typ:any) => {
    //   if(this.productDetails.types.includes(typ.id)) {
    //     typ.selected = true
    //   }
    // });
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

  readFileAccordian(prod:any, e:any) {
    let input = e.target
    let files = []
    if (input.files && input.files[0]) {
      for  (var i =  0; i <  e.target.files.length; i++)  {  
        files.push(e.target.files[i]);
      }
        this.pmSrvc.uploadEventImages(files).pipe(first()).subscribe(res => {
          if(!res.error) {
            let fileNames: any[] = []
            if(prod.images && prod.images.length ) {
              fileNames = fileNames.concat(prod.images)
            }
            res.data.forEach((file: any) => {
              fileNames.push(file.filename)
            });
            prod.images = fileNames;
          }
        })
    }
  }
  


  removeImage(imageIndex:number) {
    this.productForm.value.images.splice(imageIndex, 1)
  }

  removeProdImage(imageIndex:number, prod: any) {
    prod.images.splice(imageIndex, 1)
  }

  createProduct(f: any) {
    // console.log(this.memberForm.value)
    let payLoad = JSON.parse(JSON.stringify(this.productForm.value))
    payLoad.colors = this.colorList.filter( (d:any) => d.selected).map((d:any) => d.id)
    payLoad.parentId = this.productId
    if(!payLoad.colors.length ) {
      return;
    }
    this.pmSrvc.createProduct( payLoad).subscribe(res => {
      if(!res.error) {
        $(window).scrollTop(0)
        this.getAllChildProducts()
        this.alertSrvc.success("Product created successfully.")
      }
      
    })
  }

  updateProduct(prod: any) {
    
    this.pmSrvc.updateProduct( prod ).subscribe(res => {
      if(!res.error) {
        $(window).scrollTop(0)
        
        this.alertSrvc.success("Product updated successfully.")
      }
      
    })
  }

  deleteProduct(prod: any) {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      width: '400px',
      disableClose: true,
      data: {message: "Are you sure to delete the product details?"}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.pmSrvc.deleteProduct( prod ).subscribe(res => {
          if(!res.error) {
            $(window).scrollTop(0)
            this.getAllChildProducts()
            this.alertSrvc.success("Product deleted successfully.")
          }
          
        })
      }
    })
  }

  colorNames(keys: any) {
    return this.colorList.filter((d: any) => keys.includes(d.id)).map((d:any) => d.name).join(", ")
  }

  getObjById(id: any, arr: any[]) {
    return arr.filter((d:any) => d.id == id)[0]
  }


  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
 

  ngAfterViewInit() {
    

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


}
