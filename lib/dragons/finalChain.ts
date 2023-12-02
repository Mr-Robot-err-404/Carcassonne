import { PlayerChain, ChainNode, Territory, Tile } from "../interfaces";
import { appendLand } from "../territory/appendLand";

export function appendFinalChain(map: Territory, node: Tile, finalChain: ChainNode[], playerChain: PlayerChain[], aiChain: PlayerChain[], playerMeeples: number, aiMeeples: number, claim: string) {
    const row = node.row as number
    const col = node.col as number

    finalChain.push({node: node})
    
    if (playerChain.length) {
        map.player.chains.push({
            chain: finalChain, 
            meeples: playerMeeples, 
            claim: claim
        })
        appendLand(map.player.territory, row, col, node, "city")
    }
    if (aiChain.length) {
        map.ai.chains.push({
            chain: finalChain, 
            meeples: aiMeeples, 
            claim: claim
        })
        appendLand(map.ai.territory, row, col, node, "city")
    }
}  