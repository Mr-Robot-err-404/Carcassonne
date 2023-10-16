import { createEmptyMatrix, shuffleStack } from "./gridSetup"
import { appendLand, dirMap, edgeIdxArr, filterCities, filterRoads, findChain, findEdges, findOtherEdges, isLoop, isTerritoryClaimed, joinChains, landChain, oppositeEdges, removeIdx } from "./helperFunctions"
import { Claim, Land, Tile } from "./interfaces"

export function isMoveLegal(board: Tile[][], node: Tile, row: number, col: number) {
    const dir = [
        [-1, 0], 
        [0, 1], 
        [1, 0], 
        [0, -1]
    ]
    const edgeIndices = [2, 3, 0, 1]
    const edges: string[] = node.edges

    for (let i = 0; i < edges.length; i++) {
        const x = dir[i][1]
        const y = dir[i][0]
        const neighbor: Tile = board[row + y][col + x]

        if (neighbor.empty) {
            continue
        }
        const idx = edgeIndices[i]

        if (edges[i] !== neighbor.edges[idx]) {
            return false
        }
    }
    return true
}

export function claimMonastery(board: Tile[][], node: Tile, row: number, col: number, territory: Land[][]) {
    const matrix = territory.map((row: Land[]) => [...row])
    const dir = [
        [-1, 0], 
        [0, 1], 
        [1, 0], 
        [0, -1], 
        [-1, -1], 
        [-1, 1], 
        [1, -1], 
        [1, 1]
    ]
    const chain = [node]
    appendLand(matrix, row, col, node, "monastery")
    
    for (let i = 0; i < dir.length; i++) {
        const x = dir[i][1]
        const y = dir[i][0]
        const neighbor = board[row + y][col + x]
        if (neighbor.empty) {
            continue
        }
        chain.push(neighbor)
        appendLand(matrix, row, col, neighbor, "monastery")
    }
    return chain
}

export function claimCity(board: Tile[][], node: Tile, row: number, col: number, territory: Land[][], singleEdge?: string) {
    const map = dirMap(node, "city", singleEdge)
    const arr: string[] = Object.keys(map)
    const joinMap: Map<number, number> = oppositeEdges()
    const matrix: Land[][] = [...territory]

    const dir = [
        [-1, 0], 
        [0, 1], 
        [1, 0], 
        [0, -1]
    ]
    const chain: Tile[] = [node]
    const visited: boolean[][] = createEmptyMatrix()
    visited[row][col] = true
    
    if (singleEdge) {
        appendLand(matrix, row, col, node, "city", parseInt(arr[0]))
    }
    else {
        appendLand(matrix, row, col, node, "city")
    }

    for (let i = 0; i < arr.length; i++) {
        const idx = parseInt(arr[i])
        const x = dir[idx][1]
        const y = dir[idx][0]
        const neighbor = board[row + y][col + x]
        const edgeIdx = joinMap.get(idx) as number

        walkCity(board, neighbor, chain, visited, matrix, joinMap, dir, edgeIdx, row + y, col + x)
    }
    return [chain, matrix]
}

function walkCity(board: Tile[][], currNode: Tile, chain: Tile[], visited: boolean[][], matrix: Land[][], joinMap: Map<number, number>, dir: number[][], edgeIdx: number, row: number, col: number, ) {
    if (currNode.empty) {
        return
    }

    if (visited[row][col]) {
        return 
    }
    
    visited[row][col] = true
    chain.push(currNode)

    if (currNode.unjoined) {
        appendLand(matrix, row, col, currNode, "city", edgeIdx)
    }

    else {
        appendLand(matrix, row, col, currNode, "city")
    }

    if (currNode.end) {
        return 
    }
    
    const edges = findOtherEdges(currNode.edges, edgeIdx, "city") as number[]

    for (let i = 0; i < edges.length; i++) {
        const idx: number = edges[i]
        const x = dir[idx][1]
        const y = dir[idx][0]
        const neighbor = board[row + y][col + x]
        const nextIdx = joinMap.get(idx) as number

        walkCity(board, neighbor, chain, visited, matrix, joinMap, dir, nextIdx, row + y, col + x)
    }
}

