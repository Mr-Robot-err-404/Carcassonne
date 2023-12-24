import { ChainNode, Land } from "../interfaces";
import { isDeadend } from "./deadend";
import { isRoadClosed } from "./empty";
import { isRoadLoop } from "./loop";

export function isRoadComplete(chain: ChainNode[], matrix: Land[][], dir: number[][]) {
    const start = chain[0]
    const end = chain[chain.length - 1]

    if (chain.length < 2) {
        return false
    }

    if (start.node === end.node) {
        return true
    }
    
    if (isDeadend(chain)) {
        return true
    }

    if (isRoadLoop(chain)) {
        return true 
    }
    
    if (isRoadClosed(chain, matrix, dir)) {
        return true
    }
    return false
}