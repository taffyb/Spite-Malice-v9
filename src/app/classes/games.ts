import {ICardModel, Card} from './cards';
import {IMoveModel} from './moves';
import {PositionsEnum, CardsEnum,MoveTypesEnum, GameStatesEnum, PlayerPositionsEnum} from './enums';
import { v4 as uuid } from 'uuid';

class PlayerStats{
    turns:number;
    moves:number;
}
export interface IGameModel {
    uuid: string;
    name: string;
    player1Uuid: string;
    player2Uuid: string;
    activePlayer:number;
    state:GameStatesEnum;
    cards:ICardModel[][];
}
export class Game implements IGameModel{
    uuid: string;
    name: string="";
    player1Uuid: string="";
    player2Uuid: string="";
    activePlayer:number=0;
    stats:{players:PlayerStats[]}={players:[{turns:0,moves:0},{turns:0,moves:0}]};
    state:GameStatesEnum=GameStatesEnum.PLAYING

    cards:ICardModel[][]=[[],             /*PLAYER_1_PILE*/
                          [],[],[],[],[], /*PLAYER_1_HAND*/
                          [],[],[],[],    /*PLAYER_1_STACK*/
                          [],             /*PLAYER_2_PILE*/
                          [],[],[],[],[], /*PLAYER_2_HAND*/
                          [],[],[],[],    /*PLAYER_2_STACK*/
                          [],[],[],[],    /*STACK*/
                          [],             /*DECK*/
                          []];            /*RECYCLE*/
    gameOver:string;
    isDraw:boolean;

    // convienience 
    deck:ICardModel[]=this.cards[PositionsEnum.DECK];
    recyclePile:ICardModel[]=this.cards[PositionsEnum.RECYCLE];
    
    constructor(){}

    getCards(position:PositionsEnum):ICardModel[]{
        const cards=this.cards[position];
        
        return cards;
    }
    performMove(move: IMoveModel) {
        if(move.type==MoveTypesEnum.PLAYER){
            let stats=this.stats.players[this.activePlayer];
            stats.moves+=1;
        }
        console.log(`game.perfromMove[${MoveTypesEnum[move.type]}]:${JSON.stringify(move)}`);
        this.addCard(move.card,move.to);
        if(move.type!=MoveTypesEnum.DEALER){
            this.removeCard(move.from);
        }
        if(this.deck.length==0){
            this.state= GameStatesEnum.DRAW;
        }
    }
    triggerStateChange(){
        
    }
    
    addCard(card:number,position:number){
        this.cards[position].push(new Card(card,position));
    }
    private removeCard(position:number){
        this.cards[position].pop();
    }
    cardsInHand():number{
        let cardCount:number=0;
        const HAND_1 = PositionsEnum.PLAYER_HAND_1+(this.activePlayer*PlayerPositionsEnum.PLAYER_2);
        const STACK_1 = PositionsEnum.PLAYER_STACK_1+(this.activePlayer*PlayerPositionsEnum.PLAYER_2);
        for(let i=HAND_1;i<STACK_1;i++){
            if(this.cards[i].length>0){
            cardCount+=1;
            }
        }
        return cardCount;
    }
    hasCardsOnPile():boolean{
        let cardCount:number=0;
        const PILE = PositionsEnum.PLAYER_PILE+(this.activePlayer*PlayerPositionsEnum.PLAYER_2);

        return this.cards[PILE].length>0;
    }
    switchPlayer(){
        console.log(`game.switchPlayer()`);
        let stats=this.stats.players[this.activePlayer];
        stats.turns+=1;
        this.activePlayer=(this.activePlayer==0?1:0);
    }
}

export class GameFactory{
    static newGame(name:string, player1Uuid: string, player2Uuid: string):Game{
        const game:Game = new Game();
        game.uuid= uuid();
        game.name=name;
        game.player1Uuid=player1Uuid;
        game.player2Uuid=player2Uuid;
    
        return game;
    }
    static gameInterface(g:IGameModel):Game{
        const game:Game = new Game();
        game.uuid = g.uuid;
        game.name=g.name;
        game.player1Uuid=g.player1Uuid;
        game.player2Uuid=g.player2Uuid;
        game.activePlayer=g.activePlayer;
        game.state= g.state;
        game.cards=g.cards;
        
        return game;
    }
}