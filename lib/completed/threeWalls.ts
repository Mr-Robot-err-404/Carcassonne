import { createEmptyMatrix } from "../gridSetup";
import { filterThreeWalls, findEdges } from "../helperFunctions";
import { ChainNode, Land } from "../interfaces";

export function threeWalls(chain: ChainNode[], territory: Land[][], dir: number[][]) {
    const arr = filterThreeWalls(chain)
    const visited: boolean[][] = createEmptyMatrix()

    for (let i = 0; i < arr.length; i++)  {
        const curr = arr[i]
        const row = curr.node.row as number
        const col = curr.node.col as number
        
        if (visited[row][col]) {
            continue
        }
        
        visited[row][col] = true
        const edges = findEdges(curr.node.edges, "city")

        for (let j = 0; j < edges.length; j++) {
            const idx = edges[j]
            const x = dir[idx][1]
            const y = dir[idx][0]
            const neighbor = territory[row + y][col + x]

            if (neighbor.node.empty) {
                return false 
            }
        }
    }
    return true 
}