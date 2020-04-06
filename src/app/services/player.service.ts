import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable, of} from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import * as common from './service.common';
import {IPlayerModel} from '../classes/players';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private _http:HttpClient;

  private _players:IPlayerModel[]= [{guid:'123456',name:'Taffy'},
                                    {guid:'98765',name:'Suzannah'},
                                    {guid:'111111',name:'Player'}];
  private _playersByGuid={          
                          '123456':{guid:'123456',name:'Taffy'},
                          '98765':{guid:'98765',name:'Suzannah'}
                         };

  constructor(http:HttpClient) {
      this._http=http;
  }
  
  getPlayer$(guid:string):Observable<IPlayerModel>{
      if(this._playersByGuid){
          return new Observable<IPlayerModel>((observer) => {
              if(!this._playersByGuid[guid]){
                  this._http.get<IPlayerModel>(`${common.endpoint}players/${guid}`).subscribe(p=>{
                      this._playersByGuid[guid]=p;
                      observer.next(this._playersByGuid[guid]);
                      observer.complete();
                  });
              }else{
                  observer.next(this._playersByGuid[guid]);
                  observer.complete();
              }
            }); 
          
      }else{
          return null;
      }
  }
  getPlayers$(guids:string[]=[]):Observable<IPlayerModel[]>{  
      let players=[];
      if(guids.length !=2){
          throw new Error(`wrong number of players (${guids.length})`);
      }
      guids.forEach(async (guid)=>{
          let p = await this.getPlayer$(guid).toPromise();
          players.push(p);
      });
      return of(players);
  }
  getAllPlayers$():Observable<IPlayerModel[]>{     
//      const players$:Observable<IPlayerModel[]>= this._http.get<any>(`${common.endpoint}players`).pipe(
//          tap((players) => console.log(`data.service.getPlayer(): ${players}`)),
//          catchError(common.handleError<any>('getPlayers'))
//       );
      const players$:Observable<IPlayerModel[]>=of(this._players);
      this._players.forEach((p)=>{
          this._playersByGuid[p.guid]=p;
      });
      return players$;
  }
//  async addPlayer(player:IPlayerModel):boolean{
//      if(player.guid && player.guid.length >0){
//          return this.updatePlayer(player);
//      }
//      await this._http.post<any>(`${common.endpoint}/players`,player).toPromise;
//      return true;
//  }
//  updatePlayer(player:IPlayerModel):boolean{
//      return true;
//  }
//  removePlayer(player:IPlayerModel){
//      
//  }
}
