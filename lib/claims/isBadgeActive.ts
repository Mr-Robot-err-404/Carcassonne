import { Land, Territory } from "../interfaces";

export interface Badge {
    str: string, 
    claim: string, 
    idx: number | undefined 
    complete: string[],
    overlap?: Badge
}

export function isBadgeActive(playerMatrix: Land[][], aiMatrix: Land[][], row: number, col: number): Badge {
    if (!playerMatrix.length || !aiMatrix.length) {
        return {
            str: "", 
            claim: "", 
            idx: undefined, 
            complete: []
        }
    }
    if (!playerMatrix[row][col].node.empty && !aiMatrix[row][col].node.empty) {
        const currPlayer = playerMatrix[row][col]
        const currAi = aiMatrix[row][col]
        return {
            str: "player", 
            claim: currPlayer.claimed as string, 
            idx: currPlayer.claimedIdx, 
            complete: currPlayer.complete, 
            overlap: {
                str: "ai", 
                claim: currAi.claimed as string, 
                idx: currAi.claimedIdx, 
                complete: currAi.complete
            }
        }
    }
    if (!playerMatrix[row][col].node.empty) {
        const claim = playerMatrix[row][col].claimed as string
        const idx = playerMatrix[row][col].claimedIdx
        const complete = playerMatrix[row][col].complete
        return {
            str: "player", 
            claim: claim, 
            idx: idx, 
            complete: complete
        }
    }
    if (!aiMatrix[row][col].node.empty) {
        const claim = aiMatrix[row][col].claimed as string
        const idx = aiMatrix[row][col].claimedIdx
        const complete = aiMatrix[row][col].complete
        return {
            str: "ai", 
            claim: claim, 
            idx: idx, 
            complete: complete
        }
    }
    return {
        str: "", 
        claim: "", 
        idx: undefined, 
        complete: []
    }
}