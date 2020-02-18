import { trigger, state, style, transition, animate} from '@angular/animations';

export const Animations = [
       trigger('changeDivSize', [
             state('initial', style({
               top:'{{iTop}}px',
               left:'{{iLeft}}px',
               position:'absolute',
               opacity:'{{iOpacity}}%',
               zIndex:'999'
             }),{params:{iTop:10,iLeft:10,iOpacity:35}}),
             state('final', style({
               top:'{{fTop}}px',
               left:'{{fLeft}}px',
               position:'absolute',
               opacity:'100%',
               zIndex:'999'
             }),{params:{fTop:500,fLeft:500}}),
             transition('initial=>final', animate('{{duration}}ms'),{params:{duration:500}}),
             transition('final=>initial', animate('1000ms'))
        ]),
]