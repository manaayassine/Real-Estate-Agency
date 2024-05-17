import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/shared/auth.service';

import { RentalContractServiceService } from 'src/app/shared/rental-contract-service.service';
import { UserService } from 'src/app/shared/user.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-navbarfront',
  templateUrl: './navbarfront.component.html',
  styleUrls: ['./navbarfront.component.css']
})
export class NavbarfrontComponent implements OnInit {

  list!:any
number: number = 2;
boolean: boolean ;
contratYoufa : any=[];

userid:any

  
  constructor(private userService: UserService,private service: RentalContractServiceService,private cookieService: CookieService, private router:Router, public authService:AuthService) { }
  token!: string;
  ngOnInit(): void {
    if (this.authService.checkToken()) {
      // Si un token est présent, extraire le nom d'utilisateur à partir du token
      const token = this.cookieService.get('token');
    }

    const authToken = this.userService.getAuthToken();

    this.userid=this.getDecodedAccessToken(authToken).userid;
    this.service.getUsersFinContrat().subscribe(
      (res) => {
        this.list = res;
        this.list.map((i:any)=>{
          if(i==this.userid){
            this.boolean=true
          }
        })
        console.log("--------------"+res);
      }

    )

    this.service.getContratYoufaBaadTroisJoirs().subscribe(res =>
      {
        this.contratYoufa=JSON.parse(res) ;
        console.log("+++++++++"+res) ;
  
      } ) 
      if (this.authService.checkToken()) {
        // Si un token est présent, extraire le nom d'utilisateur à partir du token
        const token = this.cookieService.get('token');
      }
  }
  public getFirstnameFromCookie(): string {
    var token = this.cookieService.get("token");
    if (token != null && token.length != 0) {
      var payLoad = JSON.parse(window.atob(token.split('.')[1]));
      var userName = payLoad.firstname as string;
      return userName
    }
    return "";
  }
  public getLastnameFromCookie(): string {
    var token = this.cookieService.get("token");
    if (token != null && token.length != 0) {
      var payLoad = JSON.parse(window.atob(token.split('.')[1]));
      var userName = payLoad.lastname as string;
      return userName
    }
    return "";
    


 
    //const boolean = this.list.some((value) => value === 2);
  
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }

  detail(id:number){
    console.log(id)
    const url = 'DetailsContrat/'+id
    this.router.navigateByUrl(url)
    
  }


 

  
/*
  list!:any

getIfUserHasEndContrat() : Boolean {
  return this.list.includes(authenticatedUserId);
}
*/




  public getIdFromCookie(): string {
    var token = this.cookieService.get("token");
    if (token != null && token.length != 0) {
      var payLoad = JSON.parse(window.atob(token.split('.')[1]));
      var id = payLoad.userid as string;
      return id
    }
    return "";
  }


  public getProfilePictureFromCookie(): string {
    var token = this.cookieService.get("token");
    if (token != null && token.length != 0) {
      var payLoad = JSON.parse(window.atob(token.split('.')[1]));
      const imageName = payLoad.profilepicture as string;
      return `assets/images/${imageName}`;
    }
    return "";
  }
  logout(): void {
    this.cookieService.delete('token');
    this.router.navigateByUrl('/login');
  }

  onLogin(): void{
    this.router.navigateByUrl('/login');
  }
  changepassword(){
    window.location.reload();
    this.router.navigateByUrl('/changepassword')
  }

  onEdit(){
    window.location.reload();
    this.router.navigateByUrl('/profile')
  }

}
