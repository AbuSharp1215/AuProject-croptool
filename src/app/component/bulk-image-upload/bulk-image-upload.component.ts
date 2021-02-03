import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { ImageEditOptionsComponent } from '../image-edit-options/image-edit-options.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MainService } from 'src/app/services/main.service';

export interface DialogData {
  event: any,
  croppedImage:any
}

@Component({
  selector: 'app-bulk-image-upload',
  templateUrl: './bulk-image-upload.component.html',
  styleUrls: ['./bulk-image-upload.component.css']
})
export class BulkImageUploadComponent implements OnInit {

  bulkImageArray:any;
  employeeList:any;
  selectedFile:any;
  imageChangeEvent:any;

  cropperImage:any;

  imageObject:any = {
    file:null,
    employeeId:'',
    imageFileName:'',
    imageFileType:'',
    imageFileData:'',
    retrivedImage:''
  };

  requestBody:any;
  imageWrapper:any = {
    employeeId:'',
    imageFileName:'',
    imageFileType:'',
    imageFileData:'',
  };

  userData:any;
  byteArray:any;

  constructor(private route:Router,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private service:MainService) {

      
    this.bulkImageArray = [];
    this.requestBody = [];
    this.employeeList = [1,2,3,4,5,6];

    this.userData = JSON.parse(sessionStorage.getItem("Manager"));
    console.log(this.userData);
   }

   openDialog(item): void {
     if(item.imageFileData==''){
      this._snackBar.open("Please Select an Image", "Validation error", {
        duration: 2000,
      })
      return;
     }
    const dialogRef = this.dialog.open(ImageEditOptionsComponent, {
      width: '100%',
      data: {event:item.imageChangeEvent, croppedImage:item.imageFileData}
    });

    dialogRef.afterClosed().subscribe(result => {
      item.imageFileData = result;
      console.log('The dialog was closed');
    });
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
   // item.imageFileData = this.img;
    console.log(this.bulkImageArray);
  }
  deleteEmptyRow(i){
    this.bulkImageArray.splice(i,1);
    console.log(i);
  }

  img:any;
  public onFileChanged(event,item) {
    item.imageChangeEvent = event;
    item.file = event.target.files[0];
    item.imageFileName = item.file.name;
    item.imageFileType = item.file.type;
    
    const reader = new FileReader();
    
    reader.readAsDataURL(item.file);
    reader.onload = function(){
      
      item.imageFileData = reader.result;
      //console.log(reader.result);
    }
    reader.onerror = function(error){
      console.log(error);
    }
    
    console.log(this.bulkImageArray);
  }

  saveData(){
    this.requestBody=[];
    this.bulkImageArray.forEach(element => {
      if(element.employeeId=='' || element.imageFileNam=='' || element.imageFileType=='' || element.imageFileData==''){
        this._snackBar.open("Please fill all fields correctly", "Validation error", {
          duration: 2000,
        })
        return;
      }
      else{
        this.imageWrapper.employeeId = element.employeeId;
        this.imageWrapper.imageFileName = element.imageFileName;
        this.imageWrapper.imageFileType = element.imageFileType;
        this.byteArray = element.imageFileData.substring(element.imageFileData.indexOf("base64,")+"base64,".length); 
        this.imageWrapper.imageFileData = this.byteArray;
        this.requestBody.push(JSON.parse(JSON.stringify(this.imageWrapper)));
      }
    });

    // console.log(this.bulkImageArray.length)
    // console.log(this.requestBody.length)
    if(this.bulkImageArray.length == this.requestBody.length){

      console.log(this.requestBody)
      this.service.uploadBulk(this.requestBody).subscribe({
        next:response =>{
          console.log(response.responseEditedImages);
          response.responseEditedImages.forEach((element,index) => {
            console.log(element);
            console.log(index);
            this.bulkImageArray[index].retrivedImage = 'data:image/jpeg;base64,'+element.imageFileData;
            //expect(this.bulkImageArray[index].retrivedImage).toBe('data:image/jpeg;base64,'+element.imageFileData);
          });
        },
        error:err=>{
          console.log(err);
        }
      });
    }

    
  }
}
