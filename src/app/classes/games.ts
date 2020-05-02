import {EventEmitter} from '@angular/core';
import {Observable, Subscriber} from 'rxjs';

import {SMUtils, ICardModel,IGameModel, IMoveModel, GameFactory as libGameFactory, Game as libGame} from 's-n-m-lib';
import {MoveTypesEnum , GameStatesEnum, PositionsEnum} from 's-n-m-lib';


export class Game extends libGame{
    stats:{players:{turns:number,moves:number}[]}={players:[{turns:0,moves:0},{turns:0,moves:0}]};
    stateEmitter:Subscriber<GameStatesEnum>;
    // convienience 
    deck:ICardModel[];
    recyclePile:ICardModel[];
  

    private constructor(){super();}
    
    static fromModel(model:any):Game{
        const g:Game=new Game();
//        console.log(`Model: ${JSON.stringify(model)}`);
        g.uuid = model.uuid;
        g.name= model.name;
        g.player1Uuid=model.player1Uuid;
        g.player2Uuid=model.player2Uuid;
        g.activePlayer=model.activePlayer;
        g.state=model.state;
        g.cards=model.cards;
        g.deck=g.cards[PositionsEnum.DECK];
        g.recyclePile=g.cards[PositionsEnum.RECYCLE];
        
//        console.log(`fromModel:Deck
//        ${model.cards[PositionsEnum.DECK].length}`);
        return g;        
    }
    onStateChange$():Observable<GameStatesEnum>{
        const o=Observable.create(e => this.stateEmitter = e);
        return o;
    }
    
    performMove(move: IMoveModel) {
        if(move.type==MoveTypesEnum.PLAYER){
            let stats=this.stats.players[this.activePlayer];
            stats.moves+=1;
        }
        super.performMove(move);
        if(this.cards[PositionsEnum.PLAYER_PILE+(this.activePlayer*10)].length==0){
            this.stateEmitter.next(GameStatesEnum.GAME_OVER);
            this.state= GameStatesEnum.GAME_OVER;
        }
        if(this.cards[PositionsEnum.DECK].length==0){
            this.stateEmitter.next(GameStatesEnum.DRAW);
            this.state= GameStatesEnum.DRAW;
        }
    }

    switchPlayer(){
        let stats=this.stats.players[this.activePlayer];
        stats.turns+=1;
        super.switchPlayer();
    }

    outOfCards(){
        console.log(`Out Of Cards`);
        this.stateEmitter.next(GameStatesEnum.DRAW);
        this.state= GameStatesEnum.DRAW;
    }
}
export class GameFactory extends libGameFactory{
    constructor(){
        super();
    }
    static newGame(name:string, player1Uuid: string, player2Uuid: string,deck:number[],debug=false):IGameModel{
//        console.log(`local GameFactory (${name},${player1Uuid},${player2Uuid}, ${deck},${debug})`);
        const game= super.newGame(name,player1Uuid,player2Uuid,deck,debug);

//        console.log(`=======================`);
//        console.log(`Player<0> PILE ${SMUtils.toFaceNumber(game.cards[PositionsEnum.PLAYER_PILE][game.cards[PositionsEnum.PLAYER_PILE].length-1].cardNo)}`);
//        console.log(`Player<1> PILE ${SMUtils.toFaceNumber(game.cards[PositionsEnum.PLAYER_PILE+10][game.cards[PositionsEnum.PLAYER_PILE+10].length-1].cardNo)}`);
        return game
    }
}
export {IGameModel} 

