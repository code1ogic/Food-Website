import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { DataService } from 'src/app/Shared/data.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  userTestStatus: any[] = [];

  Orders: any[] = [];

  Details: any[] = [];

  OrderId : any[] = [];
  sum : number = 0;

  constructor(private dataService: DataService, private db: AngularFireDatabase) { }

  ngOnInit(): void {
    this.getAllOrders();
  }

  confirmOrder(orderId : string, details : any, order : any) {

    this.dataService.confirmOrder(orderId,details,order);
    this.db.object('Admin/Orders/'+orderId).remove();
  }

  getAllOrders() {

    this.dataService.getAllOrders().subscribe(actions => {
     
      actions.forEach((action) => {
        this.userTestStatus.push(action.payload.val());
        this.OrderId.push(action.key);
      });

      for (let i = 0; i < this.userTestStatus.length; i++) {

        const order = [];
        const OrderKeys = Object.keys(this.userTestStatus[i].Orders);
        const DetailsKeys = Object.keys(this.userTestStatus[i].Details);

        for (let j = 0; j < OrderKeys.length; j++) {
          order.push(this.userTestStatus[i].Orders[OrderKeys[j]]);
        }

        for (let j = 0; j < DetailsKeys.length; j++) {
          this.Details.push(this.userTestStatus[i].Details[DetailsKeys[j]]);
        }

        this.Orders.push(order);

      }

    });

  }

  calculateTotal(order : any) {
    this.sum = 0;
    order.forEach((element: any) => {
      this.sum += (element.price*element.quantity);
    });
    return this.sum;
  }

  reloadPage() {
    window.location.reload();
  }

}
