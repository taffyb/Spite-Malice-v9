import { Component, OnInit } from '@angular/core';
import {Animations} from './animate';

@Component({
  selector: 'app-card-animation',
  templateUrl: './card-animation.component.html',
  styleUrls: ['./card-animation.component.css'],
  animations: Animations
})
export class CardAnimationComponent implements OnInit {
    moves:{cardNo:number,sTop:number,sLeft:number,fTop:number,fLeft:number}[]=[];
    cards:{cardNo:number,sTop:number,sLeft:number,fTop:number,fLeft:number}[]=[];
    NO_CARD={cardNo:-1,sTop:-1,sLeft:-1,fTop:-1,fLeft:-1};
    m:{cardNo:number,sTop:number,sLeft:number,fTop:number,fLeft:number}=this.NO_CARD;
    divState="";
    animating:boolean=false;
    DURATION=1000;

    constructor() { }

    ngOnInit() {
    }

    initMoves(){
        const cardNo=()=>{return Math.floor(Math.random()*(53-1)+1)};
        this.cards=[];
        this.moves.push({cardNo:1,sTop:500,sLeft:15,fTop:40,fLeft:215});
        this.moves.push({cardNo:cardNo(),sTop:500,sLeft:15,fTop:40,fLeft:275});
        this.moves.push({cardNo:cardNo(),sTop:500,sLeft:15,fTop:40,fLeft:335});
        this.moves.push({cardNo:cardNo(),sTop:500,sLeft:15,fTop:40,fLeft:395});
        this.moves.push({cardNo:cardNo(),sTop:500,sLeft:15,fTop:40,fLeft:455});
        this.moves.push({cardNo:1,sTop:40,sLeft:215,fTop:40,fLeft:455});
        this.moves.push({cardNo:cardNo(),sTop:500,sLeft:15,fTop:40,fLeft:275});
        this.moves.push({cardNo:cardNo(),sTop:500,sLeft:15,fTop:40,fLeft:335});
        this.moves.push({cardNo:cardNo(),sTop:500,sLeft:15,fTop:40,fLeft:395});
        this.moves.push({cardNo:cardNo(),sTop:500,sLeft:15,fTop:40,fLeft:455});
        this.moves.push({cardNo:cardNo(),sTop:500,sLeft:15,fTop:40,fLeft:215});
        this.moves.push({cardNo:cardNo(),sTop:500,sLeft:15,fTop:40,fLeft:275});
        this.moves.push({cardNo:cardNo(),sTop:500,sLeft:15,fTop:40,fLeft:335});
        this.moves.push({cardNo:cardNo(),sTop:500,sLeft:15,fTop:40,fLeft:395});
        this.moves.push({cardNo:cardNo(),sTop:500,sLeft:15,fTop:40,fLeft:455});
    }
    
    toggleState(){
       this.divState=(this.divState=='initial'?'final':'initial')
       if(this.divState=='initial'){
           if(this.moves.length==0){
               this.initMoves();
           }
            this.animateMove();
       }
    }

    animateMove(){
//       if(this.divState!='initial'){
//            this.divState= 'initial';
//       }
       if(!this.animating && this.moves.length>0){ 
           this.m = this.moves.splice(0,1)[0];          
           setTimeout(()=>{this.divState='final';this.animating=true;},50); 
       }       
    }
    animationDone(evt){
//        console.log(`${JSON.stringify(evt)}`);
        if(evt.fromState=='initial'){
          this.cards.push(this.m);
          this.m=this.NO_CARD;
          this.animating=false;
          if(this.moves.length>0){
              setTimeout(()=>{
                  this.divState='initial';
                  this.animateMove();
              },50);
          }
        }
    }
}
