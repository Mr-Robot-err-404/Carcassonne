import { Completed, Territory } from "../interfaces";

export function leftoverChains(map: Territory) {
    const leftover: Completed = {
        player: [], 
        ai: []
    }
    const arr = map.player.chains
    const arr2 = map.ai.chains

    for (let i = 0; i < arr.length; i++) {
        leftover.player.push({
            idx: i, 
            claim: arr[i].claim
        })
    }
    for (let i = 0; i < arr2.length; i++) {
        leftover.ai.push({
            idx: i, 
            claim: arr2[i].claim
        })
    }
    return leftover
}