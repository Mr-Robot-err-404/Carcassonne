import { Tile } from "../interfaces"

export function joinCityChains(chains: Tile[][]) {
    const mergedChain = chains[0]
    for (let i = 1; i < chains.length; i++) {
        const currChain = chains[i]
        for (let j = 0; j < currChain.length; j++) {
            mergedChain.push(currChain[j])
        }
    }
    return mergedChain
}