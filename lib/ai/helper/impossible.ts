import { Tile } from "@/lib/interfaces"
import { copy } from "./copy"
import { rotateNode } from "./rotate"
import { isMoveLegal } from "@/lib/main/legal"

interface Props {
    row: number
    col: number
}

export function isMoveImpossible(board: Tile[][], tile: Tile, tiles: Props[]) {
    let rotate = 0
    for (let i = 0; i < 4; i++) {
        const node = copy(tile)
        rotateNode(node, rotate)

        for (let j = 0; j < tiles.length; j++) {
            if (isMoveLegal(board, node, tiles[j].row, tiles[j].col)) {
                return false
            }
        }
        rotate += 90
    }
    return true
}