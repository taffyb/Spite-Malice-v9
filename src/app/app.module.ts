import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';
import { PileComponent } from './pile/pile.component';
import { PlayAreaComponent } from './play-area/play-area.component';
import { PlayerStackComponent } from './player-stack/player-stack.component';
import { AnimationdemoComponent } from './animationdemo/animationdemo.component';
import { WebAnimationComponent } from './web-animation/web-animation.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    PileComponent,
    PlayAreaComponent,
    PlayerStackComponent,
    AnimationdemoComponent,
    WebAnimationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
