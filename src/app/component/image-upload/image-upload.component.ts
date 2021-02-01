import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {

  selectedFile: File;
  userData:any;
  imgSrc:any;
  retrievedImage: any;
  base64Data: any;

  constructor(private route:Router, private service:MainService) {
    this.userData = JSON.parse(sessionStorage.getItem("Employee"));
    console.log(this.userData);
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
    
    const uploadImageData = new FormData();
    uploadImageData.append('image', this.selectedFile, this.selectedFile.name);

    this.service.uploadImage(uploadImageData,this.userData.employeeId).subscribe({
      next:response =>{
        console.log(response.body);
        this.base64Data = response.body.imageFileData;
        this.retrievedImage = 'data:image/jpeg;base64,'+this.base64Data;
      },
      error:err =>{
        console.log(err);
      }
    });

  }
}
