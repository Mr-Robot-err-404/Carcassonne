import { Land, Tile } from "../interfaces"

export function appendLand(matrix: Land[][], row: number, col: number, node: Tile, claim: string, idx?: number) {
    matrix[row][col].node = node
    matrix[row][col].claims.push(claim)

    if (claim === "city" && node.unjoined) {
        matrix[row][col].edgeIndices.push(idx as number)
    }

    if (claim === "road" && node.village) {
        matrix[row][col].edgeIndices.push(idx as number)
    }
}