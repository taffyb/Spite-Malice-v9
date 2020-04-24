import {Component,OnInit } from '@angular/core';
import {Observable, of} from 'rxjs';
import {IProfileModel} from './classes/profile';
import {ProfileService} from './services/profile.service';
import {PlayerService} from './services/player.service';
import {GameService} from './services/game.service';
import {Game} from './classes/games';
import {IPlayerModel} from './classes/players';
import {MatDialog } from '@angular/material';
import {ModalDialog, DialogOptions } from './modal-dialog/modal-dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
    profile$:Observable<IProfileModel>;
    player:IPlayerModel;
//    game:Game;

    constructor(private playerSvc:PlayerService,
                private profileSvc:ProfileService,
                private gameSvc:GameService,
                public dialog: MatDialog){
        console.log(`AppComponent: Constructor`);
    }
    
    ngOnInit(){
//        console.log(`AppComponent: ngOnInit`);
    }

    loadProfile(player){
        if(player){
            this.profile$=this.profileSvc.getProfile$(player.guid); 
        }
    }
    async guestEntry(){
        this.player = await this.playerSvc.getPlayerByName$("Player1").toPromise();
        this.profile$=this.profileSvc.getDefaultProfile$();
    }
}
