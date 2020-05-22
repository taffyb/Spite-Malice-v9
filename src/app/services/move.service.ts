import {Observable, of} from 'rxjs';
import { map } from 'rxjs/operators';
import {IGameModel, Game} from '../classes/games';
import {IMoveModel, Move} from 's-n-m-lib';
import {IMoveSubscriber} from '../classes/move.subscriber';
import {PositionsEnum, CardsEnum, MoveTypesEnum} from 's-n-m-lib';
import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import * as common from './service.common';
import {WsService} from './ws.service';

@Injectable({
  providedIn: 'root',
})
export class MoveService{
   private _moves:IMoveModel[][]=[]; //key by game UUID so can hold the moves for multiple games at same time.
   private _moveSubscribers:IMoveSubscriber[]=[];

    constructor(private http:HttpClient,
            private wsSvc:WsService){
        console.log(`MoveService.constructor`);
    }

    subscribe(subscriber:IMoveSubscriber){
        //Potential for a subscriber to be added more than once!
        this._moveSubscribers.push(subscriber); 
    }
    publishMoves(gameUuid:string,ms:IMoveModel[]){
        this._moveSubscribers.forEach(s=>{
            new Promise((resolve,reject)=>{
                s.performMoves(gameUuid,ms);
                resolve(true);
            });
        });
    }
    
    addMove(gameUuid:string,playerUuid:string,m:IMoveModel){
        let moves:IMoveModel[]=[];
        moves.push(m);
        this.addMoves(gameUuid,playerUuid,moves);
    }
    addMoves(gameUuid:string,playerUuid:string,ms:IMoveModel[]){

        let moves:IMoveModel[];
        if(!this._moves[gameUuid]){
            moves=[];
            this._moves[gameUuid]=moves;
        }else{
            moves=this._moves[gameUuid];
        }
        ms.forEach(m=>{
            m.gameUuid=gameUuid;
            if(playerUuid){m.playerUuid=playerUuid;}
            m.id = this._moves[gameUuid].length+1;
            moves.push(m);
        });
        if(moves.length>0){
            this.publishMoves(gameUuid,ms);
            this.saveMoves(gameUuid,ms);
        }
    }
    saveMoves(gameUuid:string,ms:IMoveModel[]){
        ms.forEach((move)=>{   
            this.http.post<IMoveModel>(`${common.endpoint}games/${gameUuid}/moves`,move).subscribe(
                (val) => {
                    console.log(`POST call successful value returned in body ${JSON.stringify(val)}`);
                },
                response => {
                    if(response.status != 200){
                        console.error(`Error posting move:${JSON.stringify(move)}
                        ${JSON.stringify(response)}`);
                    }
                });
         });
    }
    moveToRecycle(game:Game,position:number){
        const moves:IMoveModel[]=[];
        for(let i=game.getCards(position).length-1;i>=0;i--){
            let c=game.getCards(position)[i];
            let m = new Move();
            m.card=c.cardNo;
            m.from=position;
            m.to=PositionsEnum.RECYCLE;
            m.type=MoveTypesEnum.RECYCLE;
            moves.push(m);
        }
        this.addMoves(game.uuid,"",moves);
    }
    getMoves$(gameUuid:IGameModel,playerUuid?:string,limit?:number):Observable<IMoveModel[]>{
        const url = `${common.endpoint}games/${gameUuid}/moves?${playerUuid?'playerUuid='+playerUuid:''}&${limit?'limit='+limit:''}`;
        return this.http.get<IMoveModel[]>(url).pipe(
            map((data)=>{
                const moves:IMoveModel[]=[];
                data.forEach((m)=>{
//                    console.log(`getMoves$ move:${JSON.stringify(m)}`);
                    const move:IMoveModel=Move.fromModel(m);
                    moves.push(move);
                });
                return moves;
            })
        );
    }
}
          