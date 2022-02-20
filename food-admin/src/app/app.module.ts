import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './Componets/dashboard/dashboard.component';
import { LoginComponent } from './Componets/login/login.component';
import {AngularFireModule} from '@angular/fire/compat'
import { environment } from 'src/environments/environment';
import { OrdersComponent } from './Componets/dashboard/orders/orders.component';
import { MenuComponent } from './Componets/dashboard/menu/menu.component';
import { BillsComponent } from './Componets/dashboard/bills/bills.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    OrdersComponent,
    MenuComponent,
    BillsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
