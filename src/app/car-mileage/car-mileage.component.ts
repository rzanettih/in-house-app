import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-car-mileage',
  templateUrl: './car-mileage.component.html',
  styleUrls: ['./car-mileage.component.css']
})
export class CarMileageComponent implements OnInit {

  private _cookieTab: string;
  get cookieTab() : string {
    if(!this._cookieTab) 
      this.cookieTab = (!this.cookieService.get('cookieTab') || this.cookieService.get('cookieTab') == "") ? "0" : this.cookieService.get('cookieTab');

    return this._cookieTab;
  }
  set cookieTab(cookieTab: string) {
    this.cookieService.set('cookieTab', cookieTab);
    this._cookieTab = cookieTab;
  }

  constructor(private cookieService: CookieService) { }

  ngOnInit() {
    
    
  }

  

}
