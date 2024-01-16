import { ChainNode, Claim, Land, PotentialClaim, Territory, Tile } from "../../interfaces";
import { claimFunction } from "../../territory/claimMap";
import { copy } from "../helper/copy";

export function selectClaims(board: Tile[][], currMap: Territory, node: Tile, row: number, col: number, claims: Claim, hero: string) {
    const keys = Object.keys(claims)
    const chains: PotentialClaim[] = []

    for (let i = 0; i < keys.length; i++) {
        const str = keys[i]
        if (str === "edgeIndices") {
            continue
        }
        if (claims[str] === 0) {
            continue
        }
        if ((node.unjoined && str === 'city') || (node.village && str === 'road')) {
            const edges = claims.edgeIndices as number[]

            for (let j = 0; j < edges?.length; j++) {
                const idx = edges[j]
                const map = copy(currMap)

                const createClaim = claimFunction[str]
                const [chain, matrix] = createClaim(board, node, row, col, map[hero].territory, idx)

                chains.push({
                    chain: chain, 
                    idx: idx, 
                    str: str, 
                    matrix: matrix, 
                    weight: 1
                })
            }
            continue
        }
        const map = copy(currMap)
        const createClaim = claimFunction[str]

        const [chain, matrix] = createClaim(board, node, row, col, map[hero].territory)
        chains.push({
            chain: chain, 
            str: str, 
            matrix: matrix, 
            weight: 1
        })
    }
    return chains
}