import { Component } from '@angular/core';
import {Options} from './classes/options';
import { trigger, state, style, transition, animate} from '@angular/animations';
import {Animations} from './animate';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: Animations
})
export class AppComponent {
  title = 'Spite-Malice';
  options:Options=new Options();
  currentState="";
  divState="initial";
  iTop=10;
  iLeft=10;
  fTop=0;
  fLeft=0;
  
  constructor(){
      this.options.selectableFrom=true;      
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
