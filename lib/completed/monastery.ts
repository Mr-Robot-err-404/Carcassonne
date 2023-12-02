import { ChainNode } from "../interfaces";

export function isMonasteryComplete(chain: ChainNode[]) {
    return chain.length === 9
}