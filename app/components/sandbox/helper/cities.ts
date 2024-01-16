import { Tile } from "@/lib/interfaces";

export function fetchCities(tiles: Tile[]) {
    const arr = []
    const seen: string[][] = []

    for (let i = 0; i < tiles.length; i++) {
        const edges = tiles[i].edges

        if (!edges.includes("city")) {
            continue
        }

        if (yoink(edges, seen)) {
            continue
        }
        arr.push(tiles[i])
        seen.push(edges)
    }
    return arr
}

function yoink(edges: string[], arr: string[][]): boolean {
    for (let i = 0; i < arr.length; i++) {
        const curr = arr[i]
        let bool = true

        for (let j = 0; j < curr.length; j++) {
            if (curr[j] !== edges[j]) {
                bool = false
            }
        }
        if (bool) {
            return true
        }
    }
    return false
}