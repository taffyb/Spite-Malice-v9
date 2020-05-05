import { Component, OnInit, Input} from '@angular/core';
import {IGameModel, GameStatesEnum} from 's-n-m-lib';

@Component({
  selector: 'app-game-item',
  templateUrl: './game-item.component.html',
  styleUrls: ['./game-item.component.css']
})
export class GameItemComponent implements OnInit {
  @Input()game:IGameModel;
  gameStatesEnum = GameStatesEnum;
  constructor() { }

  ngOnInit() {
  }

}
