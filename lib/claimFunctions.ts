import { Claim, Tile, Land, Chain, Territory, ChainNode } from "./interfaces"
import { findChain, removeIdx } from "./helperFunctions"

export function filterCities(board: Tile[][], claims: Claim, filteredClaims: Claim, territories: Land[][][], node: Tile, row: number, col: number, edges: string[], dir: number[][], territory: Land[][], joinMap: Map<number, number>) {
    if (!claims.city) {
        return 
    }
    for (let i = 0; i < edges.length; i++) {
        if (edges[i] !== "city") {
            continue
        }
        for (let j = 0; j < territories.length; j++) {
            const territory = territories[j]
            const x = dir[i][1]
            const y = dir[i][0]
            const neighbor = territory[row + y][col + x]
    
            if (neighbor.node.empty) {
                continue
            }
    
            if (!neighbor.claims.includes("city")) {
                continue
            }
    
            if (neighbor.node.unjoined) {
                if (!neighbor.edgeIndices.length) {
                    continue
                }
                const idx = joinMap.get(i) as number
                if (!neighbor.edgeIndices.includes(idx)) {
                    continue
                }
            }
            const int = claims.city as number
            const val = filteredClaims.city as number
            claims.city = int - 1
            filteredClaims.city = val + 1
    
            if (node.unjoined) {
                removeIdx(claims.edgeIndices as number[], i)
                filteredClaims.edgeIndices?.push(i)
            }
            else return
        }
    }
}

export function filterRoads(board: Tile[][], claims: Claim, filteredClaims: Claim, territories: Land[][][], node: Tile, row: number, col: number, edges: string[], dir: number[][], joinMap: Map<number, number>) {
    if (!claims.road) {
        return 
    }
    for (let i = 0; i < edges.length; i++) {
        if (edges[i] !== "road") {
            continue
        }
        for (let j = 0; j < territories.length; j++) {
            const territory = territories[j]
            const x = dir[i][1]
            const y = dir[i][0]
            const neighbor = territory[row + y][col + x]
    
            if (neighbor.node.empty) {
                continue
            }
    
            if (!neighbor.claims.includes("road")) {
                continue
            }
            if (neighbor.node.village) {
                if (!neighbor.edgeIndices.length) {
                    continue
                }
                const idx = joinMap.get(i) as number
                if (!neighbor.edgeIndices.includes(idx)) {
                    continue
                }
            }
            const int = claims.road as number
            const val = filteredClaims.road as number
            claims.road = int - 1 
            filteredClaims.road = val + 1
    
            if (node.village) {
                removeIdx(claims.edgeIndices as number[], i)
                filteredClaims.edgeIndices?.push(i)
            }
            else return
        } 
    }
}

export function joinChains(chain1: ChainNode[], chain2: ChainNode[], node1: Tile, node2: Tile, joinNode: Tile): ChainNode[] {
    const mergedChain: ChainNode[] = []
    const end = chain1.length - 1

    if (chain1[end].node !== node1) {
        chain1.reverse()
    }
    if (chain2[0].node !== node2) {
        chain2.reverse()
    }

    chain1.push({node: joinNode})
    chain1.forEach((curr: ChainNode) => mergedChain.push({node: curr.node}))
    chain2.forEach((curr: ChainNode) => mergedChain.push({node: curr.node}))

    return mergedChain
}

export function joinCityChains(chains: ChainNode[][]) {
    const mergedChain = chains[0]
    for (let i = 1; i < chains.length; i++) {
        const currChain = chains[i]
        for (let j = 0; j < currChain.length; j++) {
            mergedChain.push(currChain[j])
        }
    }
    return mergedChain
}

export function sortChainIndices(map: any, arr: {chain: Tile[], node: Tile, overlap: boolean}[], str: string) {
    const indices: number[] = []

    for (let i = 0; i < arr.length; i++) {
       const [chainIdx] = findChain(map[str].chains, arr[i].node, "city")
       indices.push(chainIdx)
    }
    return indices.sort((a: number, b: number) => b - a)
}