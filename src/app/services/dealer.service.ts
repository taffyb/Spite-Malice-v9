import {Injectable} from '@angular/core';
//import {Player} from '../classes/Player';
import {Game} from '../classes/games';
//import {Turn} from '../classes/Turn';
//import {Deal} from '../classes/Deal';
import {IMoveModel, Move} from '../classes/moves';
import {Card} from '../classes/cards';
import {PositionsEnum, CardsEnum, PlayerPositionsEnum, MoveTypesEnum} from '../classes/enums';
import {ICardModel} from '../classes/cards';

import {MoveService} from '../services/move.service';

@Injectable({
  providedIn: 'root'
})
export class DealerService {

  constructor(private moveSvc:MoveService) {}
  
  getCardNos():number[]{
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
  shuffle<T>(deck:T[]) { 
      for (let i:number = deck.length - 1; i > 0; i--) {
          let j:number = Math.floor(Math.random() * (i + 1));
          let temp:T = deck[i];
          deck[i] = deck[j];
          deck[j] = temp;
      }
   }
  fillHand(activePlayer:number,game:Game):Move[]{
      let c:number=0;
      let moves:Move[];
      
      const HAND_1 = PositionsEnum.PLAYER_HAND_1+(activePlayer*PlayerPositionsEnum.PLAYER_2);
      const STACK_1 = PositionsEnum.PLAYER_STACK_1+(activePlayer*PlayerPositionsEnum.PLAYER_2);
//      console.log(`fillHand\nPlayer: ${player.name} Hand B4: ${JSON.stringify(player.cards)}`);
      for(let i=HAND_1;i<STACK_1;i++){
          if(game.cardPositions[i].length==0){
              let nextCard:Card = this.dealNextCard(game);
//              console.log(`add card ${nextCard} to position ${i}`);
              c++;
              let move = new Move();
              move.type=MoveTypesEnum.DEALER;
              move.from=PositionsEnum.DECK;
              move.card=nextCard.cardNo;
              move.to=i;
              moves.push(move);
              game.cardPositions[i].push(nextCard);              
          }          
      }

      const addMove = new Promise((resolve,reject)=>{
          this.moveSvc.addMoves(game.uuid, moves);
      });
//      console.log(`fillHand\nPlayer: ${player.name} Added ${c} cards ${JSON.stringify(deal)}`);
      return moves;
  }
  private dealNextCard(game:Game):Card{
      let nextCard:Card;
      if(game.deck.length==0 && game.recyclePile.length==0){
          game.gameOver="There are no more cards to deal. We will have to call this a draw.";
          game.isDraw=true;
      }
      if(game.deck.length==0){
          /* 
              If the deck has run out of cards, 
              shuffle the recycle pile and add them back into the deck.
          */
          game.deck = game.recyclePile;
          game.recyclePile=[]; //empty the recycle pile
          this.shuffle<Card>(game.deck);
      }
      if(game.deck.length==0){
          throw Error;
      }
      nextCard= game.deck.pop();
      while(nextCard.cardNo==CardsEnum.NO_CARD){
          nextCard=game.deck.pop();
      }
      return nextCard;
    }

}
