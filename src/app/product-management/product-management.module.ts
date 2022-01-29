import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductManagementRoutingModule } from './product-management-routing.module';
import { ManageCategoryComponent } from './manage-category/manage-category.component';
import { ManageProductsComponent } from './manage-products/manage-products.component';
import { ManageSizeComponent } from './manage-size/manage-size.component';
import { ManageColorComponent } from './manage-color/manage-color.component';
import { ManageTypeComponent } from './manage-type/manage-type.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatChipsModule} from '@angular/material/chips';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { ManageProductDtailsComponent } from './manage-product-dtails/manage-product-dtails.component';
import {MatExpansionModule} from '@angular/material/expansion';


@NgModule({
  declarations: [
    ManageCategoryComponent,
    ManageProductsComponent,
    ManageSizeComponent,
    ManageColorComponent,
    ManageTypeComponent,
    AddProductComponent,
    EditProductComponent,
    ManageProductDtailsComponent
  ],
  imports: [
    CommonModule,
    ProductManagementRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatExpansionModule
  ]
})
export class ProductManagementModule { }
