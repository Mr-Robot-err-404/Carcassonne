import { findEdges } from "@/lib/helperFunctions";
import { PotentialClaim, Tile } from "@/lib/interfaces";
import { squareEdges } from "./emptyEdges";
import { legalTiles } from "./legal";

const dir = [
    [-1, 0], 
    [0, 1], 
    [1, 0], 
    [0, -1]
]
const weightMap: {[key: number]: number} = {
    0: 0.2, 
    1: 0.3, 
    2: 0.8, 
}

export function claimEval(board: Tile[][], chains: PotentialClaim[] | undefined, node: Tile) {
    if (!chains) {
        return 
    }
    
    for (let i = 0; i < chains.length; i++) {
        const curr = chains[i]
        
        if (typeof curr.idx === 'number') {
            const x = dir[curr.idx][1]
            const y = dir[curr.idx][0]
            const row = node.row as number
            const col = node.col as number
            const neighbor = board[row + y][col + x]
 
            if (!neighbor.empty) {
                continue
            }
            const emptyEdges = squareEdges(board, row + y, col + x, dir, curr.idx, node.edges[curr.idx])
            const [count, moves] = legalTiles(emptyEdges)

            if (moves < 3) {
                const weight = weightMap[moves]
                curr.weight = weight
            }
            continue
        }
        const edges = findEdges(node.edges, curr.str)
        let minWeight = 1

        for (let j = 0; j < edges.length; j++) {
            const idx = edges[j]
            const x = dir[idx][1]
            const y = dir[idx][0]
            const row = node.row as number
            const col = node.col as number
            const neighbor = board[row + y][col + x]
 
            if (!neighbor.empty) {
                continue
            }
            const emptyEdges = squareEdges(board, row + y, col + x, dir, idx, node.edges[idx])
            const [count, moves] = legalTiles(emptyEdges)

            if (moves < 3) {
                const weight = weightMap[moves]
                if (weight < minWeight) {
                    minWeight = weight
                    curr.weight = weight
                }
            }
        }
    }
} 