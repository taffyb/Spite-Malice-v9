import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { MaterialModules } from './material-module';
import { HttpClientModule } from '@angular/common/http'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';
import { PileComponent } from './pile/pile.component';
import { PlayAreaComponent } from './play-area/play-area.component';
import { PlayerStackComponent } from './player-stack/player-stack.component';
import { GamePileComponent } from './game-pile/game-pile.component';
import { BurgerMenuComponent } from './burger-menu/burger-menu.component';
import { ProfileDialogComponent } from './profile-dialog/profile-dialog.component';

import { ModalDialog } from './modal-dialog/modal-dialog';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    PileComponent,
    PlayAreaComponent,
    PlayerStackComponent,
    GamePileComponent,
    BurgerMenuComponent,
    ProfileDialogComponent,
    ModalDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModules,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[ProfileDialogComponent, ModalDialog]
})
export class AppModule { }
