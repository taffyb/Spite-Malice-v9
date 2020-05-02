import { Component, OnInit, Input } from '@angular/core';
import {ActivatedRoute, Router } from '@angular/router';
import {PlayerService} from '../services/player.service';
import {GameService} from '../services/game.service';
import {IGameModel} from '../classes/games';
import {IPlayerModel} from 's-n-m-lib';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  player:IPlayerModel;
  game:IGameModel;
  games$;
  constructor(
          private route: ActivatedRoute,
          private gameSvc:GameService,
          private playerSvc:PlayerService) {
      console.log(`HomeComponent: Constructor`);
      this.player = playerSvc.getActivePlayer();
      this.game = this.gameSvc.newGame("new",this.player.uuid,"222222");

//      console.log(`New Game - active Player :${this.game.activePlayer}`);
  }

  ngOnInit() {
      console.log(`HomeComponent: ngOnInit`);
  }
}
