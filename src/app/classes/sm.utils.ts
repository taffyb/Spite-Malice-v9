
import {PositionsEnum, PlayerPositionsEnum, CardsEnum} from './enums';
import {Game} from './games';
import {ICardModel} from './cards';
//import {Move} from './Move';
//import {AutoMove} from './AutoMove';
//import {Player} from './Player';

export class SMUtils{
    constructor(){}
    
    static toFaceNumber(card:number):number{
        let c:number;
        if(card>CardsEnum.DECK){
            c=CardsEnum.JOKER;
        }else if(card>CardsEnum.NO_CARD){
            c=card%CardsEnum.KING;
            if(c==0){
                c=CardsEnum.KING;
            }
        }else{
            c=CardsEnum.NO_CARD;
        }
        return c;
    }
    static getTopOfStack(cards:ICardModel[]):number{
        return this.getFaceNumber(cards, cards.length-1);
    }
    static getFaceNumber(cards:ICardModel[],depth:number=0):number{
      if(depth==0){
          if(cards[depth].cardNo==CardsEnum.JOKER){
              return CardsEnum.ACE;
          }else{
              return this.toFaceNumber(cards[depth].cardNo);
          }          
      }else{
          let faceNumber:number=this.toFaceNumber(cards[depth].cardNo);
          if(faceNumber==CardsEnum.JOKER){
              return this.getFaceNumber(cards,depth-1)+1;
          }else{
              return faceNumber;
          }
      }
  }
    
//    static difference(game:Game,player:Player,position1:number,position2:number):number{
//        let card1:number;
//        let card2:number;
//    
//        card1=this.toFaceNumber(this.cardValue(game, player, position1));
//        card2=this.toFaceNumber(this.cardValue(game, player, position2));
////        console.log(`pos1=${position1}/${card1}, pos2=${position2}/${card2} => ${card1 - card2}`);
//        return  card1 - card2;
//    }
    
//    static cardValue(game:Game,player:Player,position:number):number{
//        let card:number=CardsEnum.NO_CARD;
//        if(position>=GamePositionsEnum.BASE){
//            card=game.viewTopOfStack(position-GamePositionsEnum.BASE);
//        }else{
//            if(position<PlayerPositionsEnum.STACK_1){
//                card=player.viewCard(position);
//            }else{
//                card=player.viewTopCard(position);
//            }   
//        }
//        return card;
//    }
//    static isJoker(game:Game,player:Player,position:number):boolean{
//        let card:number = this.toFaceNumber(this.cardValue(game, player, position));
//        return card == CardsEnum.JOKER;
//    }
//    static movesToString(moves:Move[]):string{
//        let str:string="";
//        str="[";
//        moves.forEach(m=>{
//            str+=this.moveToString(m)+",";
//        });
//        str+="]";
//        return str;
//    }
//    static moveToString(m:Move,depth:number=0):string{
//        let str:string="";
//               
//    
//        str+= " ".repeat(depth);
//        if(m instanceof AutoMove){
//            str+=`${(m.previousMove?"prev<= ":" ")}[${m.card}/${CardsEnum[this.toFaceNumber(m.card)]}]${m.from}->${m.to} ${m.score?'<'+m.score+'>':''} ${m.isDiscard?"Discard":""}`;
//            if(m.nextMoves){
//                depth+=1;
//                m.nextMoves.forEach(m=>{
//                    str+=`\n`;
//                    str+=this.moveToString(m,depth);
//                });            
//            }
//        }else{
//            str+=`[${m.card}/${this.toFaceNumber(m.card)}]${m.from}->${m.to} ${m.isDiscard?"Discard":""}`;
//        }
//        return str;
//    }
}
