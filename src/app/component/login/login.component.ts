import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {Router} from "@angular/router";
import {MatSnackBar} from '@angular/material/snack-bar';
import { MainService } from 'src/app/services/main.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email:String;
  password:String;

  data:any;

  constructor(private router:Router, 
    private _snackBar: MatSnackBar,
    private service:MainService) {
      this.data ={
        email:"",
        password:""
      }
     }

  ngOnInit(): void {
  }

  userform = new FormGroup({
    email: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required]),
  });

  login(){
    if(this.userform.invalid){
      this._snackBar.open("Please fill all fields correctly", "Validation error", {
        duration: 2000,
      })
    }
    else{
      console.log("form submitted"+this.userform.value);
      console.log(this.email);
      console.log(this.password);
      this.data.email = this.email;
      this.data.password = this.password;

      this.service.loginUser(this.data).subscribe({
        next:response => {
          console.log(response);
          var role = response.role;
          if(role=='Manager'){
            sessionStorage.setItem(role,JSON.stringify(response));
            this.router.navigate(['/manager']);
          }
          else{
            sessionStorage.setItem(role,JSON.stringify(response));
            this.router.navigate(['/croptool']);
          }
          
        },
        error: err =>{
          console.log(err.error.message);
          this._snackBar.open(err.error.message, "error", {
            duration: 2000,
          })
        }
      });
      //this.router.navigate(['/manager']);
    }
    
  }


}
