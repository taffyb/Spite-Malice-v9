import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate} from '@angular/animations';
import {Animations} from './animate';

@Component({
  selector: 'app-animationdemo',
  templateUrl: './animationdemo.component.html',
  styleUrls: ['./animationdemo.component.css'],
  animations: Animations
})
export class AnimationdemoComponent {
    title = 'Spite-Malice';
    currentState="";
    divState="initial";
    iTop=10;
    iLeft=10;
    fTop=0;
    fLeft=0;
    
    constructor(){  
    }
    setTarget(evt){
        this.divState= 'final';
        if(evt){
            this.fTop=evt.clientY;
            this.fLeft=evt.clientX;
        }
    }
    setInitial(evt){
        this.divState= 'initial';
        if(evt){
            this.iTop=evt.clientY;
            this.iLeft=evt.clientX;
        }
        evt.preventDefault();
    }
    
    toggleState(){
        this.divState= this.divState!='initial'?'initial':'final';
        console.log(`this.divState = ${this.divState}`);
        
    }

}
