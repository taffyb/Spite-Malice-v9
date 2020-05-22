import { Injectable } from '@angular/core';
import { Observable,Observer } from 'rxjs';
import {IMoveModel,IPlayerModel} from 's-n-m-lib';

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

    public joinGame(playerUuid:string,gameUuid:string){
        this.socket.emit('join', {playerUuid:playerUuid,gameUuid:gameUuid});
    }
    public send(message:string): void {
        this.socket.emit('message', message);
    }
    public login(player:IPlayerModel): void {
        this.socket.emit('login', player);
    }

    public onMessage(): Observable<IMoveModel> {
        return new Observable<IMoveModel>(observer => {
            this.socket.on('message', (data: IMoveModel) => observer.next(data));
        });
    }

    public onEvent(event: Event): Observable<any> {
        return new Observable<Event>(observer => {
            this.socket.on(event, () => observer.next());
        });
    }
}
