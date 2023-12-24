import { ChainNode } from "../interfaces";

export function isDeadend(chain: ChainNode[]) {
    let idx = 0
    let node = undefined

    for (let i = 0; i < chain.length; i++) {
        const curr = chain[i].node
        if (curr.village || curr.deadEnd || curr.monastery) {
            node = curr
            idx = i
            break
        }
    }

    if (!node) {
        return false 
    }

    for (let i = idx + 1; i < chain.length; i++) {
        const curr = chain[i].node
        if (curr.village || curr.deadEnd || curr.monastery) {
            return true
        }
    }
    return false
}