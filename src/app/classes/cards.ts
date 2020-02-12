export interface ICardModel{
    cardNo:number;
    position:number;
}

export class Card implements ICardModel{
    cardNo:number;
    position:number;

    constructor(cardNo:number,position:number){
        this.cardNo=cardNo;
        this.position=position;
    }
}