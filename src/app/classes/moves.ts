import {MoveTypesEnum} from './enums';
export interface IMoveModel{
    gameGuid:string;
    playerGuid:string;
    from: number;
    card: number;
    to: number;
    isDiscard:boolean;
    isUndo:boolean;  
    type:MoveTypesEnum;
}
export class Move implements IMoveModel{
    gameGuid:"";
    playerGuid:"";
    from: number=-1;
    card: number=-1;
    to: number=-1;
    isDiscard:boolean=false;
    isUndo:boolean=false;  
    type:MoveTypesEnum;
}