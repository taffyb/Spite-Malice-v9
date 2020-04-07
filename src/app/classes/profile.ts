export interface IProfileModel{
    animation:{ animateYN:boolean,
                animate:{recycleYN:boolean,recycle:number,
                          dealerYN:boolean,dealer:number,
                          playerYN:boolean,player:number,
                          opponentYN:boolean,opponent:number}
              },
    showStatistics:boolean
}
export const DEFAULT_PROFILE={
    animation: { animateYN: true, 
                 animate: { recycleYN: true, recycle: 0.1,
                             dealerYN: true, dealer: 0.3, 
                             playerYN: true, player: 0.5, 
                             opponentYN: true, opponent: 0.5 }
                },
    showStatistics:true
}