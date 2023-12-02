import { PlayerChain, Tile } from "../interfaces"
import { findChain } from "../helperFunctions"

export function sortChainIndices(map: any, arr: PlayerChain[], str: string) {
    const indices: number[] = []

    for (let i = 0; i < arr.length; i++) {
       const [chainIdx] = findChain(map[str].chains, arr[i].node, "city")
       indices.push(chainIdx)
    }
    return indices.sort((a: number, b: number) => b - a)
}