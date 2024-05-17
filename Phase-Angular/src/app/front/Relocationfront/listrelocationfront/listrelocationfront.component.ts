import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { RelocationService } from 'src/app/shared/relocation.service';

@Component({
  selector: 'app-listrelocationfront',
  templateUrl: './listrelocationfront.component.html',
  styleUrls: ['./listrelocationfront.component.css']
})
export class ListrelocationfrontComponent implements OnInit {
  listrelocation: any;
  relocation : any;


  constructor(private relocationservice : RelocationService, private router:Router,private auth:AuthService) { }

  ngOnInit(): void {
    this.getAllRelocation();
  }
  getAllRelocation() {
    this.relocationservice.getAllRelocation().subscribe((res: any) => {
      this.listrelocation = res.filter((relocation: { userRelocation: number,relocationState:string }) => relocation.userRelocation === this.auth.getUserIdFromToken1()&&relocation.relocationState!=="false");
    });
  }
  
  
  openMap(locationdep: string, locationarr: string) {
    var directionsUrl = "https://www.google.com/maps/dir/?api=1&origin=" + locationdep + "&destination=" + locationarr + "&travelmode=driving";
    window.open(directionsUrl, "_blank");
  }

}
