import { PotentialClaim } from "@/lib/interfaces";

export function findClaimIdx(chains: PotentialClaim[], idx: number) {
    for (let i = 0; i < chains.length; i++) {
        if (chains[i].idx === idx) {
            return i
        }
    }
    return -1
}