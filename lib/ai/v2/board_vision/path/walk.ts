import { Tile } from "@/lib/interfaces";
import { Square } from "../keys";

interface Gap {
    x: number, 
    y: number
}

export function walk(board: Tile[][], path: Square[], visited: boolean[][], end: Square, curr: Square, row: number, col: number, dir: number[][], prevGap: Gap) {
    if (!board[row][col].empty) {
        return false
    }
    
    if (visited[row][col]) {
        return false
    }
    const gapX = Math.abs(end.col - col)
    const gapY = Math.abs(end.row - row)

    if (gapX > prevGap.x || gapY > prevGap.y) {
        return false 
    }

    if (curr.row === end.row && curr.col === end.col) {
        path.push(curr)
        return true
    }

    path.push(curr)
    visited[row][col] = true

    for (let i = 0; i < 4; i++) {
        const x = dir[i][1]
        const y = dir[i][0]
        const neighbor = {
            row: row + y, 
            col: col + x
        }
        const currGap = {
            x: gapX, 
            y: gapY
        }
        
        walk(board, path, visited, end, neighbor, row + y, col + x, dir, currGap)
    }
    return false
}