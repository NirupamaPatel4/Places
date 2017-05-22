import {Injectable} from '@angular/core';
import {CookieService} from 'angular2-cookie/core';


@Injectable()
export class CookieHandler {

  constructor(private cookieService: CookieService){
  }

  getCookie(key: string){
    return this.cookieService.get(key);
  }

  setCookie(key: string, value:string){
    return this.cookieService.put(key, value);
  }

  removeCookie(key: string){
    return this.cookieService.remove(key);
  }

  removeAllCookies(){
    return this.cookieService.removeAll();
  }
}
