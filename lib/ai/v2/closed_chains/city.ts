import { findChain } from "@/lib/chains/findChain";
import { Claim, Territory, Tile } from "@/lib/interfaces";
import { getWallMap } from "./wallMap";

export function cityEval(map: Territory, claims: Claim, node: Tile, hero: string) {
    let currEval = 0

    if (node.unjoined) {
        const edges = claims.edgeIndices 
        
        if (!edges) {
            return currEval 
        }

        for (let i = 0; i < edges.length; i++) {
            const idx = edges[i]
            const [chainIdx] = findChain(map[hero].chains, node, "city", idx)

            if (chainIdx < 0) {
                return currEval 
            }
            const chain = map[hero].chains[chainIdx].chain

            if (chain.length < 2) {
                return currEval 
            } 
            const [wallMap, prevMap] = getWallMap(chain, node)
        
            const vertical = Math.abs(prevMap.top - prevMap.down)
            const horizontal = Math.abs(prevMap.right - prevMap.left)
            const currVertical = Math.abs(wallMap.top - wallMap.down)
            const currHorizontal = Math.abs(wallMap.right - wallMap.left)
        
            const diff = (vertical - currVertical) + (horizontal - currHorizontal)
        
            if (diff > 0) {
                currEval += diff
            }
        }
        return currEval
    }
    const [idx] = findChain(map[hero].chains, node, "city")

    if (idx < 0) {
        return currEval
    }
    const chain = map[hero].chains[idx].chain

    if (chain.length < 3) {
        return currEval
    } 
    const [wallMap, prevMap] = getWallMap(chain, node)

    const vertical = Math.abs(prevMap.top - prevMap.down)
    const horizontal = Math.abs(prevMap.right - prevMap.left)
    const currVertical = Math.abs(wallMap.top - wallMap.down)
    const currHorizontal = Math.abs(wallMap.right - wallMap.left)

    const diff = (vertical - currVertical) + (horizontal - currHorizontal)

    if (diff > 0) {
        currEval = diff
    }
    return currEval
}