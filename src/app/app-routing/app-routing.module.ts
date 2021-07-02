import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../shared/guards/auth/auth.guard';

import { HomeComponent } from 'app/main/home/home.component';


const routers: Routes = [
  { path: '', component: HomeComponent, data: { title: '' } },
   { path: 'home', component: HomeComponent, data: { title: '' } },
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routers),
  ],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
