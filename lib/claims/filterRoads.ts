import { Tile, Claim, Land } from "../interfaces"
import { removeIdx } from "../helperFunctions"

export function filterRoads(board: Tile[][], claims: Claim, filteredClaims: Claim, territories: Land[][][], node: Tile, row: number, col: number, edges: string[], dir: number[][], joinMap: Map<number, number>) {
    if (!claims.road) {
        return 
    }
    for (let i = 0; i < edges.length; i++) {
        if (edges[i] !== "road") {
            continue
        }
        for (let j = 0; j < territories.length; j++) {
            const territory = territories[j]
            const x = dir[i][1]
            const y = dir[i][0]
            const neighbor = territory[row + y][col + x]
    
            if (neighbor.node.empty) {
                continue
            }
    
            if (!neighbor.claims.includes("road")) {
                continue
            }
            if (neighbor.node.village) {
                if (!neighbor.edgeIndices.length) {
                    continue
                }
                const idx = joinMap.get(i) as number
                if (!neighbor.edgeIndices.includes(idx)) {
                    continue
                }
            }
            const int = claims.road as number
            const val = filteredClaims.road as number
            claims.road = int - 1 
            filteredClaims.road = val + 1
    
            if (node.village) {
                removeIdx(claims.edgeIndices as number[], i)
                filteredClaims.edgeIndices?.push(i)
            }
            else return
        } 
    }
}