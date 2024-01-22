import { Tile } from "@/lib/interfaces";
import { Square } from "../keys";
import { findEdges } from "@/lib/helperFunctions";

const dir = [
    [-1, 0], 
    [0, 1], 
    [1, 0], 
    [0, -1]
]

export function onPath(node: Tile, end: Square, row: number, col: number): boolean {
    const edges = findEdges(node.edges, "city")

    for (let i = 0; i < edges.length; i++) {
        const idx = edges[i]
        const x = dir[idx][1]
        const y = dir[idx][0]

        const gapX = Math.abs(end.col - col)
        const gapY = Math.abs(end.row - row)
        const currGapX = Math.abs(end.col - (col + x))
        const currGapY = Math.abs(end.row - (row + y))

        if (currGapX < gapX || currGapY < gapY) {
            return true
        }
    } 
    return false
}