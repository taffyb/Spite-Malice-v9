export interface IProfileModel{
    animation:{ animateYN:boolean,
                animate:{recycleYN:boolean,recycle:number,
                          dealerYN:boolean,dealer:number,
                          playerYN:boolean,player:number,
                          opponentYN:boolean,opponent:number}
              },
    showStatistics:boolean
}
//export const DEFAULT_PROFILE={
//    animation: { animateYN: true, 
//                 animate: { recycleYN: true, recycle: 1,
//                             dealerYN: true, dealer: 1, 
//                             playerYN: true, player: 1, 
//                             opponentYN: true, opponent: 1 }
//                },
//    showStatistics:true
//}
export const DEFAULT_PROFILE={
        animation: { animateYN: true, 
            animate: { recycleYN: false, recycle: 1,
                        dealerYN: false, dealer: 1, 
                        playerYN: true, player: .2, 
                        opponentYN: true, opponent: .2 }
           },
showStatistics:true
}