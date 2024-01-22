import { Tile } from "@/lib/interfaces";
import { onPath } from "./onPath";
import { Square } from "../keys";

const weight: {[key: number]: number} = {
    2: 12, 
    3: 10
}

export function pathEval(path: Square[], node: Tile, end: Square, row: number, col: number): number {
    const len = path.length

    if (len === 1 || len > 3 || len === 0) {
        return 0
    }

    if (!onPath(node, end, row, col)) {
        return 0
    }

    return weight[len]
}