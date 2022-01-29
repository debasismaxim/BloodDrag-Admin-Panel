import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../_common/guards/auth.guard';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { ManageCategoryComponent } from './manage-category/manage-category.component';
import { ManageColorComponent } from './manage-color/manage-color.component';
import { ManageProductDtailsComponent } from './manage-product-dtails/manage-product-dtails.component';
import { ManageProductsComponent } from './manage-products/manage-products.component';
import { ManageSizeComponent } from './manage-size/manage-size.component';
import { ManageTypeComponent } from './manage-type/manage-type.component';

const routes: Routes = [
  {
    path: 'manage-category',
    canActivate: [AuthGuard],
    component: ManageCategoryComponent,
  },
  {
    path: 'manage-size',
    canActivate: [AuthGuard],
    component: ManageSizeComponent,
  },
  {
    path: 'manage-color',
    canActivate: [AuthGuard],
    component: ManageColorComponent,
  },
  {
    path: 'manage-products',
    canActivate: [AuthGuard],
    component: ManageProductsComponent,
  },
  {
    path: 'add-product',
    canActivate: [AuthGuard],
    component: AddProductComponent,
  },
  {
    path: 'edit-product/:productId',
    canActivate: [AuthGuard],
    component: EditProductComponent,
  },
  {
    path: 'manage-product-details/:productId',
    canActivate: [AuthGuard],
    component: ManageProductDtailsComponent,
  },
  {
    path: 'manage-type',
    canActivate: [AuthGuard],
    component: ManageTypeComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductManagementRoutingModule { }
