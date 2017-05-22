import {Injectable} from '@angular/core';
import {Http,Request, Response, Headers, RequestOptions}  from '@angular/http';

import 'rxjs/Rx';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/share';



export function hashCode(str) {
  let hash = 0;
  if (str.length === 0) {
    return hash;
  }
  for (let i = 0; i < str.length; i++) {
    let char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
}


@Injectable()
export class ModelService {

    constructor(private http: Http){
    }

    private headers:any;

    setHeaders(){
      this.headers = new Headers({
        'Content-Type': 'application/json',
        "Accept":"application/json",
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Methods' : 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Access-Token,DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type',
        'Access-Control-Expose-Headers':'Access-Token,Authorization',
      })
    }

    //Get Request
    get(url:string,modifyHeaders:boolean,auth:any=null){
        let headers:any;
        let options:any;
        this.setHeaders();
        if(modifyHeaders){
          headers = new Headers({'Content-Type': 'application/json', "Authorization":auth});
          options = new RequestOptions({headers});
        }else {
          options = new RequestOptions({headers:this.headers});
        }
        return this.http.get(url,options)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }

    //Post Request
    post(url:string, data:any, modifyHeaders:boolean,auth:string){
        this.setHeaders();
        let options:any;
        let headers:any;

          if(modifyHeaders){
            headers = new Headers({'Content-Type': 'application/json', 'Authorization':auth});
            options = new RequestOptions({headers});
          }else {
            options = new RequestOptions({headers:this.headers});
          }

        return this.http.post(url,data,options)
            .map((response: Response) => {
              try{
                console.log('response : ',response);
                return [JSON.stringify(response.headers),response.json()];
              }
              catch(error) {
                if(response.status == 200)
                  return response;
                else {
                  throw(error);
                }
              }
            })
            .catch(this.handleError);
    }

    //Error Handling
    private handleError (error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        let errStatus = error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        return Observable.throw(error);
    }
}

@Injectable()
export class HttpClientService {

  constructor(private http: Http, public _api: ModelService) {

  }

  get(url:string, auth:any, modifyHeaders:boolean=false) {
    return this._api.get(url,modifyHeaders,auth)
      .do(json => {
      })
      .share();
  }

  post(url:string, data:any, modifyHeaders:boolean=false,auth:string=null){
    return this._api.post(url, data,modifyHeaders,auth)
      .do(json=>{
      })
      .share();
  }

}
