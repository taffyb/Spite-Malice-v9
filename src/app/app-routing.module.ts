import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlayAreaComponent }   from './play-area/play-area.component';
import { HomeComponent }   from './home/home.component';

const routes: Routes = [
                        { path: '', redirectTo: '/home', pathMatch: 'full' },
                        { path: 'play-area/:gameUuid', component: PlayAreaComponent},
                        { path: 'home', component: HomeComponent}
                   ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
