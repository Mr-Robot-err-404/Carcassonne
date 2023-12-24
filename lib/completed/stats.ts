import { copy } from "../ai/copy";
import { findChain } from "../chains/findChain";
import { Completed, Overview, Territory } from "../interfaces";

export function appendStats(overview: Overview, completed: Completed, map: Territory) {
    const stats: Overview = copy(overview)
    const statsMap: {[key: string]: string} = {
        "city": "maxCity",
        "road": "maxRoad"
    }
    const keys = Object.keys(completed)

    for (let i = 0; i < keys.length; i++) {
        const key = keys[i]
        const arr = completed[key]
        for (let j = 0; j < arr.length; j++) {
            const claim = arr[j].claim
            stats[key][claim]++

            if (claim === "monastery") {
                continue
            }
            const idx = arr[j].idx
            const chain = map[key].chains[idx].chain
            const maxKey = statsMap[claim]
            const max = overview[key][maxKey]

            if (chain.length > max) {
                stats[key][maxKey] = chain.length
            }
        }
    }
    return stats
}