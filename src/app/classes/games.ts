import {ICardModel, Card} from './cards';
import {IMoveModel} from './moves';
import {PositionsEnum, CardsEnum,MoveTypesEnum, GameStatesEnum, PlayerPositionsEnum} from './enums';
import { v4 as uuid } from 'uuid';
import {EventEmitter} from '@angular/core';
import {Observable} from 'rxjs';

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
    stateEmitter;

    // convienience 
    deck:ICardModel[]=this.cards[PositionsEnum.DECK];
    recyclePile:ICardModel[]=this.cards[PositionsEnum.RECYCLE];
    
    constructor(){}
    
    onStateChange$():Observable<GameStatesEnum>{
        const o=Observable.create(e => this.stateEmitter = e);
        return o;
    }
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
        const card:Card=new Card(move.card,move.to);
        this.addCard(card);
        if(move.type!=MoveTypesEnum.DEALER){
            this.removeCard(move.from);
        }
        if(this.cards[PositionsEnum.PLAYER_PILE+(this.activePlayer*10)].length==0){
            this.stateEmitter.next(GameStatesEnum.GAME_OVER);
            this.state= GameStatesEnum.DRAW;
        }
        if(this.deck.length==0){
            this.stateEmitter.next(GameStatesEnum.DRAW);
            this.state= GameStatesEnum.DRAW;
        }
    }
    
    addCard(card:Card){
        this.cards[card.position].push(card);
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
    static newLocalGame(name:string, player1Uuid: string, player2Uuid: string,deck:number[]):Game{
        const game:Game = new Game();
        game.uuid= uuid();
        game.name=name;
        game.player1Uuid=player1Uuid;
        game.player2Uuid=player2Uuid;

        let c:number;
        let card:ICardModel;
        //DEAL PILE
        for(let i:number=0;i<13;i++){
            //player 1
            c=deck.pop();
            card= new Card(c,PositionsEnum.PLAYER_PILE);
            game.addCard(card);
            //player 2
            c=deck.pop();
            card= new Card(c,PositionsEnum.PLAYER_PILE+10);
            game.addCard(card);
        }
        //START STACKS
        for(let i:number=0;i<4;i++){
            //player 1
            c=deck.pop();
            card= new Card(c,PositionsEnum.PLAYER_STACK_1+i);
            game.addCard(card);
            //player 2
            c=deck.pop();
            card= new Card(c,(PositionsEnum.PLAYER_STACK_1+i)+10);
            game.addCard(card);
        }
        //DEAL HAND
        for(let i:number=0;i<5;i++){
            //player 1
            c=deck.pop();
            card= new Card(c,PositionsEnum.PLAYER_HAND_1+i);
            game.addCard(card);
            //player 2
            c=deck.pop();
            card= new Card(c,(PositionsEnum.PLAYER_HAND_1+i)+10);
            game.addCard(card);
        }
        for(let i:number=0;i<deck.length;i++){
            card= new Card(deck[i],PositionsEnum.DECK);
            game.addCard(card);
        }
        return game;
    }
    static gameFromInterface(g:IGameModel):Game{
        const game:Game=new Game();
        game.uuid=g.uuid;
        game.name=g.name;
        game.player1Uuid=g.player1Uuid;
        game.player2Uuid=g.player2Uuid;
        game.activePlayer=g.activePlayer;
        game.state= g.state;
        game.cards=g.cards;
        
        return game;
    }
}