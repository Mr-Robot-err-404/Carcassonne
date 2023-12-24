import { Completed, Meeple, Territory } from "../interfaces";

export function countMeeples(completed: Completed, map: Territory) {
    const meeples: Meeple = {
        player: 0, 
        ai: 0
    }
    const keys = Object.keys(completed)

    for (let i = 0; i < keys.length; i++) {
        const str = keys[i]
        const arr = completed[str]

        for (let j = 0; j < arr.length; j++) {
            const idx = completed[str][j].idx
            const chain = map[str].chains[idx]
            const int = chain.meeples
            meeples[str] += int
        }
    }
    return meeples
}