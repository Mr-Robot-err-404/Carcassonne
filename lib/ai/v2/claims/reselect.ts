import { PotentialClaim } from "@/lib/interfaces";

export function reselectClaim(chains: PotentialClaim[]) {
    let claim = undefined
    let base = 0.9
    let max = -Infinity

    for (let i = 0; i < chains.length; i++) {
        const curr = chains[i]

        if (curr.str !== 'road') {
            continue
        }
        if (curr.weight < base) {
            continue
        }
        if (curr.weight > max) {
            max = curr.weight
            claim = curr
        }
    }
    return claim
}