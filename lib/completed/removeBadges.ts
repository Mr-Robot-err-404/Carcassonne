import { Completed, Territory } from "../interfaces";

export function removeBadges(completed: Completed, map: Territory) {
    const arr = completed.player
    const arr2 = completed.ai

    for (let i = 0; i < arr.length; i++) {
        const idx = arr[i].idx
        const claim = arr[i].claim
        const chain = map.player.chains[idx].chain

        for (let j = 0; j < chain.length; j++) {
            const node = chain[j].node
            const edgeIdx = chain[j].edgeIdx

            if (node.claimed) {
                const row = node.row as number
                const col = node.col as number
                if (typeof edgeIdx === 'number') {
                    const idx = map.player.territory[row][col].claimedIdx
                    if (idx !== edgeIdx) {
                        continue
                    }
                }
                map.player.territory[row][col].complete.push(claim)
            }
        }
    }

    for (let i = 0; i < arr2.length; i++) {
        const idx = arr2[i].idx
        const claim = arr2[i].claim
        const chain = map.ai.chains[idx].chain

        for (let j = 0; j < chain.length; j++) {
            const node = chain[j].node
            const edgeIdx = chain[j].edgeIdx
            if (node.claimed) {
                const row = node.row as number
                const col = node.col as number
                if (typeof edgeIdx === 'number') {
                    const idx = map.ai.territory[row][col].claimedIdx
                    if (idx !== edgeIdx) {
                        continue
                    }
                }
                map.ai.territory[row][col].complete.push(claim)
            }
        }
    }
}