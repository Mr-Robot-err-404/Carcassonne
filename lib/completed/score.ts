import { isOverlap } from "../chains/overlap";
import { Completed, Overlap, Territory } from "../interfaces";
import { overlapExists } from "./overlapExists";
import { removeOverlap } from "./removeOverlap";
import { sumPoints } from "./sumPoints";

export function scorePoints(completed: Completed, map: Territory) {
    const overlap: Overlap[] = []
    const scores = {
        player: 0, 
        ai: 0
    }
    const arr = completed.player
    const arr2 = completed.ai

    for (let i = 0; i < arr.length; i++) {
        const curr = arr[i]
        const idx = curr.idx
        const chain = map.player.chains[idx].chain

        if (isOverlap(map.ai.chains, chain)) {
            const meeples = removeOverlap(completed, map, chain)
            
            overlap.push({
                chain: chain, 
                playerMeeples: map.player.chains[idx].meeples, 
                aiMeeples: meeples, 
                claim: curr.claim
            })
            continue
        }
        const sum = sumPoints(chain, curr.claim)
        scores.player += sum
    }

    for (let i = 0; i < arr2.length; i++) {
        const curr = arr2[i]
        const idx = curr.idx
        const chain = map.ai.chains[idx].chain

        if (overlapExists(chain, overlap)) {
            continue
        }

        const sum = sumPoints(chain, curr.claim)
        scores.ai += sum 
    }

    for (let i = 0; i < overlap.length; i++) {
        const curr = overlap[i]
        const chain = curr.chain
        const playerMeeples = curr.playerMeeples
        const aiMeeples = curr.aiMeeples

        const sum = sumPoints(chain, curr.claim)

        if (playerMeeples > aiMeeples) {
            scores.player += sum 
            continue
        }
        else if (aiMeeples > playerMeeples) {
            scores.ai += sum
            continue
        }
        const half = Math.floor(sum / 2)
        scores.player += half
        scores.ai += half
    }

    arr.forEach((curr: {idx: number, claim: string}) => map.player.chains.splice(curr.idx, 1))
    arr2.forEach((curr: {idx: number, claim: string}) => map.ai.chains.splice(curr.idx, 1))

    return scores 
}