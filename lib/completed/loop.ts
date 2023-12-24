import { ChainNode, Land } from "../interfaces";

export function isRoadLoop(chain: ChainNode[]): boolean {
    if (chain.length < 4) {
        return false 
    }
    const set = new Set()

    for (let i = 0; i < chain.length; i++) {
        const curr = JSON.stringify(chain[i])
        if (set.has(curr)) {
            return true
        }
        set.add(curr)
    }
    return false 
}
