import { Tile, Claim, Land, Chain, Territory, Completed, Score } from "../interfaces"
import { findEdges, oppositeEdges } from "../helperFunctions"
import { appendCities } from "../dragons/cities"
import { appendRoads } from "../dragons/roads"
import { appendMonasteries } from "../dragons/monastery"
import { completedChains } from "../completed/main"
import { scorePoints } from "../completed/score"

export function appendClaims(board: Tile[][], filteredClaims: Claim, node: Tile, playerTerritory: Land[][], playerChains: Chain[], opponentTerritory: Land[][], opponentChains: Chain[], row: number, col: number): [Territory, Score] {
    const map: Territory = {
        player: {
            territory: [...playerTerritory], 
            chains: [...playerChains]
        }, 
        ai: {
            territory: [...opponentTerritory], 
            chains: [...opponentChains]
        }, 
    }

    const roadEdges = findEdges(node.edges, "road")
    const cityEdges = findEdges(node.edges, "city")
    const joinMap = oppositeEdges()
    const dir = [
        [-1, 0], 
        [0, 1], 
        [1, 0], 
        [0, -1]
    ]
    appendRoads(board, map, filteredClaims, roadEdges, node, row, col, dir, joinMap)
    appendCities(board, map, filteredClaims, cityEdges, node, row, col, dir, joinMap)
    appendMonasteries(board, map, row, col)

    const completed: Completed = completedChains(map, dir)
    const scores = scorePoints(completed, map)
    
    return [map, scores]
}