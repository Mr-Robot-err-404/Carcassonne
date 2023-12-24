import { Land, Tile } from "../interfaces"

export function isTerritoryClaimed(matrix: Land[][], node: Tile, row: number, col: number, idx: number, claim: string): boolean {
    const str1 = JSON.stringify(matrix[row][col].node)
    const str2 = JSON.stringify(node)

    if (str1 !== str2) {
        return false
    }
    if (!matrix[row][col].claims.includes(claim)) {
        return false 
    }
    if (matrix[row][col].node.village && claim !== "city") {
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
