import { Chain, ChainNode } from "../interfaces";

export function isOverlap(arr: Chain[], target: ChainNode[]) {
    for (let i = 0; i < arr.length; i++) {
        const chain = arr[i].chain
        if (chain === target) {
            return true 
        }
    }
    return false 
}