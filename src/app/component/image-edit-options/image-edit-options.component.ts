import { Component, Inject, OnInit } from '@angular/core';
import { Dimensions, ImageCroppedEvent, ImageTransform } from './../../image-cropper/interfaces/index';
import {base64ToFile} from './../../image-cropper/utils/blob.utils';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogData } from '../bulk-image-upload/bulk-image-upload.component';



@Component({
  selector: 'app-image-edit-options',
  templateUrl: './image-edit-options.component.html',
  styleUrls: ['./image-edit-options.component.css']
})
export class ImageEditOptionsComponent implements OnInit {

  imageChangedEvent: any = '';
  imageRetrivedData: any;
  croppedImage: any = '';
  canvasRotation = 0;
  rotation = 0;
  scale = 1;
  showCropper = false;
  containWithinAspectRatio = false;
  transform: ImageTransform = {};

  selectedFile: File;
  userData:any;
  imgSrc:any;
  retrievedImage: any = '';
  base64Data: any;
  byteArray:any;
  imageData:any;

constructor(
  public dialogRef: MatDialogRef<ImageEditOptionsComponent>,
  @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  dialogRef.disableClose = true;
  this.userData = JSON.parse(sessionStorage.getItem("Employee"));
  console.log(this.userData);
  if(!this.data.event.base64Data){
    this.imageChangedEvent = this.data.event.imageChanged;
  }
  else{
    console.log("success");
    this.imageRetrivedData = this.data.event.base64Data;
  }
 }

  onNoClick(): void {
  this.dialogRef.close();
}


ngOnInit(): void {
}


public onFileChanged(event) {
  this.selectedFile = event.target.files[0];

  const reader = new FileReader();
      reader.onload = e => this.imgSrc = reader.result;

      reader.readAsDataURL(this.selectedFile);
}

onUpload() {
  console.log(this.selectedFile);
  console.log(base64ToFile(this.croppedImage));
  this.byteArray = this.croppedImage.substring(this.croppedImage.indexOf("base64,")+"base64,".length); 
  this.imageData = {
    employeeId:this.userData.employeeId,
    imageFileName:this.selectedFile.name,
    imageFileType:base64ToFile(this.croppedImage).type,
    imageFileData:this.byteArray
  }
  
  console.log(this.imageData);

}

//------image cropper//

fileChangeEvent(event: any): void {
  this.onFileChanged(event);
  this.imageChangedEvent = event;
}

imageCropped(event: ImageCroppedEvent) {
  this.croppedImage = event.base64;
  console.log(event, base64ToFile(event.base64));
}

imageLoaded() {
  this.showCropper = true;
  console.log('Image loaded');
}

cropperReady(sourceImageDimensions: Dimensions) {
  console.log('Cropper ready', sourceImageDimensions);
}

loadImageFailed() {
  console.log('Load failed');
}

rotateLeft() {
  this.canvasRotation--;
  this.flipAfterRotate();
}

rotateRight() {
  this.canvasRotation++;
  this.flipAfterRotate();
}

private flipAfterRotate() {
  const flippedH = this.transform.flipH;
  const flippedV = this.transform.flipV;
  this.transform = {
      ...this.transform,
      flipH: flippedV,
      flipV: flippedH
  };
}


flipHorizontal() {
  this.transform = {
      ...this.transform,
      flipH: !this.transform.flipH
  };
}

flipVertical() {
  this.transform = {
      ...this.transform,
      flipV: !this.transform.flipV
  };
}

resetImage() {
  this.scale = 1;
  this.rotation = 0;
  this.canvasRotation = 0;
  this.transform = {};
}

zoomOut() {
  this.scale -= .1;
  this.transform = {
      ...this.transform,
      scale: this.scale
  };
}

zoomIn() {
  this.scale += .1;
  this.transform = {
      ...this.transform,
      scale: this.scale
  };
}

toggleContainWithinAspectRatio() {
  this.containWithinAspectRatio = !this.containWithinAspectRatio;
}

updateRotation() {
  this.transform = {
      ...this.transform,
      rotate: this.rotation
  };
}

}
