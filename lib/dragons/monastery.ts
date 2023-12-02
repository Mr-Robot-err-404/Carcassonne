import { isTerritoryClaimed } from "../claims/isTerritoryClaimed";
import { findChain } from "../helperFunctions";
import { Tile, Territory } from "../interfaces";

export function appendMonasteries(board: Tile[][], map: Territory, row: number, col: number) {
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
        
        if (isTerritoryClaimed(map.player.territory, neighbor, row + y, col + x, -1, "monastery")) {
            const [chainIdx] = findChain(map.player.chains, neighbor, "monastery")
            map.player.chains[chainIdx].chain.push({ node: neighbor })
        }

        else if (isTerritoryClaimed(map.ai.territory, neighbor, row + y, col + x, -1, "monastery")) {
            const [chainIdx] = findChain(map.ai.chains, neighbor, "monastery")
            map.ai.chains[chainIdx].chain.push({node: neighbor})
        }
    }
}