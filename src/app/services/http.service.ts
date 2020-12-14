import { ConfigService } from 'src/app/services/config.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ObjectUnsubscribedError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http:HttpClient, private _config:ConfigService) { }

  request(request) : Observable<any>{
    return this._http.post(this._config.baseUri, request);
  }
  upload(data){
    
  }
}

