import { PotentialClaim } from "@/lib/interfaces";

export function newClaim(claim: PotentialClaim, chains: PotentialClaim[], row: number, col: number, idx?: number) {

    for (let i = 0; i < chains.length; i++) {
        const curr = chains[i]

        if (curr.str !== "city") {
            continue
        }
        if (typeof idx === 'number' && curr.idx !== idx) {
            continue
        }
        return curr
    }
    
    return claim
}