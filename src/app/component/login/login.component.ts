import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {Router} from "@angular/router";
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router, private _snackBar: MatSnackBar) { }

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
      console.log("form submitted"+this.userform);
      this.router.navigate(['/croptool']);
    }
    
  }


}
