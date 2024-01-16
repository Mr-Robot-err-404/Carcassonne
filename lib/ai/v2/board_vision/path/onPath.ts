import { Tile } from "@/lib/interfaces";
import { Square } from "../keys";

const dir = [
    [-1, 0], 
    [0, 1], 
    [1, 0], 
    [0, -1]
]

export function onPath(node: Tile, next: Square): boolean {
    const edges = node.edges
    
    for (let i = 0; i < dir.length; i++) {
        if (edges[i] !== "city") {
            continue
        }
        const row = node.row as number
        const col = node.col as number
        const x = dir[i][1]
        const y = dir[i][0]

        const curr = {
            row: row + y, 
            col: col + x
        }
        if (curr.row === next.row && curr.col === next.col) {
            return true
        }
    } 
    return false
}