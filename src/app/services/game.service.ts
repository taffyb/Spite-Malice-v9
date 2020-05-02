import {IGameModel, GameFactory, Game} from '../classes/games';
import {ICardModel, Card} from 's-n-m-lib';
import {PositionsEnum, CardsEnum} from 's-n-m-lib';
import {DealerService} from './dealer.service';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient} from "@angular/common/http";
import * as common from './service.common';

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
        return new Observable<Game>(subscriber => {
            if(!this._games[gameUuid]){   
                const url = `${common.endpoint}games/${gameUuid}`;
                this.http.get<IGameModel>(url).subscribe({
                    next(g:IGameModel) { 
                        const game:Game= Game.fromModel(g); 
                        subscriber.next(game);
                        subscriber.complete();
                    },
                    error(err) { console.error('Error calling ${url}: ${JSON.stringify(err)}'); }
                  });
            }else{
                console.log(`getGame$ get from cache`);
                subscriber.next(this._games[gameUuid]);
                subscriber.complete();
            }           
        });
    }
    getGames():Observable<IGameModel[]>{
        const url = `${common.endpoint}games`;
        return this.http.get<IGameModel[]>(url);
    }
    newGame(name:string,player1Uuid:string,player2Uuid:string):Game{
        const deck:number[] = this.dealerSvc.getDeck();
        const g:IGameModel=GameFactory.newGame(name,player1Uuid, player2Uuid,deck);
//        console.log(`newGame<IGameModel>.activePlayer= ${g.activePlayer}`);
        const game:Game=Game.fromModel(g);
//        console.log(`game<Game>.activePlayer= ${game.activePlayer}`);
        
        this._games[game.uuid]=game;
        this.saveGame(game);
        return game;
    }
    saveGame(game:IGameModel){
        
        this.http.post<IGameModel>(`${common.endpoint}games`,game).subscribe(
                (val) => {
                    console.log(`saveGame Success`);
                },
                response => {
                    console.error("Error Saving Game", response);
                });
    }
}