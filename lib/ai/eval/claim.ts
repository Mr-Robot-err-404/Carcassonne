import { Territory } from "../../interfaces";
import { PotentialClaim } from "../../interfaces";

export function bestClaim(chains: PotentialClaim[], map: Territory, hero: string) {
    let len = 0
    let max
    let base = 0.9

    for (let i = 0; i < chains.length; i++) {
        const curr = chains[i]

        if (curr.chain.length > len) {
            let currEval = curr.chain.length * curr.weight

            if(currEval < base) {
                continue
            }
            len = curr.chain.length
            max = curr
        } 
    }
    if (max) {
        map[hero].territory = max.matrix
    }
    return max 
}