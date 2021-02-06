import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import { MainService } from 'src/app/services/main.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  empRole:any;

  role:String;

  constructor(private _snackBar: MatSnackBar, 
    public dialog: MatDialog, 
    private service:MainService,
    private route:Router) {
    
    this.empRole = [
      "employee","manager"
    ];
    this.role="";

   }

  ngOnInit(): void {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(RegisterSuccess);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  }

  getRole(role){
    console.log(role.value);
    this.role=role.value;
    
  }

  userform = new FormGroup({
    employeeName:new FormControl('',[Validators.required,Validators.minLength(3)]),
    email: new FormControl('',[Validators.email]),
    password: new FormControl('',[Validators.required,Validators.minLength(6)]),
  });

  get passwordLength() {
    return this.userform.get('password');
  }  

  get nameLength() {
    return this.userform.get('employeeName');
  }  

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

      this.service.signUp(this.userform.value).subscribe({
        next:response =>{
          console.log(response);
          alert("signup successfully");
          this.route.navigate(['/login']);
        },
        error:err =>{
          console.log(err);
        }
      });
      
    }
    

  }

}

@Component({
  selector: 'register-success',
  template: '<p>User Registered Successfully<p>'
})
export class RegisterSuccess {}


