import { Land } from "../interfaces";

export function claimedNode(matrix: Land[][], row: number, col: number, claim: string, idx?: number) {
    matrix[row][col].claimed = claim
    if (typeof idx === 'number') {
        matrix[row][col].claimedIdx = idx
    }
}