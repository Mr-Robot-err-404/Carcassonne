import { Claim, Curr, Neighbor, PlayerChain, ChainNode, Territory, Tile } from "../interfaces";
import { findChain, findKey, findNeighbor, isOverlap } from "../helperFunctions";
import { findNeighborNodes } from "../territory/neighbors";
import { joinCityChains } from "../claimFunctions";
import { createEmptyMatrix } from "../gridSetup";
import { walkCity } from "../walk/walkCity";
import { visitNodes } from "../chains/visitNodes";
import { appendLand } from "../territory/appendLand";
import { appendEnemyLand } from "../territory/appendEnemyLand";
import { sumMeeples } from "../chains/sumMeeples";
import { appendFinalChain } from "./finalChain";
import { appendUnjoinedCity } from "./unjoined";
import { sortChainIndices } from "../claims/sortIndices";

export function appendCities(board: Tile[][], map: any, claims: Claim, cityEdges: number[], node: Tile, row: number, col: number, dir: number[][], joinMap: Map<number, number>) {
    //Battle not with monsters, lest ye become a monster...
    //And if you gaze into the abyss, the abyss gazes also into you. 

    if (!claims.city) {
        return 
    }

    if (node.unjoined) {
        appendUnjoinedCity(board, map, claims, node, row, col, dir, joinMap)
        return 
    }

    const neighbors: Curr[] = []
    for (let i = 0; i < cityEdges.length; i++) {
        const idx = cityEdges[i]
        const x = dir[idx][1]
        const y = dir[idx][0]
        const neighbor = board[row + y][col + x]
        neighbors.push({
            node: neighbor, 
            idx: idx, 
            row: row + y, 
            col: col + x, 
            edgeIdx: joinMap.get(idx) as number
        })
    }

    const nodes: Neighbor[] = findNeighborNodes(board, map.player.territory, map.ai.territory, neighbors, "city")
    const unclaimed: number[] = [] 

    const arr = nodes.filter((curr: Neighbor) => {
        if (curr.str === "unclaimed") {
            unclaimed.push(curr.idx)
        }
        return curr.str !== "unclaimed" && curr.str !== "empty"
    })

    const chains: ChainNode[][] = []
    const playerChains: PlayerChain[] = []
    const aiChains: PlayerChain[] = []

    for (let i = 0; i < arr.length; i++) {
        const str = arr[i].str
        const idx = arr[i].idx
        const curr = findNeighbor(neighbors, idx) as Curr

        if (str !== "ai") {
            const [chainIdx] = findChain(map.player.chains, curr.node, "city")
            const chain: ChainNode[] = map.player.chains[chainIdx].chain

            if (chains.includes(chain)) {
                continue
            }
            playerChains.push({
                chain: chain, 
                node: curr.node,
                overlap: str === "overlap"
            })
            chains.push(chain)

            if (str === "overlap") {
                aiChains.push({
                    chain: chain, 
                    node: curr.node,
                    overlap: true
                })
            }
            continue
        }
        
        const [chainIdx] = findChain(map.ai.chains, curr.node, "city")
        const chain: ChainNode[] = map.ai.chains[chainIdx].chain

        if (chains.includes(chain)) {
            continue
        }
        aiChains.push({
            chain: chain, 
            node: curr.node, 
            overlap: false
        })
        chains.push(chain)
    }

    const mergedChain: ChainNode[] = joinCityChains(chains)
    const playerChainIndices: number[] = sortChainIndices(map, playerChains, "player")
    const aiChainIndices: number[] = sortChainIndices(map, aiChains, "ai")

    const key = findKey(nodes)
    const currChain: ChainNode[] = []

    const visited: boolean[][] = createEmptyMatrix()
    visited[row][col] = true
    visitNodes(mergedChain, visited)

    for (let i = 0; i < unclaimed.length; i++) {
        const idx = unclaimed[i]
        const curr = findNeighbor(neighbors, idx)

        walkCity(board, curr.node, currChain, visited, map[key].territory, joinMap, dir, curr.edgeIdx as number, curr.row, curr.col)
    }

    if (aiChains.length) {
        appendEnemyLand(playerChains, map.ai.territory, "city")
    }
    
    if (playerChains.length) {
        appendEnemyLand(aiChains, map.player.territory, "city")
    }

    if (isOverlap(nodes)) {
        currChain.forEach((curr: ChainNode) => appendLand(map.ai.territory, curr.node.row as number, curr.node.col as number, curr.node, "city"))
    }

    const [playerMeeples, aiMeeples] = sumMeeples(playerChainIndices, aiChainIndices, map)
    const finalChain: ChainNode[] = joinCityChains([mergedChain, currChain])

    playerChainIndices.forEach((idx: number) => map.player.chains.splice(idx, 1))
    aiChainIndices.forEach((idx: number) => map.ai.chains.splice(idx, 1))
    
    appendFinalChain(map, node, finalChain, playerChains, aiChains, playerMeeples, aiMeeples, "city")
}


