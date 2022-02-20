import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from '@angular/fire/compat/database'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  Id : string ='';
  orders : Observable<any[]>;
  products : Observable<any[]>;
  bills : Observable<any[]>;
  constructor(private db: AngularFireDatabase) {
    this.orders = db.list('Admin/Orders').snapshotChanges();
    this.products = db.list('Admin/Products').snapshotChanges();
    this.bills = db.list('Admin/Bills').snapshotChanges();
  }

  getAllOrders() {
    return this.orders;
  }

  getAllProducts() {
    return this.products;
  }

  getAllBills() {
    return this.bills;
  }

  addProduct(product_dis: string, product_name: string, product_price: number,downloadLink: string, product_stock: number) {
    this.Id = this.db.createPushId();
    this.db.object('Admin/Products/'+this.Id).set({
      id : this.Id,
      name : product_name,
      discription : product_dis,
      stock : product_stock,
      price : product_price,
      imgUrl : downloadLink
    })
  }

  deleteProduct(product_id : string) {
    this.db.object('Admin/Products/'+product_id).remove();
  }

  updateProduct(product_dis: string, product_name: string, product_price: number, product_stock: number, product_id : string) {
    this.db.object('Admin/Products/'+product_id).update({
      id : product_id,
      name : product_name,
      discription : product_dis,
      stock : product_stock,
      price : product_price
    })
  }

  confirmOrder(orderId: string, details: any, order: any) {
    let Id = this.db.createPushId();
    this.db.object('Admin/Bills/'+orderId+'/Details/'+Id).set(details);

    order.forEach((element : any) => {
      Id = this.db.createPushId();
      this.db.object('Admin/Bills/'+orderId+'/Orders/'+Id).set(element);
    });
  }

}
