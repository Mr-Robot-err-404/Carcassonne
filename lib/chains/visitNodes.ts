import { ChainNode } from "../interfaces";

export function visitNodes(mergedChain: ChainNode[], visited: boolean[][], claim?: string) {
    for (let i = 0; i < mergedChain.length; i++) {
        const curr = mergedChain[i]
        if (curr.node.village && claim !== "city") {
            continue 
        }
        const row = curr.node.row as number
        const col = curr.node.col as number 
        visited[row][col] = true
    }
}   