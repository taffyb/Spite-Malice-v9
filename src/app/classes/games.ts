import {Card} from './cards';
import {IMoveModel} from './moves';
import {PositionsEnum, CardsEnum} from './enums';
import {IMoveSubscriber} from './move.subscriber';
import {DealerService} from '../services/dealer.service';


export interface IGameModel {
    uuid: string;
    name: string;
    player1Uuid: string;
    player2Uuid: string;
}

export class Game implements IGameModel{
    uuid: string;
    name: string;
    player1Uuid: string;
    player2Uuid: string;
    activePlayer:number=0;

    cards:Card[];
    cardPositions:Card[][];
    gameOver:string;
    isDraw:boolean;

    // convienience 
    deck:Card[];
    recyclePile:Card[];
    
    constructor(name:string, player1Uuid: string, player2Uuid: string){
        this.name=name;
        this.player1Uuid=player1Uuid;
        this.player1Uuid=player1Uuid;
        this.cards=[];
        this.cardPositions=[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
        
        this.deck=this.cardPositions[PositionsEnum.DECK];
        this.recyclePile=this.cardPositions[PositionsEnum.DECK];
    }  

//    moveToRecyclePile(stack:number,game:Game){
//      const cards:Card[]=this.cardPositions[stack];
//      for(let c=0;c<cards.length-1;c++){
//          game.recyclePile.push(cards[c]);
//      }
//    }
      
    performMove(move: IMoveModel) {
        console.log(`game.perfromMove:${JSON.stringify(move)}`);
        this.addCard(move.card,move.to);
        this.removeCard(move.from);
    }
    
    private addCard(card:number,position:number){
        this.cardPositions[position].push(new Card(card,position));
    }
    private removeCard(position:number){
        this.cardPositions[position].pop();
    }
}