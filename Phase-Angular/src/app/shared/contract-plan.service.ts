import { HttpClient } from '@angular/common/http';
import { ElementRef, Injectable, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ContractPlanService {
  
  constructor(private http: HttpClient,private userService : UserService) { }
  private BASE_URL = 'http://localhost:8000/PI/api/contractPlans/findall';
  private BASE_URL_DELETE ='http://localhost:8000/PI/api/contractPlans/contrat'
  private apiUrl ='http://localhost:8000/PI/api/contractPlans/revenue/'

  getOffers(): Observable<any> {
    return this.http.get(`${this.BASE_URL}`);
  }
  deleteContractPlan(id: number): Observable<any> {
    return this.http.delete(`${this.BASE_URL_DELETE}/${id}`, { responseType: 'text' });
  
  }
  addContrat(data : any , idOffre : any ):Observable<Number>{
    const authToken = this.userService.getAuthToken();
    const headers = {
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json'
  };
  const options = { headers: headers };
    const requestOptions: Object = {
      /* other options here */
      responseType: 'text',
      headers: headers
    }

    return this.http.post<Number>('http://localhost:8000/PI/api/contractPlans/addContrat/'+idOffre , data,requestOptions)
  }
  
  calculateRevenueForUser(id : number): Observable<number> {
    
    return this.http.get<number>(`${this.apiUrl}`+id);
  }
  
}
