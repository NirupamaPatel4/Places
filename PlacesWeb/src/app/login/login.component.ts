import {Component} from '@angular/core';
import {User} from '../models/user';
import { HttpClientService } from "../services/http-client.service";
import {CookieHandler} from '../services/cookie-handler.service';


@Component({
  selector: 'login',
  styleUrls: ['./login.component.css'],
  templateUrl: './login.component.html'
})
export class LoginComponent {

  constructor(private httpClient: HttpClientService, private cookieHandler: CookieHandler) { }

  public errorMessage: string;
  public showRegister: boolean = true;
  public showLogin: boolean = false;
  public user = new User('','','');


  toggle(){
    this.showRegister = !this.showRegister;
    this.showLogin = !this.showLogin;
    this.errorMessage = '';
  }

  emailValidation (email: string) {
    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let valid = emailRegex.test(email);
    if(valid){
      return true;
    }
    return false;
  }

  login() {
    var isValidEmail;
    if(this.user.emailId == '')
      this.errorMessage = 'please enter  a valid email address';
    if(this.user.emailId !== '')
    {
      isValidEmail = this.emailValidation(this.user.emailId);
      if(!isValidEmail)
        this.errorMessage = 'please enter a valid email address';
    }
    if(this.user.password == '')
      this.errorMessage = 'password should not be empty';
    if(this.user.emailId == '' && this.user.password == '')
      this.errorMessage = 'please fill email and password';

    else if(isValidEmail){
      let url = 'http://localhost:9000/users';
      this.httpClient.post(url, this.user)
        .subscribe((response) => {

          let auth = JSON.parse(response[0]);
          this.cookieHandler.setCookie('Authorization',auth["Access-Token"][0]);
          this.cookieHandler.setCookie('userId',response[1].userId);

          window.location.href = '/home';
        }, (error) => {
          this.errorMessage = 'register/login failed!! Please try again.';
        }, () => console.log());
    }
  }


}
