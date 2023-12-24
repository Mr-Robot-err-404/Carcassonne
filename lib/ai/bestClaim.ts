import { Territory, Tile } from "../interfaces";
import { PotentialClaim } from "../interfaces";

export function bestClaim(chains: PotentialClaim[], map: Territory) {
    let len = 0
    let max

    for (let i = 0; i < chains.length; i++) {
        const curr = chains[i]
        if (curr.chain.length > len) {
            len = curr.chain.length
            max = curr
        } 
    }
    if (max) {
        map.ai.territory = max.matrix
    }
    return max 
}