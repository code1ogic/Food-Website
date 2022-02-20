import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/Shared/data.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  Id: number = 0;
  product_name: string = '';
  product_dis: string = '';
  product_stock: number = 0;
  product_price: number = 0;
  product_id: string = '';

  constructor(private dataService: DataService, private fireStorage: AngularFireStorage) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  products: any[] = [];
  selectedFiles !: FileList;
  percentage: number = 0;

  selectFile(event: any) {
    this.selectedFiles = event.target.files;
  }

  getAllProducts() {
    this.products = [];
    this.dataService.getAllProducts().subscribe(res => {
      res.forEach((action) => {
        this.products.push(action.payload.val());
      });
    })
  }

  addProduct() {
    const path = 'Uploads/' + this.selectedFiles[0].name;

    const storageRef = this.fireStorage.ref(path);
    const uploadTask = storageRef.put(this.selectedFiles[0]);

    uploadTask.snapshotChanges().pipe(finalize(() => {
      storageRef.getDownloadURL().subscribe(downloadLink => {
        this.dataService.addProduct(this.product_dis, this.product_name, this.product_price, downloadLink, this.product_stock);
        this.getAllProducts();
        window.location.reload();
        this.resetForm();
      });
      })
    ).subscribe( (res : any) => {
      this.percentage = (res.bytesTransferred * 100 / res.totalBytes);
   }, err => {
      console.log('Error occured');
   });

  }

  deleteProduct(product: any) {
    if (window.confirm('Are you sure you want to delete ' + product.name + ' ?')) {
      this.dataService.deleteProduct(product.id);
      this.getAllProducts();
      window.location.reload();
    }
  }

  editProduct(product: any) {
    this.product_name = product.name;
    this.product_dis = product.discription;
    this.product_stock = product.stock;
    this.product_price = product.price;
    this.product_id = product.id;
  }

  updateProduct() {
    this.dataService.updateProduct(this.product_dis, this.product_name, this.product_price, this.product_stock, this.product_id);
    this.resetForm();
    this.getAllProducts();
    window.location.reload();
  }

  resetForm() {
    this.product_name = '';
    this.product_dis = '';
    this.product_stock = 0;
    this.product_price = 0;
    this.product_id = '';
  }

}


