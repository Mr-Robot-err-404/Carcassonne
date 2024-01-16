import { Tile } from "@/lib/interfaces";
import { onPath } from "./onPath";
import { Square } from "../keys";

const weight: {[key: number]: number} = {
    2: 12, 
    3: 10
}

export function pathEval(path: Square[], node: Tile): number {
    const len = path.length

    if (len === 1 || len > 3 || len === 0) {
        return 0
    }
    const next = path[1]

    if (!onPath(node, next)) {
        return 0
    }

    return weight[len]
}