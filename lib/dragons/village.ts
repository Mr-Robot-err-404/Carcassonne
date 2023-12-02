import { Claim, Tile, Chain, ChainNode } from "../interfaces"
import { neighborNodes } from "../helperFunctions"
import { findChain } from "../helperFunctions"
import { appendLand } from "../helperFunctions"


export function appendVillage(board: Tile[][], map: any, claims: Claim, node: Tile, dir: number[][], joinMap: Map<number, number>, row: number, col: number) {
    const arr = claims.edgeIndices as number[]

    for (let i = 0; i < arr.length; i++) {
        const idx = arr[i]
        const x = dir[idx][1]
        const y = dir[idx][0]
        const neighbor = {
            node: board[row + y][col + x], 
            idx: joinMap.get(idx) as number, 
            row: row + y, 
            col: col + x, 
            edgeIdx: idx
        }

        let overlap = false
        let str = neighborNodes(board, map.player.territory, map.ai.territory, [neighbor], "road").pop() as string

        if (str === "overlap") {
            str = "player"
            overlap = true
        }

        const chains: Chain[] = map[str].chains
        const [chainIdx] = findChain(chains, neighbor.node, "road")

        const chain: ChainNode[] = chains[chainIdx].chain
        
        if (chain[0].node.village) {
            chain.push({node: node, edgeIdx: idx})
        }
        else chain.unshift({ node: node, edgeIdx: idx })

        chains[chainIdx].chain = chain

        if (overlap) {
            appendLand(map.player.territory, row, col, node, "road", idx)
            appendLand(map.ai.territory, row, col, node, "road", idx)

            const [currIdx] = findChain(map.ai.chains, neighbor.node, "road")

            map.player.chains = chains
            map.ai.chains[currIdx].chain = chain
        }
        else {
            const matrix = map[str].territory
            appendLand(matrix, row, col, node, "road", idx)

            map[str].chains = chains
            map[str].territory = matrix 
        }
    }
}