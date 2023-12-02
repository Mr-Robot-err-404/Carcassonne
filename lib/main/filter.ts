import { Tile, Claim, Land } from "../interfaces"
import { oppositeEdges } from "../helperFunctions"
import { filterCities } from "../claims/filterCities"
import { filterRoads } from "../claims/filterRoads"

export function filterClaims(board: Tile[][], possibleClaims: Claim, node: Tile, playerTerritory: Land[][], aiTerritory: Land[][], row: number, col: number) {
    const claims = { ...possibleClaims }
    const filteredClaims: Claim = {city: 0, road: 0, edgeIndices: []}
    const territories = [playerTerritory, aiTerritory]
    const dir = [
        [-1, 0], 
        [0, 1], 
        [1, 0], 
        [0, -1]
    ]
    const joinMap = oppositeEdges()
    const edges = node.edges

    filterCities(board, claims, filteredClaims, territories, node, row, col, edges, dir, playerTerritory, joinMap)
    filterRoads(board, claims, filteredClaims, territories, node, row, col, edges, dir, joinMap)
    
    return [claims, filteredClaims]
}