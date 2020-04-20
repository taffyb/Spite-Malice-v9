import {IGameModel, GameFactory, Game} from '../classes/games';
import {ICardModel, Card} from '../classes/cards';
import {PositionsEnum, CardsEnum} from '../classes/enums';
import {DealerService} from './dealer.service';
import {Injectable} from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class GameService{

    constructor(private http:HttpClient, private dealerSvc:DealerService){}
    
    getGame(gameUuid:string):Game{return null;}
    
    newGame(name:string,player1Uuid:string,player2Uuid:string):Game{
        const game:Game=GameFactory.newGame(name,player1Uuid, player2Uuid);
        const cardNos:number[] = this.dealerSvc.getDeck();
        let c:number;
        let card:ICardModel;
        //DEAL PILE
        for(let i:number=0;i<13;i++){
            //player 1
            c=cardNos.pop();
            card= new Card(c,PositionsEnum.PLAYER_PILE);
            game.addCard(card.cardNo,card.position);
            //player 2
            c=cardNos.pop();
            card= new Card(c,PositionsEnum.PLAYER_PILE+10);
            game.addCard(card.cardNo,card.position);
        }
        //START STACKS
        for(let i:number=0;i<4;i++){
            //player 1
            c=cardNos.pop();
            card= new Card(c,PositionsEnum.PLAYER_STACK_1+i);
            game.addCard(card.cardNo,card.position);
            //player 2
            c=cardNos.pop();
            card= new Card(c,(PositionsEnum.PLAYER_STACK_1+i)+10);
            game.addCard(card.cardNo,card.position);
        }
        //DEAL HAND
        for(let i:number=0;i<5;i++){
            //player 1
            c=cardNos.pop();
            card= new Card(c,PositionsEnum.PLAYER_HAND_1+i);
            game.addCard(card.cardNo,card.position);
            //player 2
            c=cardNos.pop();
            card= new Card(c,(PositionsEnum.PLAYER_HAND_1+i)+10);
            game.addCard(card.cardNo,card.position);
        }
        for(let i:number=0;i<cardNos.length;i++){
            card= new Card(cardNos[i],PositionsEnum.DECK);
            game.addCard(card.cardNo,card.position);
        }
        return game;
    }
    saveGame(game:IGameModel){}
}