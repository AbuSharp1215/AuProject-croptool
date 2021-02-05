import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { ImageEditOptionsComponent } from '../image-edit-options/image-edit-options.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MainService } from 'src/app/services/main.service';
import {base64ToFile} from './../../image-cropper/utils/blob.utils';

declare var require: any;

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
  employeeIds:any;
  tempId:any;
  selectedFile:any;
  imageChangeEvent:any;

  cropperImage:any;
  responseArray:any;
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

    this.responseArray=[];
    this.bulkImageArray = [];
    this.requestBody = [];
    this.employeeList = [];
    this.employeeIds = [];
    this.tempId = [];

   
   }

   ngOnInit(): void {
    this.userData = JSON.parse(sessionStorage.getItem("employee"));
    if(!this.userData){
      console.log("no data found");
      this.route.navigate(['']);
    } 
    console.log(this.userData);

    this.service.getEmployeeByManagerId(this.userData.employeeId).subscribe({
      next:response => {
        console.log(response);
        this.employeeList = response.subordinateList;
        if(this.employeeList){
          this.employeeList.forEach((element, index) => {
            this.employeeIds[index] = this.employeeList[index].employeeId;
          });
          this.employeeIds.sort();
          console.log(this.employeeList);
        }
      },
      error: err => {
        console.log(err);
      }
    });

   
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

 

  logout(){
    sessionStorage.clear();
    this.route.navigate(['/login']);
  }

  getSelected(event){
    this.tempId.push(event.value);
    console.log(event);
    console.log(this.bulkImageArray);
  }

  addEmptyRow(){
    if(this.bulkImageArray.length<this.employeeList.length)
      this.bulkImageArray.push(JSON.parse(JSON.stringify(this.imageObject)));
    else{
      this._snackBar.open("only "+this.employeeList.length+" employees assigned to you", "Limitaion error", {
        duration: 2000,
      })
    }
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
          console.log("response from server "+response.responseEditedImages);
          this.responseArray = response.responseEditedImages;
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

  download(index){
    var FileSaver = require('file-saver');
    FileSaver.saveAs(base64ToFile('data:image/jpeg;base64,'+this.responseArray[index].imageFileData), this.responseArray[index].imageFileName+"_image.jpeg");
  }
}
