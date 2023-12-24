import { appendLand } from "../helperFunctions";
import { Land, PlayerChain } from "../interfaces";

export function appendEnemyLand(currChain: PlayerChain[], matrix: Land[][], claim: string) {
    for (let i = 0; i < currChain.length; i++) {
        const curr = currChain[i]

        if (curr.overlap) {
            continue
        }
        const chain = curr.chain

        for (let j = 0; j < chain.length; j++) {
            const node = chain[j].node
            const idx = chain[j].edgeIdx
            const row = node.row as number
            const col = node.col as number
            appendLand(matrix, row, col, node, claim, idx)
        }
    }
}