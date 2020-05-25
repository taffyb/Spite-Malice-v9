import { Component, OnInit, Input} from '@angular/core';
import {IGameModel, IPlayerModel, GameStatesEnum} from 's-n-m-lib';
import {PlayerService} from '../services/player.service';

@Component({
  selector: 'app-game-item',
  templateUrl: './game-item.component.html',
  styleUrls: ['./game-item.component.css']
})
export class GameItemComponent implements OnInit {
  @Input()game:IGameModel;
  gameStatesEnum = GameStatesEnum;
  constructor( 
          private playerSvc:PlayerService) { }

  ngOnInit() {
      console.log(`game=${JSON.stringify(this.game)}`);
  }

  isMyTurn():boolean{
      let isMyTurn:boolean=false;
      const me:IPlayerModel = this.playerSvc.getActivePlayer();
      const playersUuids:string[] = [this.game.player1Uuid,this.game.player2Uuid];
      
      console.log(`activePlayer=${this.game.activePlayer}, playerUuids=${JSON.stringify(playersUuids)}`);
//      return false;
      return (playersUuids[this.game.activePlayer] === me.uuid);
  }
}
