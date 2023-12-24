import { ChainNode, Overlap } from "../interfaces";

export function overlapExists(chain: ChainNode[], overlap: Overlap[]) {
    for (let i = 0; i < overlap.length; i++) {
        const curr = overlap[i]
        const str = JSON.stringify(curr.chain)
        const str2 = JSON.stringify(chain)

        if (str === str2) {
            return true
        }
    }
    return false
}