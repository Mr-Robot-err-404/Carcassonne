import { Claim, Land, Tile } from "./interfaces"

export function randomIndex(len: number): number {
    const idx = Math.floor(Math.random() * len)
    return idx
}

export function parseKey(key: string): number[] {
    const arr = key.split("-")
    const row = parseInt(arr[0])
    const col = parseInt(arr[1])
    return [row, col]
}

export function capitalizeFirstLetter(str: string) {
    const val = str[0].toUpperCase()
    return val + str.slice(1)
}

export function removeIdx(arr: number[], int: number) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === int) {
            arr.splice(i, 1)
            return
        }
    }
} 

export function selectRoads(arr: Tile[]) {
    const res: Tile[] = []
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].edges.includes("road") && !arr[i].edges.includes("city")) {
            res.push(arr[i])
        }
    }
    return res
}

export function filterCities(claims: Claim, filteredClaims: Claim, node: Tile, row: number, col: number, edges: string[], dir: number[][], territory: Land[][], joinMap: Map<number, number>) {
    if (!claims.city) {
        return 
    }
    for (let i = 0; i < edges.length; i++) {
        if (edges[i] !== "city") {
            continue
        }
        const x = dir[i][1]
        const y = dir[i][0]
        const neighbor = territory[row + y][col + x]

        if (neighbor.node.empty) {
            continue
        }

        if (!neighbor.claims.includes("city")) {
            continue
        }

        if (neighbor.node.unjoined) {
            if (!neighbor.edgeIndices.length) {
                continue
            }
            const idx = joinMap.get(i) as number
            if (!neighbor.edgeIndices.includes(idx)) {
                continue
            }
        }
        const int = claims.city as number
        const val = filteredClaims.city as number
        claims.city = int - 1
        filteredClaims.city = val + 1

        if (node.unjoined) {
            removeIdx(claims.edgeIndices as number[], i)
            filteredClaims.edgeIndices?.push(i)
        }
        else break
    }
    
}

export function filterRoads(claims: Claim, filteredClaims: Claim, node: Tile, row: number, col: number, edges: string[], dir: number[][], territory: Land[][], joinMap: Map<number, number>) {
    if (!claims.road) {
        return 
    }
    for (let i = 0; i < edges.length; i++) {
        if (edges[i] !== "road") {
            continue
        }
        const x = dir[i][1]
        const y = dir[i][0]
        const neighbor = territory[row + y][col + x]

        if (neighbor.node.empty) {
            continue
        }

        if (!neighbor.claims.includes("road")) {
            continue
        }
        if (neighbor.node.village) {
            if (!neighbor.edgeIndices.length) {
                continue
            }
            const idx = joinMap.get(i) as number
            if (!neighbor.edgeIndices.includes(idx)) {
                continue
            }
        }
        const int = claims.road as number
        const val = filteredClaims.road as number
        claims.road = int - 1 
        filteredClaims.road = val + 1
       

        if (node.village) {
            removeIdx(claims.edgeIndices as number[], i)
            filteredClaims.edgeIndices?.push(i)
        }
        else break
    }
}

export function findChain(chains: Tile[][], node: Tile): number[] {
    for (let i = 0; i < chains.length; i++) {
        for (let j = 0; j < chains[i].length; j++) {
            if (chains[i][j] === node) {
                return [i, j]
            }
        } 
    }
    return [-1, -1]
}

export function isTerritoryClaimed(matrix: Land[][], node: Tile, row: number, col: number, idx: number, claim: string,): boolean {
    if (matrix[row][col].node !== node) {
        return false
    }
    if (!matrix[row][col].claims.includes(claim)) {
        return false 
    }
    if (matrix[row][col].node.village) {
        if (!matrix[row][col].edgeIndices.includes(idx)) {
            return false
        }
    }
    return true
}

export function appendLand(matrix: Land[][], row: number, col: number, node: Tile, claim: string, idx?: number) {
    matrix[row][col].node = node
    matrix[row][col].claims.push(claim)

    if (claim === "city" && node.unjoined) {
        matrix[row][col].edgeIndices.push(idx as number)
    }

    if (claim === "road" && node.village) {
        matrix[row][col].edgeIndices.push(idx as number)
    }
}

export function joinChains(chain1: Tile[], chain2: Tile[], node1: Tile, node2: Tile, joinNode: Tile): Tile[] {
    const mergedChain: Tile[] = []
    const end = chain1.length - 1

    if (chain1[end] !== node1) {
        chain1.reverse()
    }
    if (chain2[0] !== node2) {
        chain2.reverse()
    }

    chain1.push(joinNode)
    chain1.forEach((node: Tile) => mergedChain.push(node))
    chain2.forEach((node: Tile) => mergedChain.push(node))

    return mergedChain
}

export function dirMap(node: Tile, key: string, singleEdge?: string) {
    const edges = node.edges 
    const map: any = {
        0: "top", 
        1: "right", 
        2: "down", 
        3: "left"
    }

    if (singleEdge) {
        const res: any = {}
        for (let i = 0; i < edges.length; i++) {
            if (map[i] === singleEdge) {
                res[i] = singleEdge
                return res
            }
        }
    }

    else {
        edges.forEach((edge: string, i: number) => {
            if (edge !== key) {
                delete map[i]
            }
        })  
    } 
    
    return map
}

export function landChain(matrix: Land[][]) {
    const res = []
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            if (matrix[i][j].node.empty) {
                continue
            }
            res.push(matrix[i][j])
        }
    }
    return res
}

export function oppositeEdges() {
    const map: Map<number, number> = new Map()
    map.set(0, 2)
    map.set(1, 3)
    map.set(2, 0)
    map.set(3, 1)

    return map 
}

export function copyMatrix(territory: Land[][]) {
    const matrix: Land[][] = []
    for (let i = 0; i < territory.length; i++) {
        matrix[i] = []
        for (let j = 0; j < territory[0].length; j++) {
            const node = territory[i][j]
            matrix[i].push(node)
        }
    }
    return matrix 
}

export function edgeIdxArr(claims: any, node: Tile) {
    const arr = Object.keys(claims)
    const edgeIndices: number[] = []
    let key = ""

    for (let i = 0; i < arr.length; i++) {
        const val = arr[i]
        if (claims[val] > 1) {
            key = val
            break
        }
    }

    const edges = node.edges
    for (let i = 0; i < edges.length; i++) {
        if (edges[i] === key) {
            edgeIndices.push(i)
        }
    }
    return edgeIndices
}

export function findEdges(edges: string[], claim: string) {
    const arr = []
    for (let i = 0; i < edges.length; i++) {
        if (edges[i] === claim) {
            arr.push(i)
        }
    }
    return arr 
}

export function findOtherEdges(edges: string[], currEdgeIdx: number, claim: string) {
    const indices: number[] = []
    for (let i = 0; i < edges.length; i++) {
        if (i === currEdgeIdx) {
            continue
        }
        if (edges[i] === claim) {
            if (claim === "road") {
                return i as number
            }
            else indices.push(i)
        }
    }
    return indices
}

export function isLoop(arr: Tile[]) {
    const end = arr.length - 1
    return arr[0] === arr[end] && arr.length > 1
}

export function filterEdges(edges: string[], key: string) {
    const arr = []
    for (let i = 0; i < edges.length; i++) {
        if (edges[i] === key) {
            arr.push({
                idx: i, 
                value: key
            })
        }
    }
    return arr 
} 