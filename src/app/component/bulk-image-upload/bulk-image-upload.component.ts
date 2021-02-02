import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bulk-image-upload',
  templateUrl: './bulk-image-upload.component.html',
  styleUrls: ['./bulk-image-upload.component.css']
})
export class BulkImageUploadComponent implements OnInit {

  bulkImageArray:any;
  employeeList:any;

  imageObject:any = {
    file:null,
    employeeId:''
  };

  constructor(private route:Router) {
    this.bulkImageArray = [];
    this.employeeList = [1,2,3,4,5,6];
   }

  ngOnInit(): void {
  }

  logout(){
    sessionStorage.clear();
    this.route.navigate(['/login']);
  }

  getSelected(event){
    console.log(event);
  }

  addEmptyRow(){
    this.bulkImageArray.push(JSON.parse(JSON.stringify(this.imageObject)));
  }

  upload(item){
    console.log(this.bulkImageArray);
  }
  deleteEmptyRow(i){
    this.bulkImageArray.splice(i,1);
    console.log(i);
  }

  img:any;
  public onFileChanged(event,item) {
    item.file = event.target.files[0];

    // const reader = new FileReader();
    //     reader.onload = e => this.img = reader.result;

    //     reader.readAsDataURL(item.file);
    //     console.log(this.img);
  }

}
