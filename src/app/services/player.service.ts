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
  private _players:IPlayerModel[]= [{guid:'123456',name:'Taffy'},
                                    {guid:'987654',name:'Suzannah'},
                                    {guid:'111111',name:'Player1'},
                                    {guid:'222222',name:'Player2'}];
  private _playersByGuid={          
                          '123456':{guid:'123456',name:'Taffy'},
                          '987654':{guid:'987654',name:'Suzannah'},
                          '111111':{guid:'111111',name:'Player1'},
                          '222222':{guid:'222222',name:'Player2'}
                         };
  private _player:IPlayerModel;

  constructor(private http:HttpClient) {
  }
  getActivePlayer():IPlayerModel{
      return this._player;
  }
  getPlayerByName$(name:string):Observable<IPlayerModel>{
      let player$:Observable<IPlayerModel>;
      if(!this._player){
          this._players.forEach(p=>{
              if(p.name==name){
                  this._player=p;
              }
          });
      }
      if(!this._player || this._player.name != name){
    
          player$= this.http.get<any>(`${common.endpoint}players?name=${name}`).pipe(
              tap((player) => console.log(`data.service.getPlayer(): ${player}`)),
              catchError(common.handleError<any>('getPlayerByName'))
          );
      }else{
          player$=of(this._player);
      }
    return player$;
  }
  setActivePlayer(playerGuid){
      this._player=this._playersByGuid[playerGuid];
  }
  getPlayer$(guid:string):Observable<IPlayerModel>{
      if(this._playersByGuid){
          if(!this._playersByGuid[guid]){
              this.http.get<IPlayerModel>(`${common.endpoint}players/${guid}`).subscribe(p=>{
                  this._playersByGuid[guid]=p;
                  return of(p);
              });
          }else{
              return of(this._playersByGuid[guid]);
          }
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
