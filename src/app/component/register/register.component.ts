import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  empRole:any;

  role:String;

  constructor(private _snackBar: MatSnackBar) {
    this.empRole = [
      "Employee","Manager"
    ];
    this.role="";

   }

  ngOnInit(): void {
  }

  getRole(role){
    console.log(role.value);
    this.role=role.value;
    
  }

  userform = new FormGroup({
    employeeName:new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required]),
  });


  register(){
    if(this.userform.invalid){
      this._snackBar.open("Please fill all fields correctly", "Validation error", {
        duration: 2000,
      })
    }
    else if(this.role==""){
      this._snackBar.open("Please select your role", "Validation error", {
        duration: 2000,
      })
    }
    else{
      this.userform.value.role = this.role;
      console.log(this.userform.value);

      
    }
    

  }

}
