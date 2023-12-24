import { findEdges } from "../helperFunctions";
import { ChainNode, Land } from "../interfaces";

export function emptyWalls(chain: ChainNode[], territory: Land[][], dir: number[][]) {
    const unjoined = filterUnjoined(chain)

    for (let i = 0; i < unjoined.length; i++) {
        const curr = unjoined[i]
        const idx = curr.edgeIdx as number
        const row = curr.node.row as number
        const col = curr.node.col as number
        const x = dir[idx][1]
        const y = dir[idx][0]
        const neighbor = territory[row + y][col + x]

        if (neighbor.node.empty) {
            return false 
        }
    }

    for (let i = 0; i < chain.length; i++) {
        const curr = chain[i]
        if (curr.node.unjoined) {
            continue
        }
        const row = curr.node.row as number
        const col = curr.node.col as number
        const edges = findEdges(curr.node.edges, "city")

        for (let j = 0; j < edges.length; j++) {
            const idx = edges[j]
            const x = dir[idx][1]
            const y = dir[idx][0]
            const neighbor = territory[row + y][col + x]
            if (neighbor.node.empty) {
                return false
            }
        }
    }
    return true 
}

function filterUnjoined(arr: ChainNode[]) {
    const res: ChainNode[] = []
    for (let i = 0; i < arr.length; i++) {
        const curr = arr[i]
        if (curr.node.unjoined) {
            res.push(curr)
        }
    }
    return res 
}