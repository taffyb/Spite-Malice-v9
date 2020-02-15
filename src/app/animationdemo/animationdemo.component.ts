import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-animationdemo',
  templateUrl: './animationdemo.component.html',
  styleUrls: ['./animationdemo.component.css'],
  animations: [
               trigger('changeDivSize', [
                 state('initial', style({
                   backgroundColor: '{{color}}',
                   width: '100px',
                   height: '100px',
                   top:'{{sTop}}px',
                   left:'{{sLeft}}px',
                   position:'absolute',
                   opacity:'0%'
                 }),{params:{sTop:100,sLeft:100,color:'green'}}),
                 state('final', style({
                   backgroundColor: 'red',
                   width: '100px',
                   height: '100px',
                   top:'{{top}}px',
                   left:'{{left}}px',
                   position:'absolute',
                   opacity:'100%'
                 }),{params:{top:500,left:500}}),
                 transition('initial=>final', animate('500ms')),
                 transition('final=>initial', animate('1000ms'))
               ]),
             ]
})
export class AnimationdemoComponent implements OnInit {
    currentState = 'initial';

    changeState() {
      this.currentState = this.currentState === 'initial' ? 'final' : 'initial';
    }
  constructor() { }

  ngOnInit() {
  }

}
