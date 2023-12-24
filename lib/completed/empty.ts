import { ChainNode, Land } from "../interfaces";
import { findEdges } from "../helperFunctions";


function filterVillages(arr: ChainNode[]) {
    const res: ChainNode[] = []
    for (let i = 0; i < arr.length; i++) {
        const curr = arr[i]
        if (curr.node.village) {
            res.push(curr)
        }
    }
    return res 
}

export function isRoadClosed(chain: ChainNode[], territory: Land[][], dir: number[][]) {
    const villages = filterVillages(chain)

    for (let i = 0; i < villages.length; i++) {
        const curr = villages[i]
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
        if (curr.node.village) {
            continue
        }
        const row = curr.node.row as number
        const col = curr.node.col as number
        const edges = findEdges(curr.node.edges, "road")

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
