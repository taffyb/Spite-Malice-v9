import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable, of} from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import * as common from './service.common';
import {IProfileModel,defaultProfile} from '../classes/profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor() { }
  
  getProfile$(playerGuid:string):Observable<IProfileModel>{
    const o:Observable<IProfileModel> = of(new defaultProfile());
    return o;
  }
}
