import { ChainNode, Land } from "../interfaces";
import { isRoadLoop } from "./loop";

export function isRoadComplete(chain: ChainNode[], matrix: Land[][]) {
    const start = chain[0]
    const end = chain[chain.length - 1]

    if (start.node === end.node) {
        return true
    }

    if (isRoadLoop(chain, matrix, start, end)) {
        return true 
    }

    if (!start.node.village && !start.node.deadEnd) {
        return false
    }

    if (!end.node.village && !end.node.deadEnd) {
        return false 
    }
    return true
}