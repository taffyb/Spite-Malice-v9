import {IGameModel, Game} from '../classes/games';
import {ICardModel, Card} from '../classes/cards';
import {PositionsEnum, CardsEnum} from '../classes/enums';
import {DealerService} from './dealer.service';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GameService{
    
    constructor(private dealerSvc:DealerService){}
    
    getGame(gameUuid:string):Game{return null;}
    
    newGame(name:string,player1Uuid:string,player2Uuid:string):Game{
        const game:Game=new Game(name,player1Uuid, player2Uuid);
        const cardNos:number[] = this.dealerSvc.getCardNos();
        let c:number;
        let card:ICardModel;
        //DEAL PILE
        for(let i:number=0;i<13;i++){
            //player 1
            c=cardNos.pop();
            card= new Card(c,PositionsEnum.PLAYER_PILE);
            game.cards.push(card);
            game.getCardPositions()[PositionsEnum.PLAYER_PILE].push(card);
            //player 2
            c=cardNos.pop();
            card= new Card(c,PositionsEnum.PLAYER_PILE+10);
            game.cards.push(card);
            game.getCardPositions()[PositionsEnum.PLAYER_PILE+10].push(card);
        }
        //START STACKS
        for(let i:number=0;i<4;i++){
            //player 1
            c=cardNos.pop();
            card= new Card(c,PositionsEnum.PLAYER_STACK_1+i);
            game.cards.push(card);
            game.getCardPositions()[PositionsEnum.PLAYER_STACK_1+i].push(card);
            //player 2
            c=cardNos.pop();
            card= new Card(c,(PositionsEnum.PLAYER_STACK_1+i)+10);
            game.cards.push(card);
            game.getCardPositions()[(PositionsEnum.PLAYER_STACK_1+i)+10].push(card);
        }
        //DEAL HAND
        for(let i:number=0;i<5;i++){
            //player 1
            c=cardNos.pop();
            card= new Card(c,PositionsEnum.PLAYER_HAND_1+i);
//            console.log(`player 1 hand[${PositionsEnum.PLAYER_HAND_1+i}]=${c} ${JSON.stringify(card)}`);
            game.cards.push(card);
            game.getCardPositions()[PositionsEnum.PLAYER_HAND_1+i].push(card);
            //player 2
            c=cardNos.pop();
            card= new Card(c,(PositionsEnum.PLAYER_HAND_1+i)+10);
//            console.log(`player 2 hand[${(PositionsEnum.PLAYER_HAND_1+i)+10}]=${c} ${JSON.stringify(card)}`);
            game.cards.push(card);
            game.getCardPositions()[(PositionsEnum.PLAYER_HAND_1+i)+10].push(card);
        }
        for(let i:number=0;i<cardNos.length;i++){
            card= new Card(cardNos[i],PositionsEnum.DECK);
            game.cards.push(card);
            game.getCardPositions()[PositionsEnum.DECK].push(card);
        }
        return game;
    }
    saveGame(){}
}