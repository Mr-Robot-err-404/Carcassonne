import { tileSet } from "@/lib/nodes";

export function legalTiles(edges: string[]) {
    let count = 0
    let moves = 0

    for (let i = 0; i < tileSet.length; i++) {
        const currEdges = tileSet[i].edges
        const num = tileSet[i].num

        for (let j = 0; j < 4; j++) {
            let legal = true

            for (let k = 0; k < edges.length; k++) {
                if (edges[k] === 'empty') {
                    continue
                }
                if (edges[k] !== currEdges[k]) {
                    legal = false
                    break
                }
            } 
            if (legal) {
                count++
                moves += num
                break
            }
            const end = currEdges.pop() as string
            currEdges.unshift(end)
        }
    }
    return [count, moves]
}