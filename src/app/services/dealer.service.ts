import {Injectable} from '@angular/core';
import {Game} from '../classes/games';
import {IMoveModel, Move, ICardModel, Card} from 's-n-m-lib';
import {PositionsEnum, CardsEnum, PlayerPositionsEnum, MoveTypesEnum} from 's-n-m-lib';

import {MoveService} from '../services/move.service';

@Injectable({
  providedIn: 'root'
})
export class DealerService {

  constructor(private moveSvc:MoveService) {}
  
  getDeck():number[]{
      const decks:number=2; //default play with two decks
      const jokers:number=4;
      const deck:number[]=[];
      for(let d:number=0;d<decks;d++){      
          for(let i:number=1;i<=52;i++){
              deck.push(i);
          }
      }  
      if(jokers>0){
        for(let i=1;i<=jokers;i++){
            deck.push(CardsEnum.JOKER);
        }
      }
      this.shuffle<number>(deck);
      return deck;
  }
  private shuffle<T>(deck:T[]) { 
      for (let i:number = deck.length - 1; i > 0; i--) {
          let j:number = Math.floor(Math.random() * (i + 1));
          let temp:T = deck[i];
          deck[i] = deck[j];
          deck[j] = temp;
      }
   }
  fillHand(activePlayer:number,game:Game):Move[]{
      let c:number=0;
      let moves:Move[]=[];
      
      const HAND_1 = PositionsEnum.PLAYER_HAND_1+(activePlayer*PlayerPositionsEnum.PLAYER_2);
      const HAND_5 = PositionsEnum.PLAYER_HAND_5+(activePlayer*PlayerPositionsEnum.PLAYER_2);
//      console.log(`fillHand:
//      deck: ${game.deck.length} 
//      cards[DECK]: ${game.getCards(PositionsEnum.DECK).length}`); 
      for(let i=HAND_1;i<=HAND_5;i++){
          if(game.getCards(i).length==0){
              let nextCard:Card;
              try{
                  nextCard= this.dealNextCard(game);
              }catch(e){
                  game.outOfCards();
              }
              c++;
              let move = new Move();
              
              move.type=MoveTypesEnum.DEALER;
              move.from=PositionsEnum.DECK;
              move.card=nextCard.cardNo;
              move.to=i;
              moves.push(move);              
          }          
      }

      const addMove = new Promise((resolve,reject)=>{
          this.moveSvc.addMoves(game.uuid,"", moves);
      });
      return moves;
  }
  private dealNextCard(game:Game):Card{
      let nextCard:Card;
      if(game.deck.length==0){
          this.recycle(game);
      }
      if(game.deck.length==0){
          throw Error;
      }
      
      nextCard= game.deck.pop();
      if(game.deck.length==0){
          this.recycle(game);
      }
      return nextCard;
  }
  private recycle(game:Game){
      /* 
      If the deck has run out of cards, 
      shuffle the recycle pile and add them back into the deck.
      */
      console.log(`*** Recycle Discard pile ***`);
      for(let i=game.recyclePile.length-1;i>=0;i--){
          game.deck.push(game.recyclePile.pop());
      };
      this.shuffle<Card>(game.deck);
  }
}
