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
import { HelpDialogComponent } from './help-dialog/help-dialog.component';
import { HomeComponent } from './home/home.component';
import { SplashComponent } from './splash/splash.component';
import { TimezoneTestComponent } from './timezone-test/timezone-test.component';
import { GameItemComponent } from './game-item/game-item.component';
import { MoveRptComponent } from './move-rpt/move-rpt.component';
import { GaugeComponent } from './gauge/gauge.component';
import { OpponentComponent } from './opponent/opponent.component';
import { InvitationComponent } from './invitation/invitation.component';

import { AngularPageVisibilityModule } from 'angular-page-visibility';

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
    ModalDialog,
    HelpDialogComponent,
    HomeComponent,
    SplashComponent,
    TimezoneTestComponent,
    GameItemComponent,
    MoveRptComponent,
    GaugeComponent,
    OpponentComponent,
    InvitationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModules,
    FormsModule,
    AngularPageVisibilityModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[HelpDialogComponent,ProfileDialogComponent, ModalDialog]
})
export class AppModule { }
