import { oppositeEdges } from "@/lib/helperFunctions";
import { Tile } from "@/lib/interfaces";

export function squareEdges(board: Tile[][], row: number, col: number, dir: number[][], idx: number, edge: string) {
    const edges = []
    const joinMap = oppositeEdges()
    
    for (let i = 0; i < 4; i++) {
        if (i === idx) {
            edges.push(edge)
            continue
        }
        const x = dir[i][1]
        const y = dir[i][0]
        const neighbor = board[row + y][col + x]

        if (neighbor.empty) {
            edges.push("empty")
            continue
        }
        const currIdx = joinMap.get(i) as number
        const currEdge = neighbor.edges[currIdx]
        edges.push(currEdge)
    }
    return edges
}