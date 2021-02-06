import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  employeeWithManager:any;
  employeeWithoutManager:any;
  manager:any;
  employeeIds:any;
  employeeId:any;
  managerIds:any;
  managerId:any;
  emp_manager:any;
  map:any;


  constructor(private route:Router, private service:MainService) { 
    this.employeeIds = [];
    this.managerIds = [];
    this.emp_manager = [];
    this.map ={
        employeeId:'',
        managerId:''
    }
  }

  ngOnInit(): void {
    this.getData();
  }

  logout(){
    sessionStorage.clear();
    this.route.navigate(['/login']);
  }

  getData(){
    this.employeeIds = [];
    this.managerIds = [];
    this.emp_manager = [];
    
    this.service.getAllFromDB().subscribe({
      next:response => {
        console.log(response);
        this.employeeWithManager = response.employeeSetWithManager;
        this.employeeWithoutManager = response.employeeSetWithoutManager;
        this.manager = response.managerSet;

        if(this.employeeWithManager){
          this.employeeWithManager.forEach(element => {
            this.map.employeeId = element.employeeId;
            this.map.managerId = element.manager.employeeId;
            this.emp_manager.push(JSON.parse(JSON.stringify(this.map)));
          });
        }

        if(this.employeeWithoutManager){
          this.employeeWithoutManager.forEach(element => {
            this.employeeIds.push(JSON.parse(JSON.stringify(element.employeeId)));
          });
        }

        this.employeeIds.sort();

        if(this.manager){
          this.manager.forEach(element => {
            this.managerIds.push(JSON.parse(JSON.stringify(element.employeeId)));
          });
        }
      },
      error:err => {
        console.log(err);
      }
    })
  }

  getSelected(event){
    
    console.log(event);
    
  }

  assignEmployee(){
    this.map.employeeId = this.employeeId;
    this.map.managerId = this.managerId;
    

    this.service.assignManagerEmployee(this.map).subscribe({
      next:response => {
        console.log(response);
        this.getData();
      },
      error:err => {
        console.log(err);
      }
    });
  }

}
