import { PlayerChain, Tile } from "../interfaces"
import { findChain } from "../chains/findChain"

export function sortChainIndices(map: any, arr: PlayerChain[], str: string) {
    const indices: number[] = []

    for (let i = 0; i < arr.length; i++) {
       const [chainIdx] = findChain(map[str].chains, arr[i].node, "city", arr[i].edgeIdx)
       indices.push(chainIdx)
    }
    return indices.sort((a: number, b: number) => b - a)
}