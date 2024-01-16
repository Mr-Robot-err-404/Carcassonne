import { Square } from "../v2/board_vision/keys";

export function endpoint(path: Square[], end: Square) {
    for (let i = 0; i < path.length; i++) {
        const curr = path[i]
        if (curr.row === end.row && curr.col === end.col) {
            return true
        }
    }
    return false
}