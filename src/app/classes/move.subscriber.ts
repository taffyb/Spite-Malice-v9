import {IMoveModel} from './moves';

export interface IMoveSubscriber{
    performMoves(gameUuid:string,moves:IMoveModel[]);
}