import { ChainNode, Tile } from "../interfaces";

export function findChainNode(chain: ChainNode[], target: Tile) {
    for (let i = 0; i < chain.length; i++) {
        const curr = chain[i]
        if (curr.node === target) {
            return curr 
        }
    }
    return { node: target }
}