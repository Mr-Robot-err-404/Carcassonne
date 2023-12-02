import { Territory } from "../interfaces";

export function sumMeeples(playerChainIndices: number[], aiChainIndices: number[], map: Territory) {
    let playerMeeples = 0
    let aiMeeples = 0

    for (let i = 0; i < playerChainIndices.length; i++) {
        const idx = playerChainIndices[i]
        playerMeeples += map.player.chains[idx].meeples
    }
    for (let i = 0; i < aiChainIndices.length; i++) {
        const idx = aiChainIndices[i]
        aiMeeples += map.ai.chains[idx].meeples
    }

    return [playerMeeples, aiMeeples]
}