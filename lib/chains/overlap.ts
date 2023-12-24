import { Chain, ChainNode } from "../interfaces";

export function isOverlap(arr: Chain[], target: ChainNode[]) {
    for (let i = 0; i < arr.length; i++) {
        const chain = arr[i].chain
        const str = JSON.stringify(chain)
        const str2 = JSON.stringify(target)

        if (str === str2) {
            return true 
        }
    }
    return false 
}