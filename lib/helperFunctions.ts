import { isTerritoryClaimed } from "./claims/isTerritoryClaimed"
import { Chain, Curr, Land, Neighbor, ChainNode, Tile } from "./interfaces"
import { emptyTile } from "./nodes"

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

export function findOtherValue(arr: string[], str: string) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === str) {
            continue
        }
        return [arr[i], i]
    }
    return []
}

export function findKey(arr: Neighbor[]) {
    const strs = []
    for (let i = 0; i < arr.length; i++) {
        strs.push(arr[i].str)
    }

    let str = "player"
    if (!strs.includes("player") && !strs.includes("overlap")) {
        str = "ai"
    }
    return str 
}

export function removeIdx(arr: number[], int: number) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === int) {
            arr.splice(i, 1)
            return
        }
    }
} 

export function filterThreeWalls(arr: ChainNode[]) {
    const res: ChainNode[] = []
    for (let i = 0; i < arr.length; i++) {
        const curr = arr[i]
        const edges = curr.node.edges
        let count = 0

        edges.forEach((edge: string) => {
            if (edge === "city") {
                count++
            }
        })

        if (count === 3) {
            res.push(curr)
        }
    }
    return res 
}

export function selectMonasteries(arr: Tile[]) {
    const res: Tile[] = []
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].monastery || !arr[i].village) {
            if (arr[i].edges.includes("field") && !arr[i].edges.includes("city")) {
                res.push(arr[i])
            }
        }
    }
    return res 
}

export function selectCities(arr: Tile[]) {
    const res: Tile[] = []
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].edges.includes("city")) {
            res.push(arr[i])
        }
    }
    return res 
}

function selectWalls(edges: string[], target: number) {
    let int = 0
    for (let i = 0; i < edges.length; i++) {
        if (edges[i] === "city") {
            int++
        }
    }
    return int <= target
}

export function selectRoads(arr: Tile[]) {
    const res: Tile[] = []
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].edges.includes("road") && !arr[i].monastery) {
            res.push(arr[i])
        }
    }
    return res
}

function isRoadStraight(edges: string[]) {
    const joinMap = oppositeEdges()
    const arr = []
    for (let i = 0; i < edges.length; i++) {
        if (edges[i] === "road") {
            arr.push(i)
        }
    }
    const int = joinMap.get(arr[0])
    return int === arr[1]
}

export function isOverlap(arr: Neighbor[]): boolean {
    for (let i = 0; i < arr.length; i++) {
        const str = arr[i].str
        if (str === "overlap") {
            return true 
        }
    }
    return false 
}

export function neighborNodes(board: Tile[][], playerTerritory: Land[][], aiTerritory: Land[][], arr: Curr[], claim: string): string[] {
    const strs: string[] = []

    for (let i = 0; i < arr.length; i++) {
        const curr = arr[i]
        if (isTerritoryClaimed(playerTerritory, curr.node, curr.row, curr.col, curr.idx, claim)) {
            if (isTerritoryClaimed(aiTerritory, curr.node, curr.row, curr.col, curr.idx, claim)) {
                strs.push("overlap")
            }
            else strs.push("player")
        }

        else if (isTerritoryClaimed(aiTerritory, curr.node, curr.row, curr.col, curr.idx, claim)) {
            strs.push("ai")
        }
            
        else if (board[curr.row][curr.col].empty) {
            strs.push("empty")
        }
        else strs.push("unclaimed")
    }
    return strs
}

export function findNodeStr(nodes: string[], targets: string[]): string {
    for (let i = 0; i < nodes.length; i++) {
        const str = nodes[i]
        if (targets.includes(str)) {
            return str
        }
    }
    return ""
}

export function findNeighbor(neighbors: Curr[], idx: number) {
    for (let i = 0; i < neighbors.length; i++) {
        const curr = neighbors[i]
        if (curr.idx === idx) {
            return curr
        }
    }
    return neighbors[0]
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

export function isLoop(arr: ChainNode[]): boolean {
    const end = arr.length - 1
    return arr[0].node === arr[end].node && arr.length > 1
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

export function findSingleEdge(edges: string[], claim: string): number {
    for (let i = 0; i < edges.length; i++) {
        if (edges[i] === claim) {
            return i
        }
    }
    return -1 
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

export const dirIdxMap: {[key: string]: number} = {
    "top": 0, 
    "right": 1, 
    "down": 2, 
    "left": 3
} 