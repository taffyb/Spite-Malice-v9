import { Component, OnInit, Input } from '@angular/core';
import {ActivatedRoute, Router } from '@angular/router';
import {PlayerService} from '../services/player.service';
import {GameService} from '../services/game.service';
import {IGameModel} from '../classes/games';
import {IPlayerModel} from 's-n-m-lib';
import {WsService} from '../services/ws.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  player:IPlayerModel;
  game:IGameModel;
  games$;
  opponents$;
  constructor(
          private router: Router,
          private route: ActivatedRoute,
          private gameSvc:GameService,
          private playerSvc:PlayerService,
          private wsSvc:WsService) {
      console.log(`HomeComponent: Constructor`);
      this.player = playerSvc.getActivePlayer();
      this.games$= gameSvc.getGames$(this.player.uuid,3);
      this.opponents$=playerSvc.getOpponents$(this.player.uuid);
      wsSvc.login(this.player);
  }

  ngOnInit() {
      console.log(`HomeComponent: ngOnInit`);
      this.wsSvc.onPlayerActive$().subscribe({
          next:(p:IPlayerModel)=>{
              console.log(`${p.name} is now active`);
          },
          error:(err)=>{
              console.log(`onPlayerActive error: ${JSON.stringify(err)}`);
          }
      });
  }
  
  newGame(){
      const game:IGameModel = this.gameSvc.newGame("new",this.player.uuid,"222222"); 
      this.router.navigate([`/play-area/${game.uuid}`]);
  }
}
