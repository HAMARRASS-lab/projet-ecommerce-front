import { AdminService } from './../../service/admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private AdminService: AdminService) { }

  ngOnInit(): void {

    this.getAllProducts();
  }

  products: any[] =[];

  getAllProducts(){
    this.products=[];
    this.AdminService.getAllProducts.subscribe(res=>{
      res.forEach(element=>{
        element.processedImg='data:image/jpeg;base64,' +element.bytemg;
        this.products.push(element);
      });
    })

  }

}
