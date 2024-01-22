import { Territory, Tile } from "@/lib/interfaces";
import { Square } from "./keys";
import { findEdges, oppositeEdges } from "@/lib/helperFunctions";
import { adjacentTerritory } from "./neighbors";

const heroMap: {[key: string]: string} = {
    "player": "ai", 
    "ai": "player"
}

const joinMap = oppositeEdges()
const dir = [
    [-1, 0], 
    [0, 1], 
    [1, 0], 
    [0, -1]
]

export function onPath(end: Square, map: Territory, row: number, col: number, node: Tile, hero: string) {
    const edges = findEdges(node.edges, "city")
    const enemy = heroMap[hero]

    for (let i = 0; i < edges.length; i++) {
        const idx = edges[i]
        const x = dir[idx][1]
        const y = dir[idx][0]

        const currRow = row + y
        const currCol = col + x

        if (adjacentTerritory(map, joinMap, idx, hero, enemy, currRow, currCol)) {
            return false
        }

        if (currRow === end.row && currCol === end.col) {
            return true
        }
    }
    return false
}