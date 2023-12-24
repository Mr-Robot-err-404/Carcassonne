import { ChainNode, Completed, Territory } from "../interfaces";

export function removeOverlap(completed: Completed, map: Territory, chain: ChainNode[]): number {
    const arr = completed.ai
    for (let i = 0; i < arr.length; i++) {
        const curr = arr[i]
        const currChain = map.ai.chains[curr.idx].chain

        const str = JSON.stringify(currChain)
        const str2 = JSON.stringify(chain)

        if (str === str2) {
            return map.ai.chains[curr.idx].meeples
        }
    }
    return 0
}