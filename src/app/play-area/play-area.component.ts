import { Component, OnInit, Input,ViewChild, ElementRef, Renderer2, NgZone } from '@angular/core';

import {Options} from '../classes/options';
import {SMUtils} from '../classes/sm.utils';
import {Game} from '../classes/games';
import {SelectedCard} from '../classes/selected-card';
import {IMoveModel,Move} from '../classes/moves';
import {ICardModel, Card} from '../classes/cards';
import {IMoveSubscriber} from '../classes/move.subscriber';
import {PositionsEnum, PlayerPositionsEnum, CardsEnum, MoveTypesEnum} from '../classes/enums';

import {GameService} from '../services/game.service';
import {MoveService} from '../services/move.service';
import {DealerService} from '../services/dealer.service';
import {Animations} from './animation';

@Component({
  selector: 'app-play-area',
  templateUrl: './play-area.component.html',
  styleUrls: ['./play-area.component.css'],
  animations:Animations
})
export class PlayAreaComponent implements OnInit, IMoveSubscriber {
//    @Input()uuid:string=null;
  pE=PositionsEnum;
  pPE=PlayerPositionsEnum;
  cE=CardsEnum;
  players=[0,1];
  game:Game;
  from:SelectedCard=new SelectedCard(-1,-1);
  to:SelectedCard=new SelectedCard(-1,-1);
  
  //animation controle
  NO_MOVE={top:-1,left:-1};
  DURATION=300;
  fromRect=this.NO_MOVE;
  toRect=this.NO_MOVE;
  animTrigger="from";
  m:Move=new Move();
  animating:boolean=false;
  moves:Move[]=[];
  
  APO:number; /*ACTIVE PLAYER OFFSET */
  
  constructor(private gameSvc:GameService, 
          private moveSvc:MoveService, 
          private dealerSvc:DealerService, 
          private renderer:Renderer2,
          public zone: NgZone) { 
      this.game=gameSvc.newGame("12345", "", "");
      this.game.cardPositions[this.pE.PLAYER_STACK_1].push(new Card(this.cE.KING,this.pE.PLAYER_STACK_1));
      this.game.cardPositions[this.pE.PLAYER_STACK_1].push(new Card(this.cE.QUEEN,this.pE.PLAYER_STACK_1));
      this.game.cardPositions[this.pE.PLAYER_STACK_1].push(new Card(this.cE.JACK,this.pE.PLAYER_STACK_1));
      this.game.cardPositions[this.pE.PLAYER_STACK_1].push(new Card(this.cE.TEN,this.pE.PLAYER_STACK_1));
      this.game.cardPositions[this.pE.PLAYER_STACK_1].push(new Card(this.cE.NINE,this.pE.PLAYER_STACK_1));
      this.game.cardPositions[this.pE.PLAYER_STACK_1].push(new Card(this.cE.EIGHT,this.pE.PLAYER_STACK_1));
      this.game.cardPositions[this.pE.PLAYER_STACK_1].push(new Card(this.cE.SEVEN,this.pE.PLAYER_STACK_1));
//      this.game.cardPositions[this.pE.PLAYER_STACK_3].pop();
      this.game.cardPositions[this.pE.PLAYER_HAND_4+10].pop();
      
      this.moveSvc.subscribe(this);
//      this.moveSvc.subscribe(this.game);
      //initialise the convienience value
      this.APO=(this.game.activePlayer*this.pPE.PLAYER_2);
  }

  ngOnInit() {
  }

