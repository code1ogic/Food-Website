import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './Componets/dashboard/dashboard.component';
import { MenuComponent } from './Componets/dashboard/menu/menu.component';
import { OrdersComponent } from './Componets/dashboard/orders/orders.component';
import { LoginComponent } from './Componets/login/login.component';

const routes: Routes = [
  {path:'',pathMatch:"full",redirectTo:'login'},
  {path:'login',component:LoginComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'dashboard/orders',component:OrdersComponent},
  {path:'dashboard/menu',component:MenuComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
