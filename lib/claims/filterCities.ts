import { Tile, Claim, Land } from "../interfaces"
import { removeIdx } from "../helperFunctions"

export function filterCities(board: Tile[][], claims: Claim, filteredClaims: Claim, territories: Land[][][], node: Tile, row: number, col: number, edges: string[], dir: number[][], territory: Land[][], joinMap: Map<number, number>) {
    if (!claims.city) {
        return 
    }
    const set = new Set()

    for (let i = 0; i < edges.length; i++) {
        if (edges[i] !== "city") {
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
    
            if (!neighbor.claims.includes("city")) {
                continue
            }
    
            if (neighbor.node.unjoined) {
                if (!neighbor.edgeIndices.length) {
                    continue
                }
                const idx = joinMap.get(i) as number
                if (!neighbor.edgeIndices.includes(idx)) {
                    continue
                }
            }
            if (node.unjoined && set.has(i)) {
                continue
            }

            const int = claims.city as number
            const val = filteredClaims.city as number
            claims.city = int - 1
            filteredClaims.city = val + 1
    
            if (node.unjoined) {
                set.add(i)
                removeIdx(claims.edgeIndices as number[], i)
                filteredClaims.edgeIndices?.push(i)
            }
            else return
        }
    }
}