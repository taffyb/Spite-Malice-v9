import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable, of} from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import * as common from './service.common';
import {IProfileModel,DEFAULT_PROFILE} from 's-n-m-lib';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private _profile:IProfileModel;

  constructor() { }
  
  getActiveProfile():IProfileModel{
      return this._profile;
  }
  getProfile$(playerGuid:string):Observable<IProfileModel>{
    let o:Observable<IProfileModel>;
    if(!this._profile){
        this._profile = DEFAULT_PROFILE;
    }
    o= of(this._profile);
    return o;
  }
  saveProfile(playerGuid:string,profile:IProfileModel){
      this._profile.showStatistics=profile.showStatistics;
  }
  getDefaultProfile$():Observable<IProfileModel>{
      this._profile=DEFAULT_PROFILE;
      return of(this._profile);
  }
}
