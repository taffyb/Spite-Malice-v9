import { Component, OnInit } from '@angular/core';
import {Animations} from './animate';

@Component({
  selector: 'app-web-animation',
  templateUrl: './web-animation.component.html',
  styleUrls: ['./web-animation.component.css'],
  animations: Animations
})
export class WebAnimationComponent implements OnInit {
    cards:{cardNo:number,sTop:number,sLeft:number,fTop:number,fLeft:number}[]=[];
    divState="initial";
    animationId=-1;
    DURATION=500;

    constructor() { }

    ngOnInit() {
        this.cards.push({cardNo:1,sTop:500,sLeft:15,fTop:40,fLeft:215});
        this.cards.push({cardNo:2,sTop:500,sLeft:15,fTop:40,fLeft:275});
        this.cards.push({cardNo:3,sTop:500,sLeft:15,fTop:40,fLeft:335});
        this.cards.push({cardNo:4,sTop:500,sLeft:15,fTop:40,fLeft:395});
        this.cards.push({cardNo:5,sTop:500,sLeft:15,fTop:40,fLeft:455});
        this.cards.push({cardNo:6,sTop:500,sLeft:15,fTop:40,fLeft:215});
        this.cards.push({cardNo:7,sTop:500,sLeft:15,fTop:40,fLeft:275});
        this.cards.push({cardNo:8,sTop:500,sLeft:15,fTop:40,fLeft:335});
        this.cards.push({cardNo:9,sTop:500,sLeft:15,fTop:40,fLeft:395});
        this.cards.push({cardNo:10,sTop:500,sLeft:15,fTop:40,fLeft:455});
        this.cards.push({cardNo:11,sTop:500,sLeft:15,fTop:40,fLeft:215});
        this.cards.push({cardNo:12,sTop:500,sLeft:15,fTop:40,fLeft:275});
        this.cards.push({cardNo:13,sTop:500,sLeft:15,fTop:40,fLeft:335});
        this.cards.push({cardNo:14,sTop:500,sLeft:15,fTop:40,fLeft:395});
        this.cards.push({cardNo:15,sTop:500,sLeft:15,fTop:40,fLeft:455});
    }

    moveCards(){
    }

    toggleState(){
        this.divState= 'initial';
       
       setInterval(() => {
           this.animationId+=1;
       }, this.DURATION);
        
        console.log(`this.divState = ${this.divState}`);        
    }
    getState(idx:number):string{
        if(idx==this.animationId){
            return this.divState!='initial'?'initial':'final';
        }else if(idx<this.animationId){
            return this.divState!='initial'?'initial':'final';
        }else{
            return this.divState!='initial'?'final':'initial';;
        }
    }

}

 