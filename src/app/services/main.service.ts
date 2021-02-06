import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
  
  //responseType: 'text' as 'json'
};

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http:HttpClient) { }

  private baseUrl = "/api/";
  private login = "employee/login";
  private signup = "employee/signup";
  private edit = "image/editImage";
  private bulk = "image/bulkEdit";
  private empList = "employee/getSubordinates/"
  private getAllData = "admin/getAllData"
  private assignManager = "admin/assignManager"

  signUp(userData):Observable<any>{
    return this.http.post<any>(this.baseUrl+this.signup, userData, httpOptions);
  }

  loginUser(userData):Observable<any>{
    return this.http.post<any>(this.baseUrl+this.login, userData, httpOptions);
  }

  uploadImage(imageDate, empId):Observable<any>{
    return this.http.post<any>(this.baseUrl+this.edit+empId, imageDate, {observe:'response'});
  }
  
  uploadAndGetImage(imageDate):Observable<any>{
    return this.http.post<any>(this.baseUrl+this.edit, imageDate, httpOptions);
  }

  uploadBulk(imageDate):Observable<any>{
    return this.http.post<any>(this.baseUrl+this.bulk, imageDate, httpOptions);
  }

  getEmployeeByManagerId(id):Observable<any>{
    return this.http.get<any>(this.baseUrl+this.empList+id);
  }

  getAllFromDB():Observable<any>{
    return this.http.get<any>(this.baseUrl+this.getAllData);
  }

  assignManagerEmployee(data):Observable<any>{
    return this.http.put<any>(this.baseUrl+this.assignManager, data);
  }

}
