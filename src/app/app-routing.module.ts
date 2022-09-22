import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminUserComponent } from './Modulos/admin-user/admin-user.component';

const routes: Routes = [

  {path: '', redirectTo: 'admin', pathMatch: 'full'},
  {path: '', component: AdminUserComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
