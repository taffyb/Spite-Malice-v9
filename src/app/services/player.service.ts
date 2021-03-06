import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable, of} from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import * as common from './service.common';
import {WsService} from './ws.service';
import {IPlayerModel,Opponent} from 's-n-m-lib';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private _players:IPlayerModel[]= [{uuid:'123456',name:'Taffy'},
                                    {uuid:'987654',name:'Suzannah'},
                                    {uuid:'111111',name:'Player1'},
                                    {uuid:'222222',name:'Player2'}];
  private _playersByGuid={          
                          '123456':{uuid:'123456',name:'Taffy'},
                          '987654':{uuid:'987654',name:'Suzannah'},
                          '111111':{uuid:'111111',name:'Player1'},
                          '222222':{uuid:'222222',name:'Player2'}
                         };
  private _activePlayer:IPlayerModel;
  private _opponents:Opponent[];
  private _opponents$:Observable<Opponent[]>;
  private _opponentObserver:any;

  constructor(private http:HttpClient,
              private wsSvc:WsService) {
    console.log(`PlayerService.constructor`);
    wsSvc.onPlayerActive$().subscribe({
        next:(p:IPlayerModel)=>{
            console.log(`${p.name} is now active`);
            this.updateOpponentStatus(p);
        },
        error:(err)=>{
            console.log(`onPlayerActive error: ${JSON.stringify(err)}`);
        }
    });
    wsSvc.onDisconnect$().subscribe({
        next:(opponent:IPlayerModel)=>{
            console.log(`${opponent.name} is now offline`);
            this.updateOpponentStatus(opponent);
        },
        error:(err)=>{
            console.log(`onDisconnect$ error: ${JSON.stringify(err)}`);
        }
    });
  }
  getActivePlayer():IPlayerModel{
      return this._activePlayer;
  }
  getOpponents$(uuid):Observable<Opponent[]>{
      return new Observable<Opponent[]>((observer)=>{
          this.http.get<Opponent[]>(`${common.endpoint}players/${uuid}/opponents`).pipe(
              tap((opponents)=>{
                  this._opponents=opponents;
                  this._opponentObserver=observer;
                  this._opponentObserver.next(this._opponents);
              }
          )).subscribe();                  
       });
  }
  updateOpponentStatus(opponent:IPlayerModel){
      this._opponents.forEach((opp)=>{
          if(opp.uuid===opponent.uuid){
              opp.online=(!opp.online);
          }
          console.log(`opponent[${opp.uuid}] is online=${opp.online}`);
      });
      this._opponentObserver.next(this._opponents);
  }
  getPlayerByName$(name:string):Observable<IPlayerModel>{
      let player$:Observable<IPlayerModel>;
      if(!this._activePlayer){
          this._players.forEach(p=>{
              if(p.name==name){
                  this._activePlayer=p;
              }
          });
      }
      if(!this._activePlayer || this._activePlayer.name != name){
    
          player$= this.http.get<any>(`${common.endpoint}players?name=${name}`).pipe(
              tap((player) => console.log(`data.service.getPlayer(): ${player}`)),
              catchError(common.handleError<any>('getPlayerByName'))
          );
      }else{
          player$=of(this._activePlayer);
      }
    return player$;
  }
  setActivePlayer(playerGuid){
      console.log(`setActivePlayer(${playerGuid})`);
      this._activePlayer=this._playersByGuid[playerGuid];
  }
  getPlayer$(uuid:string):Observable<IPlayerModel>{
      if(this._playersByGuid){
          if(!this._playersByGuid[uuid]){
              this.http.get<IPlayerModel>(`${common.endpoint}players/${uuid}`).subscribe(p=>{
                  this._playersByGuid[uuid]=p;
                  return of(p);
              });
          }else{
              return of(this._playersByGuid[uuid]);
          }
      }
  }
  getPlayers$(uuids:string[]=[]):Observable<IPlayerModel[]>{  
      let players=[];
      if(uuids.length !=2){
          throw new Error(`wrong number of players (${uuids.length})`);
      }
      uuids.forEach(async (guid)=>{
          let p = await this.getPlayer$(guid).toPromise();
          players.push(p);
      });
      return of(players);
  }
  getAllPlayers$():Observable<IPlayerModel[]>{ 
      const players$:Observable<IPlayerModel[]>=of(this._players);
      this._players.forEach((p)=>{
          this._playersByGuid[p.uuid]=p;
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
