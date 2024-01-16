import { isTerritoryClaimed } from "../claims/isTerritoryClaimed";
import { Tile, Territory, Claim } from "../interfaces";
import { findChain } from "../chains/findChain";
import { appendLand } from "../helperFunctions";

export function appendMonasteries(board: Tile[][], map: Territory, row: number, col: number, node: Tile) {
    //Not all dragons breathe fire...
    const dir = [
        [-1, 0], 
        [0, 1], 
        [1, 0], 
        [0, -1], 
        [-1, -1], 
        [-1, 1], 
        [1, -1], 
        [1, 1]
    ]

    for (let i = 0; i < dir.length; i++) {
        const x = dir[i][0]
        const y = dir[i][1]
        const neighbor = board[row + y][col + x]

        if (neighbor.empty) {
            continue
        }

        if (!neighbor.monastery) {
            continue
        }

        if (!neighbor.claimed) {
            continue
        }

        if (isTerritoryClaimed(map.player.territory, neighbor, row + y, col + x, -1, "monastery")) {
            const [chainIdx] = findChain(map.player.chains, neighbor, "monastery")

            if (chainIdx >= 0) {
                map.player.chains[chainIdx].chain.push({ node: neighbor })
                appendLand(map.player.territory, row, col, node, "monastery")
            }
        }

        if (isTerritoryClaimed(map.ai.territory, neighbor, row + y, col + x, -1, "monastery")) {
            const [chainIdx] = findChain(map.ai.chains, neighbor, "monastery")
            
            if (chainIdx >= 0) {
                map.ai.chains[chainIdx].chain.push({ node: neighbor })
                appendLand(map.ai.territory, row, col, node, "monastery")
            }
        }
    }
}