import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MainService } from 'src/app/services/main.service';
import {Router} from "@angular/router";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  isLoading:boolean;
  empRole:any;

  role:String;

  constructor(private _snackBar: MatSnackBar, 
    public dialog: MatDialog, 
    private service:MainService,
    private route:Router) {
    
    this.isLoading = false;
    this.empRole = [
      "employee","manager"
    ];
    this.role="";

   }

  ngOnInit(): void {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(RegisterSuccess, {
      width: '20%',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result+': The dialog was closed');
      this.route.navigate(['/login']);
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
    
    this.isLoading = true;
    
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
          this.isLoading = false;
          console.log(response);
          this.openDialog();
          
        },
        error:err =>{
          this.isLoading = false;
          console.log(err);
          this._snackBar.open("Please try again later","Internal Server Error", {
            duration: 2000,
          })
        }
      });
      
    }
    

  }

}

@Component({
  selector: 'register-success',
  template: `<h1 mat-dialog-title>Success Alert </h1>
  <div mat-dialog-content>
    <p>Registration Success</p>
  </div>
  <div mat-dialog-actions>
    <button class="btn btn-primary" [mat-dialog-close]="result" cdkFocusInitial>Ok</button>
  </div>`
})
export class RegisterSuccess {
  result:any = 'success'
  constructor(public dialogRef: MatDialogRef<RegisterSuccess>){

  }
}


