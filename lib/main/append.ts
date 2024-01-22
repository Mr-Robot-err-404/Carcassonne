import { Tile, Claim, Territory, Completed, Score, Overview, Meeple } from "../interfaces"
import { findEdges, oppositeEdges } from "../helperFunctions"
import { appendCities } from "../dragons/cities"
import { appendRoads } from "../dragons/roads"
import { appendMonasteries } from "../dragons/monastery"
import { completedChains } from "../completed/main"
import { scorePoints } from "../completed/score"
import { appendStats } from "../completed/stats"
import { countMeeples } from "../completed/meeples"
import { removeBadges } from "../completed/removeBadges"

export function appendClaims(board: Tile[][], filteredClaims: Claim, node: Tile, map: Territory, row: number, col: number, overview: Overview): [Score, Overview, Meeple] {
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
    appendMonasteries(board, map, row, col, node)

    const completed: Completed = completedChains(map, dir)
    removeBadges(completed, map)

    const stats = appendStats(overview, completed, map)
    const meeples = countMeeples(completed, map)
    const scores = scorePoints(completed, map, stats)

    return [scores, stats, meeples]
}