 
import {IGameModel, Game} from '../classes/games';
import {IMoveModel, Move} from '../classes/moves';
import {IMoveSubscriber} from '../classes/move.subscriber';
import {PositionsEnum, CardsEnum} from '../classes/enums';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MoveService{
    moves:IMoveModel[][]=[]; //key by game UUID so can hold the moves for multiple games at same time.
    moveSubscribers:IMoveSubscriber[]=[];
    constructor(){
        
    }
    
    subscribe(subscriber:IMoveSubscriber){
        //Potential for a subscriber to be added more than once!
        this.moveSubscribers.push(subscriber); 
    }
    publishMoves(gameUuid:string,ms:IMoveModel[]){
        this.moveSubscribers.forEach(s=>{
            new Promise((resolve,reject)=>{
                s.performMoves(gameUuid,ms);
                resolve(true);
            });
        });
    }
    
    addMove(gameUuid:string,m:IMoveModel){
        this.addMoves(gameUuid,[m]);
    }
    addMoves(gameUuid:string,ms:IMoveModel[]){

        console.log(`MoveService.addMoves:${JSON.stringify(ms)}`);
        let moves:IMoveModel[];
        if(!this.moves[gameUuid]){
            moves=[];
            this.moves[gameUuid]=moves;
        }else{
            moves=this.moves[gameUuid];
        }
        ms.forEach(m=>{
            moves.push(m);
        });
        this.publishMoves(gameUuid,ms);
    }
    saveMoves(gameUuid:string,ms:IMoveModel[]){
        throw new Error("Method not implemented.");
    }
}
          