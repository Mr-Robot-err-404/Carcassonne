import { shortestPath } from "./path/path"
import { endpoint } from "../../helper/end"
import { conquered } from "./conquered"
import { pathEval } from "./path/eval"
import { Square } from "./keys"
import { Territory, Tile } from "@/lib/interfaces"
import { onPath } from "./onPath"

export function heistEval(end: Square, square: Square, board: Tile[][], map: Territory, node: Tile, hero: string): number {

    if (end.row < 0 || end.col < 0) {
        return 0
    }
    
    if (conquered(map, board, node, square.row, square.col, hero)) {
        return 20
    }
    
    if (board[end.row][end.col].target) {
        return 0
    }

    if (onPath(end, map, square.row, square.col, node, hero)) {
        return 10
    }
    
    return 0
}