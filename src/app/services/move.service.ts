import {Observable} from 'rxjs';
import {IGameModel, Game} from '../classes/games';
import {IMoveModel, Move} from '../classes/moves';
import {IMoveSubscriber} from '../classes/move.subscriber';
import {PositionsEnum, CardsEnum, MoveTypesEnum} from '../classes/enums';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MoveService{
   private _moves:IMoveModel[][]=[]; //key by game UUID so can hold the moves for multiple games at same time.
   private _moveSubscribers:IMoveSubscriber[]=[];
//    moveEmitter;
    constructor(){
        
    }
//    moves$():Observable<IMoveModel[]>{
//        const o = Observable.create(e => this.moveEmitter = e);
//        return o;
//    }
    subscribe(subscriber:IMoveSubscriber){
        //Potential for a subscriber to be added more than once!
        this._moveSubscribers.push(subscriber); 
    }
    publishMoves(gameUuid:string,ms:IMoveModel[]){
        this._moveSubscribers.forEach(s=>{
//            this.moveEmitter.next(ms);
//            console.log(`Publishing [${ms.length}] to Subscriber[${s.constructor.name}] for Game [${gameUuid}]`);
            new Promise((resolve,reject)=>{
                s.performMoves(gameUuid,ms);
                resolve(true);
            });
        });
    }
    
    addMove(gameUuid:string,m:IMoveModel){
        let moves:IMoveModel[]=[];
        moves.push(m);
        this.addMoves(gameUuid,moves);
    }
    addMoves(gameUuid:string,ms:IMoveModel[]){

        let moves:IMoveModel[];
        if(!this._moves[gameUuid]){
            moves=[];
            this._moves[gameUuid]=moves;
        }else{
            moves=this._moves[gameUuid];
        }
        ms.forEach(m=>{
            moves.push(m);
        });
        if(moves.length>0){
            this.publishMoves(gameUuid,ms);
        }
    }
    saveMoves(gameUuid:string,ms:IMoveModel[]){
        throw new Error("Method not implemented.");
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
        this.addMoves(game.uuid,moves);
    }
}
          