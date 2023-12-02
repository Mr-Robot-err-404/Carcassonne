import { Land, Tile } from "../interfaces"

export function isTerritoryClaimed(matrix: Land[][], node: Tile, row: number, col: number, idx: number, claim: string,): boolean {
    if (matrix[row][col].node !== node) {
        return false
    }
    if (!matrix[row][col].claims.includes(claim)) {
        return false 
    }
    if (matrix[row][col].node.village) {
        if (!matrix[row][col].edgeIndices.includes(idx)) {
            return false
        }
    }
    if (matrix[row][col].node.unjoined) {
        if (!matrix[row][col].edgeIndices.includes(idx)) {
            return false
        }
    }
    return true
}
