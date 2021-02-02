import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from 'src/app/services/main.service';
import { Dimensions, ImageCroppedEvent, ImageTransform } from './../../image-cropper/interfaces/index';
import {base64ToFile} from './../../image-cropper/utils/blob.utils';


@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {
  
    imageChangedEvent: any = '';
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
  retrievedImage: any;
  base64Data: any;

  constructor(private route:Router, private service:MainService) {
    //this.userData = JSON.parse(sessionStorage.getItem("Employee"));
    //console.log(this.userData);
   }

  ngOnInit(): void {
  }


  public onFileChanged(event) {
    this.selectedFile = event.target.files[0];

    const reader = new FileReader();
        reader.onload = e => this.imgSrc = reader.result;

        reader.readAsDataURL(this.selectedFile);
  }

  logout(){
    sessionStorage.clear();
    this.route.navigate(['/login']);
  }

  onUpload() {
    console.log(this.selectedFile);
    console.log(base64ToFile(this.croppedImage));
    
    // const uploadImageData = new FormData();
    // uploadImageData.append('image', this.selectedFile, this.selectedFile.name);

    // this.service.uploadImage(uploadImageData,this.userData.employeeId).subscribe({
    //   next:response =>{
    //     console.log(response.body);
    //     this.base64Data = response.body.imageFileData;
    //     this.retrievedImage = 'data:image/jpeg;base64,'+this.base64Data;
    //   },
    //   error:err =>{
    //     console.log(err);
    //   }
    // });

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
