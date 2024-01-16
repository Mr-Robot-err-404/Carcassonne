import { Tile } from "@/lib/interfaces";
import { Square } from "../keys";
import { createEmptyMatrix } from "@/lib/gridSetup";
import { walk } from "./walk";

const dir = [
    [-1, 0], 
    [0, 1], 
    [1, 0], 
    [0, -1]
]

export function shortestPath(board: Tile[][], end: Square, row: number, col: number, node: Tile): Square[] {
    if (end.row < 0 || end.col < 0) {
        return []
    } 
    const visited: boolean[][] = createEmptyMatrix()
    const path: Square[] = []
    const gapX = Math.abs(end.col - col)
    const gapY = Math.abs(end.row - row)
    const currGap = {
        x: gapX, 
        y: gapY
    }
    const start = {
        row: row,
        col: col
    }

    walk(board, path, visited, end, start, row, col, dir, currGap)
    return path
}