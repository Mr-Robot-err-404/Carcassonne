import { ChainNode, Land } from "../interfaces";
import { findEdges} from "../helperFunctions";

export function isRoadLoop(chain: ChainNode[], matrix: Land[][], start: ChainNode, end: ChainNode): boolean {
    if (chain.length < 4) {
        return false 
    }

    const dir = [
        [-1, 0], 
        [0, 1], 
        [1, 0], 
        [0, -1]
    ]
    const edges = findEdges(start.node.edges, "road")
    const row = start.node.row as number
    const col = start.node.col as number

    if (start.node.village) {
        for (let i = 1; i < chain.length; i++) {
            const curr = chain[i]
            if (curr.node === start.node) {
                return true
            }
        }
        return false
    }

    for (let i = 0; i < edges.length; i++) {
        const idx = edges[i]
        const x = dir[idx][1]
        const y = dir[idx][0]
        const neighbor = matrix[row + y][col + x]

        if (neighbor.node === end.node) {
            return true
        }
    }
    return false 
}
