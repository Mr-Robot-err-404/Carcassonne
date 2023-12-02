import { Tile, Claim, Curr, Territory } from "../interfaces";
import { findNeighborNodes } from "../territory/neighbors";
import { findChain } from "../helperFunctions";
import { appendLand } from "../territory/appendLand";

export function appendUnjoinedCity(board: Tile[][], map: Territory, claims: Claim, node: Tile, row: number, col: number, dir: number[][], joinMap: Map<number, number>) {
    const edges = claims.edgeIndices as number[]

    for (let i = 0; i < edges.length; i++) {
        const idx = edges[i]
        const x = dir[idx][1]
        const y = dir[idx][0]
        const curr: Curr = {
            node: board[row + y][col + x], 
            idx: idx, 
            row: row + y, 
            col: col + x, 
            edgeIdx: joinMap.get(idx) as number
        }

        const str = findNeighborNodes(board, map.player.territory, map.ai.territory, [curr], "city").pop()?.str as string

        if (str !== "ai") {
            const [chainIdx] = findChain(map.player.chains, curr.node, "city")

            map.player.chains[chainIdx].chain.push({ node: node, edgeIdx: idx })
            appendLand(map.player.territory, row, col, node, "city", idx)

            if (str === "overlap") {
                const [chainIdx] = findChain(map.ai.chains, curr.node, "city")
                map.ai.chains[chainIdx].chain.push({ node: node, edgeIdx: idx })
                appendLand(map.ai.territory, row, col, node, "city", idx)
            }
        }
        else {
            const [chainIdx] = findChain(map.ai.chains, curr.node, "city")

            map.ai.chains[chainIdx].chain.push({ node: node, edgeIdx: idx })
            appendLand(map.ai.territory, row, col, node, "city", idx)
        }
    }
}