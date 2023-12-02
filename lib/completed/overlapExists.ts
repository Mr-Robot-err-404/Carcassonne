import { ChainNode, Overlap } from "../interfaces";

export function overlapExists(chain: ChainNode[], overlap: Overlap[]) {
    for (let i = 0; i < overlap.length; i++) {
        const curr = overlap[i]
        if (curr.chain === chain) {
            return true
        }
    }
    return false
}