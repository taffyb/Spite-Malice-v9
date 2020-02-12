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

export class Game implements IGameModel,IMoveSubscriber{
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
      
    performMoves(gameUuid: string, moves: IMoveModel[]) {
        if(gameUuid = this.uuid){
            console.log(`game.perfromMoves:${JSON.stringify(moves)}`);
        }
    }
}