export function claimRoad(board: Tile[][], node: Tile, claim: string, row: number, col: number, territory: Land[][], singleEdge?: string) {
    const map = dirMap(node, claim, singleEdge)
    const arr: string[] = Object.keys(map)
    const joinMap: Map<number, number> = oppositeEdges()
    const matrix: Land[][] = [...territory]

    const dir = [
        [-1, 0], 
        [0, 1], 
        [1, 0], 
        [0, -1]
    ]
    const chain: Tile[] = [node]
    const visited: boolean[][] = createEmptyMatrix()
    visited[row][col] = true

    if (singleEdge) {
        appendLand(matrix, row, col, node, "road", parseInt(arr[0]))
    }
    else {
        appendLand(matrix, row, col, node, "road")
    }
    
    for (let i = 0; i < arr.length; i++) {
        if (isLoop(chain)) {
            break
        } 
        const idx = parseInt(arr[i])
        const x = dir[idx][1]
        const y = dir[idx][0]
        const neighbor = board[row + y][col + x]
        const edgeIdx = joinMap.get(idx) as number
        const append = i == 0 ? false : true

        walkRoad(board, neighbor, chain, visited, matrix, edgeIdx, joinMap, dir, row + y, col + x, append)
    } 
    return [chain, matrix]
}

function walkRoad(board: Tile[][], currNode: Tile, chain: Tile[], visited: boolean[][], matrix: Land[][], edgeIdx: number, joinMap: Map<number, number>, dir: number[][], row: number, col: number, append: boolean) {
    // I walk a lonely road...
    if (currNode.empty) {
        return 
    }

    if (append) {
        chain.push(currNode)
    }
    else chain.unshift(currNode)

    if (currNode.village) {
        appendLand(matrix, row, col, currNode, "road", edgeIdx)
    }

    else {
        appendLand(matrix, row, col, currNode, "road")
    }

    if (isLoop(chain) && visited[row][col]) {
        return 
    }
    
    visited[row][col] = true

    if (currNode.village || currNode.monastery || currNode.deadEnd) {
        return 
    }

    const idx = findOtherEdges(currNode.edges, edgeIdx, "road") as number
    const x = dir[idx][1]
    const y = dir[idx][0]
    const neighbor = board[row + y][col + x]
    const nextIdx = joinMap.get(idx) as number

    walkRoad(board, neighbor, chain, visited, matrix, nextIdx, joinMap, dir, row + y, col + x, append)
}

export function appendClaims(board: Tile[][], filteredClaims: Claim, node: Tile, playerTerritory: Land[][], playerChains: Tile[][], opponentTerritory: Land[][], opponentChains: Tile[][], row: number, col: number) {
    const chains = [...playerChains]
    const territory = [...playerTerritory]
    const roadEdges = findEdges(node.edges, "road")
    const joinMap = oppositeEdges()
    const dir = [
        [-1, 0], 
        [0, 1], 
        [1, 0], 
        [0, -1]
    ]
    appendRoads(board, filteredClaims, roadEdges, node, territory, chains, row, col, dir, joinMap)
}

function appendRoads(board: Tile[][], claims: Claim, roadEdges: number[], node: Tile, territory: Land[][], chains: Tile[][], row: number, col: number, dir: number[][], joinMap: Map<number, number>) {
    //There be dragons here...

    if (!claims.road) {
        return 
    }
    if (node.village) {
        return 
    }
    else {
        const neighbors = []
        for (let i = 0; i < roadEdges.length; i++) {
            const idx = roadEdges[i]
            const x = dir[idx][1]
            const y = dir[idx][0]
            const neighbor = board[row + y][col + x]
            neighbors.push({
                node: neighbor, 
                idx: joinMap.get(idx) as number, 
                row: row + y, 
                col: col + x
            })
        }

        if (neighbors[0].node.empty || neighbors[1].node.empty) {
            if (neighbors[0].node.empty) {
                neighbors.shift()
            }
            else neighbors.pop()

            const neighbor = neighbors.pop() as { node: Tile, idx: number, row: number, col: number }
            const [chainIdx, idx] = findChain(chains, neighbor.node)  
            const chain = chains[chainIdx]
            
            if (idx === 0) {
                chain.unshift(node)
            }
            else {
                chain.push(node)
            }
            chains[chainIdx] = chain
        }
        else {
            const curr1 = neighbors[0]
            const curr2 = neighbors[1]
            
            if (isTerritoryClaimed(territory, curr1.node, curr1.row, curr1.col, curr1.idx, "road") 
                && isTerritoryClaimed(territory, curr2.node, curr2.row, curr2.col, curr2.idx, "road"))
            {
                const [chainIdx1, idx1] = findChain(chains, curr1.node)
                const [chainIdx2, idx2] = findChain(chains, curr2.node)
                const chain1 = chains[chainIdx1]
                const chain2 = chains[chainIdx2]

                const mergedChain = joinChains(chain1, chain2, curr1.node, curr2.node, node)
                if (chainIdx2 > chainIdx1) {
                    chains.splice(chainIdx2, 1)
                    chains.splice(chainIdx1, 1)
                } 
                else {
                    chains.splice(chainIdx1, 1)
                    chains.splice(chainIdx2, 1)
                }
                chains.push(mergedChain)
            }
            else if (!isTerritoryClaimed(territory, curr1.node, curr1.row, curr1.col, curr1.idx, "road")
                    || !isTerritoryClaimed(territory, curr2.node, curr2.row, curr2.col, curr2.idx, "road")) {
                    
                let claimed, unclaimed
                
                if (isTerritoryClaimed(territory, curr1.node, curr1.row, curr1.col, curr1.idx, "road")) {
                    claimed = curr1
                    unclaimed = curr2
                }
                else {
                    claimed = curr2
                    unclaimed = curr1 
                }
                
                const [chainIdx, currIdx] = findChain(chains, claimed.node)
                const currChain = chains[chainIdx]

                const chain: Tile[] = []
                const visited: boolean[][] = createEmptyMatrix()
                visited[row][col] = true
                

                walkRoad(board, unclaimed.node, chain, visited, territory, unclaimed.idx, joinMap, dir, unclaimed.row, unclaimed.col, true)

                const mergedChain = joinChains(currChain, chain, claimed.node, unclaimed.node, node)
                chains[chainIdx] = mergedChain
            }
        }
    }
}

