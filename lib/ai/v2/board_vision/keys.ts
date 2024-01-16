import { Territory, Tile } from "@/lib/interfaces"
import { oppositeEdges } from "@/lib/helperFunctions"

export interface Square {
    row: number
    col: number
}

const dir = [
    [-1, 0], 
    [0, 1], 
    [1, 0], 
    [0, -1]
]
const joinMap = oppositeEdges()

export function findKeySquares(tiles: Square[], board: Tile[][], map: Territory): Square[] {
    const arr = []

    for (let i = 0; i < tiles.length; i++) {
        const square = tiles[i]
        const row = square.row
        const col = square.col 
        const node = board[row][col]

        if (!node.empty) {
            continue
        }
        const curr = {
            playerCity: false,
            aiCity: false,
            emptyNeighbor: false
        }

        for (let j = 0; j < dir.length; j++) {
            const x = dir[j][1]
            const y = dir[j][0]
            const neighbor = board[row + y][col + x]
            const idx = joinMap.get(j) as number

            if (neighbor.empty) {
                curr.emptyNeighbor = true
                continue
            }
            const currPlayer = map.player.territory[row + y][col + x]
            const currAi = map.ai.territory[row + y][col + x]

            if (neighbor.edges[idx] !== "city") {
                continue
            }

            if (!currPlayer.node.empty && currPlayer.claims.includes("city")) {
                if (neighbor.unjoined && !currPlayer.edgeIndices.includes(idx)) {
                    continue
                }
                curr.playerCity = true
            }
            if (!currAi.node.empty && currAi.claims.includes("city")) {
                if (neighbor.unjoined && !currAi.edgeIndices.includes(idx)) {
                    continue
                }
                curr.aiCity = true
            }
        }
        if (curr.playerCity && curr.aiCity && curr.emptyNeighbor) {
            arr.push(square)
        }
    }
    return arr 
}