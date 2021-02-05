import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from  './component/register/register.component';
import { ImageUploadComponent } from './component/image-upload/image-upload.component';
import { BulkImageUploadComponent } from './component/bulk-image-upload/bulk-image-upload.component'; 
import { ImageEditOptionsComponent } from './component/image-edit-options/image-edit-options.component';
import { ManagerComponent } from './component/manager/manager.component';
import { EmployeeComponent } from './component/employee/employee.component';

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'croptool', component:ImageUploadComponent},
  {path:'imageedit', component:ImageEditOptionsComponent},
  {path:'manager/bulkupload', component:BulkImageUploadComponent},
  {path:'manager/selfupload', component:ManagerComponent},
  {path:'employee', component:EmployeeComponent},
  {path: '**', component:LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