export function filterClaims(possibleClaims: Claim, node: Tile, playerTerritory: Land[][], row: number, col: number) {
    const claims = { ...possibleClaims }
    const filteredClaims: Claim = {city: 0, road: 0, edgeIndices: []}
    const dir = [
        [-1, 0], 
        [0, 1], 
        [1, 0], 
        [0, -1]
    ]
    const joinMap = oppositeEdges()
    const edges = node.edges

    filterCities(claims, filteredClaims, node, row, col, edges, dir, playerTerritory, joinMap)
    filterRoads(claims, filteredClaims, node, row, col, edges, dir, playerTerritory, joinMap)
    
    return [claims, filteredClaims]
}

export function possibleClaims(node: Tile) {
    const edges: string[] = node.edges
    const claims: any = {}
    
    for (let i = 0; i < edges.length; i++) {
        const str = edges[i]
        if (str === "field") {
            continue
        }
        if (!claims[str]) {
            claims[str] = 1
        }
        else {
            let int = claims[str]
            claims[str] = int + 1
        }
    }

    if (node.monastery) {
        claims.monastery = 1
    }

    if (claims.city) {
        if (!node.unjoined) {
            claims.city = 1
        }
    }

    if (claims.road) {
        if (!node.village) {
            claims.road = 1
        }
    }
    claims.edgeIndices = edgeIdxArr(claims, node)
    return claims
}

export function updateSingleTile(board: Tile[][], matrix: Boolean[][], row: number, col: number) {
    const dir = [
        [-1, 0], 
        [0, 1], 
        [1, 0], 
        [0, -1]
    ]

    for (let i = 0; i < dir.length; i++) {
        const x = dir[i][1]
        const y = dir[i][0]

        if (board[row + x][col + y].empty) {
            matrix[row + x][col + y] = true
        }
    }
    matrix[row][col] = false
}

export function updateValidTiles(board: Tile[][], validTiles: Boolean[][], row: number, col: number) {
    const matrix: Boolean[][] = [...validTiles]
    const dir = [
        [1, 0], 
        [-1, 0], 
        [0, 1], 
        [0, -1]
    ]

    for (let i = 0; i < dir.length; i++) {
        const x = dir[i][0]
        const y = dir[i][1]

        if (board[row + x][col + y].empty) {
            matrix[row + x][col + y] = true
        }
    }
    matrix[row][col] = false
    return matrix 
}

export function outerSquare(arr: Boolean[][]) {
    const matrix = [...arr]
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            if (j == 22 || j == 28) {
                if(i >= 13 && i <= 17) matrix[i][j] = true
            }
            if (i == 13 || i == 17) {
                if(j >= 22 && j <= 28) matrix[i][j] = true
            }

        }
    }
    return matrix 
}

export function randomizeRiver(tiles: Tile[]) {
    const arr: Tile[] = [...tiles]
    const end: any = arr.pop()
    const start: any = arr.shift()
    
    const stack: Tile[] = shuffleStack(arr)
    stack.push(end)
    stack.unshift(start)
    
    return stack
}