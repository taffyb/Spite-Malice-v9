import { v4 as uuid } from 'uuid';

export interface IPlayerModel{
    guid:string;
    name:string;
}
export class Player implements IPlayerModel{
    guid: string;
    name: string;
}
export class PlayerFactory{
    static playerFromObj(obj){
        const player:Player = new Player();
        player.guid = obj.guid || uuid();
        player.name = obj.name || 'Player';
    }
}