import { Component,OnInit } from '@angular/core';
import { Observable, of} from 'rxjs';
import {IProfileModel} from './classes/profile';
import {ProfileService} from './services/profile.service';
import {PlayerService} from './services/player.service';
import { MatDialog } from '@angular/material';
import { ModalDialog, DialogOptions } from './modal-dialog/modal-dialog';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
    profile$:Observable<IProfileModel>;
    player;

    constructor(private profileSvc:ProfileService,
                private playerSvc:PlayerService,
                public dialog: MatDialog){
        
        
        
    }
    
    ngOnInit(){
        let msg:string = "Please Enter Username";
        let options:number = DialogOptions.OK+
                             DialogOptions.CANCEL+
                             DialogOptions.MANDATORY+
                             DialogOptions.INPUT;
        this.openDialog(msg,options);
        
    }
    
    openDialog(message:string,options:number): void {
        const dialogRef = this.dialog.open(ModalDialog, {
          width: '300px',
          backdropClass:'custom-dialog-backdrop-class',
          panelClass:'custom-dialog-panel-class',
          data: {message: message,
                 dialogOptions:options
                }
        });
     
        dialogRef.afterClosed().subscribe(async (result) => {
          console.log(`onClose Dialog: ${JSON.stringify(result)}`);
          if(result.data.option == DialogOptions.OK && result.data.input.length>0){
              this.player = await this.playerSvc.getPlayerByName$(result.data.input).toPromise();
              console.log(`Observation: ${JSON.stringify(this.player)}`); 
              this.profile$=this.profileSvc.getProfile$(this.player.guid);              
          }
        });
      }
}