  performMoves(gameUuid: string, moves: IMoveModel[]) {
      if(gameUuid == this.game.uuid){      //only act on moves for this game
          this.moves.push(... moves);
          this.animateMove();
      }
  }
  animateMove(){
      console.log(`animateMove: animating?${this.animating} moves:${this.moves.length}`);
      if(!this.animating && this.moves.length>0){
          let m=this.moves.splice(0,1)[0];
          this.fromRect=this.pos2ClientRec(m.from);
          this.toRect=this.pos2ClientRec(m.to);
//          console.log(`fromRect: ${JSON.stringify(this.fromRect)}, toRect:toRect: ${JSON.stringify(this.toRect)}`);
          this.m=m;         
          setTimeout(()=>{this.animTrigger='to';this.animating=true;},50); 
      }
  }
  animDone(evt){
      console.log(`animDone:${JSON.stringify(evt)}`);
      if(evt.fromState=='from'){
        // move the card
//        this.fromRect=this.NO_MOVE;
//        this.toRect=this.NO_MOVE;
        this.animating=false;
        this.game.performMove(this.m);
        this.m=new Move();
        this.animTrigger='from';
        if(this.moves.length>0){
            setTimeout(()=>{
                this.animateMove();
            },50);
        }
      }
  }
  select(selectedCard:SelectedCard){
      if(this.from.cardNo==-1){
          this.from= selectedCard;
      }else{
          if(this.from.cardNo==selectedCard.cardNo){
              this.from = new SelectedCard(-1,-1);
              this.to = new SelectedCard(-1,-1);
          }else{
              this.to = selectedCard;
              //move from ==> to
              let move = new Move();
              move.from=this.from.position;
              move.card=this.from.cardNo;
              move.to=this.to.position;
              move.type = MoveTypesEnum.PLAYER;
              move.isDiscard=this.isDiscard(this.to.position);
              this.moveSvc.addMove(this.game.uuid, move);
              
              //reset selected Positions
              this.from = new SelectedCard(-1,-1);
              this.to = new SelectedCard(-1,-1);
          }
      }
//      console.log(`PlayArea\nselectedCard: ${JSON.stringify(selectedCard)}\nfrom: ${JSON.stringify(this.from)}\nto: ${JSON.stringify(this.to)}`);
  }
  getOptions(position:number):Options{
      let opt:Options=new Options();
      let cardAtPosition:Card;
      
      opt.selected=(this.from.position==position);
      if([this.pE.DECK,this.pE.RECYCLE].includes(position)){opt.showCardFace=false;}
//      *** TESTING ONLY ***
//      this.from=new Card(this.cE.ACE,this.pE.PLAYER_HAND_1);
  
      //if there is no card at this position and it is the centre stack or active player's stack
      if(this.game.cardPositions[position].length==0){
//          console.log(`There is no card at position [${position}]`);
         switch(position){
             case this.pE.PLAYER_PILE+(this.APO):
                 //Pile can't be empty while game in play
                 break;
             case this.pE.PLAYER_HAND_1+(this.APO):
             case this.pE.PLAYER_HAND_2+(this.APO):
             case this.pE.PLAYER_HAND_3+(this.APO):
             case this.pE.PLAYER_HAND_4+(this.APO):
             case this.pE.PLAYER_HAND_5+(this.APO):
                //the player can't place cards in their hand
                 break;
             case this.pE.PLAYER_STACK_1+(this.APO):
             case this.pE.PLAYER_STACK_2+(this.APO):
             case this.pE.PLAYER_STACK_3+(this.APO):
             case this.pE.PLAYER_STACK_4+(this.APO):                 
                 //can be a target as long as there is a from position
                 opt.selectableTo=true && (this.from.cardNo!=-1);
                 break;
             case this.pE.STACK_1:
             case this.pE.STACK_2:
             case this.pE.STACK_3:
             case this.pE.STACK_4:
//                 console.log(`([${this.cE.ACE},${this.cE.JOKER}].includes(${SMUtils.toFaceNumber(this.from.cardNo)}/${this.from.cardNo}))`);
                 opt.selectableTo= ([this.cE.ACE,this.cE.JOKER].includes(SMUtils.toFaceNumber(this.from.cardNo)));
          }
      }else{
          cardAtPosition=this.game.cardPositions[position][this.game.cardPositions[position].length-1];
          
          switch(position){
              case this.pE.PLAYER_PILE+(this.APO):
              case this.pE.PLAYER_HAND_1+(this.APO):
              case this.pE.PLAYER_HAND_2+(this.APO):
              case this.pE.PLAYER_HAND_3+(this.APO):
              case this.pE.PLAYER_HAND_4+(this.APO):
              case this.pE.PLAYER_HAND_5+(this.APO):
                  if(this.from.position>-1){ //a card is selected
                      if(this.from.position==position){
                          opt.selected=true;
                          opt.selectableFrom=true;
                      }
                  }else{
                      opt.selectableFrom=true;
                  }
                  break;
              case this.pE.PLAYER_STACK_1+(this.APO):
              case this.pE.PLAYER_STACK_2+(this.APO):
              case this.pE.PLAYER_STACK_3+(this.APO):
              case this.pE.PLAYER_STACK_4+(this.APO): 
                  if(this.from.position>-1){ //a card is selected
                      if(this.from.position==position){
                          opt.selected=true;
                          opt.selectableFrom=true;
                      }      
                      if(this.from.position!=position && 
                         this.canDiscard() && 
                         this.from.position!=this.pE.PLAYER_PILE+(this.APO)){
                          opt.selectableTo=true;
                      }
                  }else{
                      opt.selectableFrom=true;
                  }
                  opt.canDiscard=this.canDiscard();
                  break;
              case this.pE.STACK_1:
              case this.pE.STACK_2:
              case this.pE.STACK_3:
              case this.pE.STACK_4:
                  opt.selectableTo= (SMUtils.toFaceNumber(cardAtPosition.cardNo)==(SMUtils.toFaceNumber(this.from.cardNo)-1) ||
                                     SMUtils.toFaceNumber(this.from.cardNo)==this.cE.JOKER);
           }
      }
//      console.log(`Options for position [${position}]:${JSON.stringify(opt)}`);
      return opt;
  }
  isDiscard(position:number):boolean{
      if(position >= this.pE.PLAYER_STACK_1+(this.APO) && position <=this.pE.PLAYER_STACK_4+(this.APO)){
          return (this.game.cardPositions[position].length>=1);
      }else{
          return false;
      }
          
  }
  canDiscard():boolean{
      let canDiscard:boolean;
      const stackSelected=()=>
          { if(this.from.position<0){
                  return false;
            }else{
                  return (this.pE.PLAYER_STACK_1+(this.APO)<=this.from.position &&
                     this.pE.PLAYER_STACK_4+(this.APO)>=this.from.position);
            }
          };
      for(let i=0;i<4;i++){
          //check that each active player stack has at least 1 card 
          canDiscard= this.game.cardPositions[this.pE.PLAYER_STACK_1+i+(this.pPE.PLAYER_2*this.game.activePlayer)].length>0
          if(!canDiscard){break;}
      }
      return canDiscard && !stackSelected();
  }
  
  pos2ClientRec(pos:number):{top:number,left:number}{
      let id:string = `#pos${pos}`;
      console.log(`querySelector(${id})`);
      const clientRect=document.querySelector( id).getBoundingClientRect();
      return {top:clientRect.top,left:clientRect.left};
  }
  
}
