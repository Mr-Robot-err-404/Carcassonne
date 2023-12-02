import { Tile, Land, ChainNode } from "../interfaces"
import { appendLand } from "../territory/appendLand"
import { isLoop, findOtherEdges } from "../helperFunctions"

export function walkRoad(board: Tile[][], currNode: Tile, chain: ChainNode[], matrix: Land[][], visited: boolean[][], edgeIdx: number, joinMap: Map<number, number>, dir: number[][], row: number, col: number, append: boolean) {
    // I walk a lonely road...
    if (currNode.empty) {
        return 
    }

    if (visited[row][col]) {
        return 
    }
    visited[row][col] = true 

    if (currNode.village) {
        if (append) {
            chain.push({ node: currNode, edgeIdx: edgeIdx })
        }
        else chain.unshift({ node: currNode, edgeIdx: edgeIdx })

        appendLand(matrix, row, col, currNode, "road", edgeIdx)
        return 
    }

    if (append) {
        chain.push({ node: currNode })
    }
    else chain.unshift({ node: currNode })
    appendLand(matrix, row, col, currNode, "road")
    
    if (currNode.village || currNode.monastery || currNode.deadEnd) {
        return 
    }

    const idx = findOtherEdges(currNode.edges, edgeIdx, "road") as number
    const x = dir[idx][1]
    const y = dir[idx][0]
    const neighbor = board[row + y][col + x]
    const nextIdx = joinMap.get(idx) as number

    walkRoad(board, neighbor, chain, matrix, visited, nextIdx, joinMap, dir, row + y, col + x, append)
}