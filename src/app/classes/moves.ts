export interface IMoveModel{
    from: number;
    card: number;
    to: number;
    isDiscard:boolean;
    isUndo:boolean;  
    type:number;
}
export class Move implements IMoveModel{
    from: number=-1;
    card: number=-1;
    to: number=-1;
    isDiscard:boolean=false;
    isUndo:boolean=false;  
    type:number;
}