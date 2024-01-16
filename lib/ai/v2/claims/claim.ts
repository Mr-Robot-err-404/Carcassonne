import { findEdges, oppositeEdges } from "@/lib/helperFunctions"
import { PotentialClaim, Territory, Tile } from "@/lib/interfaces"
import { findClaimIdx } from "../../helper/claimIdx"
import { reselectClaim } from "./reselect"

const dir = [
    [-1, 0], 
    [0, 1], 
    [1, 0], 
    [0, -1]
]
const joinMap = oppositeEdges()

export function bestClaimV2(chains: PotentialClaim[], map: Territory, board: Tile[][], node: Tile, hero: string, meeples: number, row: number, col: number) {
    let len = 0
    let base = 0.9
    let max = undefined

    for (let i = 0; i < chains.length; i++) {
        const curr = chains[i]

        if (curr.chain.length > len) {
            let currEval = curr.chain.length * curr.weight

            if (meeples < 3 && curr.str === 'road') {
                continue
            }

            if(currEval < base) {
                continue
            }
            len = curr.chain.length
            max = curr
        } 
    }

    if (node.village && max && max.chain.length === 1 && max.str === 'road') {
        const neighborWeight: {[key: number]: number} = {
            0: 1.5, 
            1: 1, 
            2: 0.7, 
            3: 0.5, 
        }
        const edges = findEdges(node.edges, "road")
        
        for (let i = 0; i < edges.length; i++) {
            const idx = edges[i]
            const x = dir[idx][1]
            const y = dir[idx][0]
            const currRow = row + y
            const currCol = col + x
            const neighbor = board[currRow][currCol]
            
            if (!neighbor.empty) {
                continue
            }
            let neighbors = 0
            const currIdx = joinMap.get(idx) 

            for (let j = 0; j < 4; j++) {
                if (j === currIdx) {
                    continue
                }
                const x = dir[j][1]
                const y = dir[j][0]
                const neighbor = board[currRow + y][currCol + x]

                if (!neighbor.empty) {
                    neighbors++
                }
            }
            const claimIdx = findClaimIdx(chains, idx)
            chains[claimIdx].weight = neighborWeight[neighbors]
        }
        max = reselectClaim(chains)
    }

    if (max) {
        map[hero].territory = max.matrix
    }
    return max 
}