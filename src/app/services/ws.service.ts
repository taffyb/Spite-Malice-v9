import { Injectable } from '@angular/core';
import { Observable,Observer } from 'rxjs';
import {IMoveModel,IPlayerModel,IGameModel,IInvitationModel} from 's-n-m-lib';

import * as socketIo from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class WsService {
    SERVER_URL='ws://localhost:4001/'
    private socket;

    constructor(){
        this.socket = socketIo(this.SERVER_URL);
    }

// OUT_GOING Messages
    public joinGame(player2:IPlayerModel,gameUuid:string){
        this.socket.emit('join', {player2:player2,gameUuid:gameUuid});
    }
    public send(message:string): void {
        this.socket.emit('message', message);
    }
    public sendInvite(player:IPlayerModel,opponent:IPlayerModel): void {
        const invite:IInvitationModel={from:player,to:opponent,timestamp:Date.now()}
        this.socket.emit('invite', invite);
    }
    public login(player:IPlayerModel): void {
        this.socket.emit('login', {player:player});
    }
    public sendInviteResponse(response:string,invite:IInvitationModel): void {
        invite.timestamp = Date.now();
        invite.response = (response==='accept'?true:false);
        this.socket.emit('invite-response', invite);
    }

 // IN_COMING Messages
    public onMessage$(): Observable<IMoveModel> {
        return new Observable<IMoveModel>(observer => {
            this.socket.on('message', (data: IMoveModel) => observer.next(data));
        });
    }
    public onPlayerActive$():Observable<IPlayerModel>{
        return new Observable<IPlayerModel>(observer => {
            this.socket.on('player-online',(p:IPlayerModel) => { observer.next(p);});
        });
    }
    public onDisconnect$(): Observable<IPlayerModel> {
        return new Observable<IPlayerModel>(observer => {
            this.socket.on('disconnected',(opponent:IPlayerModel) => {observer.next(opponent);});
        });
    }
    public onInvitation$():Observable<IInvitationModel>{
        return new Observable<IInvitationModel>(observer => {
                this.socket.on('invitation',(invite) => {
                observer.next(invite);
            });
        });
    }
    public onInvitationResponse$():Observable<IInvitationModel>{
        return new Observable<IInvitationModel>(observer => {
                this.socket.on('invitation-response',(invite) => {
                observer.next(invite);
            });
        });
    }
    public onJoin$():Observable<string>{
        return new Observable<string>(observer => {
                this.socket.on('join',(gameUuid) => {
                observer.next(gameUuid);
            });
        });
    }

    public onEvent$(event: Event): Observable<Event> {
        return new Observable<Event>(observer => {
            this.socket.on(event, (evt:Event) => observer.next(evt));
        });
    }
}
