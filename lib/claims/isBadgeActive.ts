import { Land, Territory } from "../interfaces";

export function isBadgeActive(playerMatrix: Land[][], aiMatrix: Land[][], row: number, col: number): [string, string, number | undefined, string[]] {
    if (!playerMatrix[row][col].node.empty) {
        const claim = playerMatrix[row][col].claimed as string
        const idx = playerMatrix[row][col].claimedIdx
        const complete = playerMatrix[row][col].complete
        return ["player", claim, idx, complete]
    }
    if (!aiMatrix[row][col].node.empty) {
        const claim = aiMatrix[row][col].claimed as string
        const idx = aiMatrix[row][col].claimedIdx
        const complete = aiMatrix[row][col].complete
        return ["ai", claim, idx, complete]
    }
    return ["", "", undefined, []]
}