import {IGameModel, GameFactory, Game} from '../classes/games';
import {ICardModel, Card} from '../classes/cards';
import {PositionsEnum, CardsEnum} from '../classes/enums';
import {DealerService} from './dealer.service';
import {Injectable} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameService{
    _games={};
    
    constructor(private http:HttpClient, private dealerSvc:DealerService){
        console.log(`GameService.constructor`);
    }
    getGame(gameUuid:string):Game{
        if(!this._games[gameUuid]){
            throw new Error();
        }
        return this._games[gameUuid];
    }
    getGame$(gameUuid:string):Observable<Game>{
        let o:Observable<Game>;
        
        if(!this._games[gameUuid]){
            throw Error(`No Game: ${gameUuid}`);
        }
        o= of(this._games[gameUuid]);
        
        return o;
    }
    
    newGame(name:string,player1Uuid:string,player2Uuid:string):Game{
        const deck:number[] = this.dealerSvc.getDeck();
        const game:Game=GameFactory.newLocalGame(name,player1Uuid, player2Uuid,deck);
        this._games[game.uuid]=game;
        return game;
    }
    saveGame(game:IGameModel){}
}