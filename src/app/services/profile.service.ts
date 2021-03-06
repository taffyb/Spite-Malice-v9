import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable, of} from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import * as common from './service.common';
import {IProfileModel,DEFAULT_PROFILE} from 's-n-m-lib';
import {Location, TimeZone} from '../classes/timezones'




@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private _profile:IProfileModel;

  constructor(private http:HttpClient) { }
  
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
  
  getLocations$():Observable<Location[]>{
      const url = `http://worldtimeapi.org/api/timezone`;
      console.log(`getLocations$: ${url}`);
      return this.http.get<string[]>(url).pipe(
         map((locations)=>{
             console.log(`Locations: ${JSON.stringify(locations)}`);
              const locs:Location[]=[];
              locations.forEach(l=>{
                  locs.push(new Location(l));
              });          
              return locs;
          })
      );
  }
  getTimeZone$(loc:Location):Observable<TimeZone>{
      const url = `http://worldtimeapi.org/api/timezone/${loc.area()}/${loc.location()}/${loc.region()}`;
      console.log(`getTimeZones$: ${url}`);
      return this.http.get<TimeZone>(url).pipe(
          tap((tz)=>{
             console.log(`getTimeZone$:${JSON.stringify(tz)}`);     
          })
      );
  }
}
