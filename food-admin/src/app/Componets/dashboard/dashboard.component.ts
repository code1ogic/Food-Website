import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Shared/auth.service';
import { DataService } from 'src/app/Shared/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  orders: boolean = false;
  menu: boolean = false;
  bill: boolean = false;

  constructor(private dataService: DataService, private authService : AuthService) { }

  ngOnInit(): void {
    this.showOrders();
  }

  setOff() {
    this.orders = false;
    this.menu = false;
    this.bill = false;
  }

  // show dashboard section
  showOrders() {
    this.setOff();
    this.orders = true;
  }

  // show menu section
  showMenu() {
    this.setOff();
    this.menu = true;
  }

  // show bill section
  showBill() {
    this.setOff();
    this.bill = true;
  }

  // sign out
  signout() {
    this.authService.logout();
  }
}
