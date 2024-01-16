import { isTerritoryClaimed } from "@/lib/claims/isTerritoryClaimed";
import { Claim, Territory, Tile } from "@/lib/interfaces";
import { cityEval } from "./city";
import { roadEval } from "./road";
import { findChain } from "@/lib/chains/findChain";

export function closedChains(map: Territory, node: Tile, row: number, col: number, filteredClaims: Claim, hero: string) {
    const arr = Object.keys(filteredClaims)
    let currEval = 0

    for (let i = 0; i < arr.length; i++) {
        const key = arr[i]
        
        if (key === 'edgeIndices') {
            continue
        }
 
        if (key === 'city') {
            currEval += cityEval(map, filteredClaims, node, hero)
        }

        if (key === 'road') {
            currEval += roadEval(map, filteredClaims, node, hero)
        }
        
        if (key === 'monastery') {
            const [idx] = findChain(map[hero].chains, node, "monastery")
            
            if (idx < 0) {
                continue
            }
            const chain = map[hero].chains[idx].chain

            if (chain.length > 6) {
                currEval++
            }
        }
    }
    return currEval
}