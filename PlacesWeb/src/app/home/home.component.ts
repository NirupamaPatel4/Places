import {Component, OnInit} from '@angular/core';
import { Address } from '../models/address';
import { HttpClientService } from "../services/http-client.service";
import {CookieHandler} from '../services/cookie-handler.service';

@Component({
  selector: 'home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  private locations: Array<Object> = [];
  private updatedLocation: any;
  public errorMessage: string;
  public showSearchedlocations: boolean = false;
  private userId: string;
  private auth : string;
  private url : string;

  constructor(private httpClient: HttpClientService, private cookieHandler: CookieHandler) {
    this.userId = this.cookieHandler.getCookie('userId');
    this.auth = this.cookieHandler.getCookie('Authorization')
  }

  ngOnInit() {
    if(!this.userId || !this.auth)
      window.location.href = '/';
    this.url = `http://localhost:9000/users/${this.userId}/locations`;
    this.fetchSearches();
  }

  updateLocationValue(updatedLoc: any) {
    this.updatedLocation = updatedLoc;
    console.log('updatedLocation :', this.updatedLocation);
  }

  addSearch(place:any) {
    if (this.updatedLocation == null || this.updatedLocation == undefined) {
      this.errorMessage = 'Please select a valid location';
    }
    else {
      let address = new Address(this.updatedLocation);
      let body = {
        address : address
      }
      console.log('address : ', address);
      this.httpClient.post(this.url,body,true,this.auth)
        .subscribe((response) => {
            this.fetchSearches();
        }, (error) => {
          this.errorMessage = 'search failed!! Please try again.';
        }, () => console.log());
    }

  }

  fetchSearches () {
    this.httpClient.get(this.url,this.auth,true)
      .subscribe((response) => {
        this.locations = response.addresses;
        if(this.locations.length > 0)
          this.showSearchedlocations = true;
      }, (error) => {
        this.errorMessage = 'search failed!! Please try again.';
      }, () => console.log());
  }

  logout(){
    this.cookieHandler.removeAllCookies();
    window.location.href = '/';
  }
}
