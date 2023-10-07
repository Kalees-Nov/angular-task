import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CitizenService {
  private apiUrl = "http://localhost:3000"

  constructor(private http: HttpClient) { }

  postData(citizenObj:any):Observable<any>{
    return this.http.post<any>(this.apiUrl + '/citizenDetails', citizenObj);
  }

  postLoginData(loginObj:any):Observable<any>{
    return this.http.post<any>(this.apiUrl + '/loginDetails', loginObj);
  }

  getAllCitizenDetailsData():Observable<any>{
    return this.http.get<any>(this.apiUrl + '/citizenDetails')
  }

  deleteAllCitizenDetailsData(id: any): Observable<any> {
    return this.http.delete<any>(this.apiUrl +`/citizenDetails/${id}`);
  }

  getCitizenData(id: any): Observable<any> {
    return this.http.get<any>(this.apiUrl +`/citizenDetails/${id}`);
  }
  
  getLoginData(id: any): Observable<any> {
    return this.http.get(`${this.apiUrl}` + "/loginDetails/" + id)
  }
  
  updateData(id:any,obj:any){
    return this.http.put(`${this.apiUrl}` + "/citizenDetails/" + id,obj)
  }

}
