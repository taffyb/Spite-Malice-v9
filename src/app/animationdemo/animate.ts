import { trigger, state, style, transition, animate} from '@angular/animations';

export const Animations = [
       trigger('changeDivSize', [
             state('initial', style({
               top:'{{iTop}}px',
               left:'{{iLeft}}px',
               position:'absolute',
               opacity:'{{iOpacity}}%'
             }),{params:{iTop:10,iLeft:10,iOpacity:0}}),
             state('final', style({
               top:'{{fTop}}px',
               left:'{{fLeft}}px',
               position:'absolute',
               opacity:'100%'
             }),{params:{fTop:500,fLeft:500}}),
             transition('initial=>final', animate('500ms')),
             transition('final=>initial', animate('1000ms'))
        ]),
]