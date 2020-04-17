import {Card} from './cards';
import {IMoveModel} from './moves';
import {PositionsEnum, CardsEnum,MoveTypesEnum} from './enums';

import {PlayerPositionsEnum} from './enums';

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
    stats:{players:[{turns:number,moves:number}]}={players:[{turns:0,moves:0},{turns:0,moves:0}]};

    cards:Card[];
    private cardPositions:Card[][];
    gameOver:string;
    isDraw:boolean;

    // convienience 
    deck:Card[];
    recyclePile:Card[];
    
    constructor(name:string, player1Uuid: string, player2Uuid: string){
        this.name=name;
        this.uuid="1234567";
        this.player1Uuid=player1Uuid;
        this.player2Uuid=player2Uuid;
        this.cards=[];
        this.cardPositions=[[],/*PLAYER_1_PILE*/
                            [],[],[],[],[],/*PLAYER_1_HAND*/
                            [],[],[],[],/*PLAYER_1_STACK*/
                            [],/*PLAYER_2_PILE*/
                            [],[],[],[],[],/*PLAYER_2_HAND*/
                            [],[],[],[],/*PLAYER_2_STACK*/
                            [],[],[],[],/*STACK*/
                            [],/*DECK*/
                            []];/*RECYCLE*/
        
        this.deck=this.cardPositions[PositionsEnum.DECK];
        this.recyclePile=this.cardPositions[PositionsEnum.RECYCLE];
    }  

    public getCardPositions():Card[][]{
            return this.cardPositions;
    }
      
    performMove(move: IMoveModel) {
        if(move.type==MoveTypesEnum.PLAYER){
            let stats=this.stats.players[this.activePlayer];
            stats.moves+=1;
//        console.log(`Player Moves: ${stats.moves}`); 
        }
        console.log(`game.perfromMove[${MoveTypesEnum[move.type]}]:${JSON.stringify(move)}`);
        this.addCard(move.card,move.to);
        if(move.type!=MoveTypesEnum.DEALER){
            this.removeCard(move.from);
        }
    }
    
    private addCard(card:number,position:number){
//        console.log(`game.addCard:${position}`);
        this.cardPositions[position].push(new Card(card,position));
    }
    private removeCard(position:number){
//        console.log(`game.removeCard:${position}`);
        this.cardPositions[position].pop();
    }
    cardsInHand():number{
        let cardCount:number=0;
        const HAND_1 = PositionsEnum.PLAYER_HAND_1+(this.activePlayer*PlayerPositionsEnum.PLAYER_2);
        const STACK_1 = PositionsEnum.PLAYER_STACK_1+(this.activePlayer*PlayerPositionsEnum.PLAYER_2);
//        console.log(`fillHand\nPlayer: ${player.name} Hand B4: ${JSON.stringify(player.cards)}`);
        for(let i=HAND_1;i<STACK_1;i++){
            if(this.cardPositions[i].length>0){
            cardCount+=1;
            }
        }
        return cardCount;
    }
    hasCardsOnPile():boolean{
        let cardCount:number=0;
        const PILE = PositionsEnum.PLAYER_PILE+(this.activePlayer*PlayerPositionsEnum.PLAYER_2);

        return this.cardPositions[PILE].length>0;
    }
    switchPlayer(){
        console.log(`game.switchPlayer()`);
        let stats=this.stats.players[this.activePlayer];
        stats.turns+=1;
        this.activePlayer=(this.activePlayer==0?1:0);
    }
}