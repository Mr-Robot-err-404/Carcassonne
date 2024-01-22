import { findChain } from "@/lib/chains/findChain";
import { findEdges, oppositeEdges } from "@/lib/helperFunctions";
import { Territory, Tile } from "@/lib/interfaces";

const heroMap: {[key: string]: string} = {
    "player": "ai", 
    "ai": "player"
}

const joinMap = oppositeEdges()
const dir = [
    [-1, 0], 
    [0, 1], 
    [1, 0], 
    [0, -1]
]

export function conquered(map: Territory, board: Tile[][], node: Tile, row: number, col: number, hero: string): boolean {

    if (node.unjoined) {
        return false
    }
    const edges = findEdges(node.edges, "city")
    const enemy = heroMap[hero]

    const chains: {[key: string]: number[]} = {
        hero: [], 
        enemy: []
    }
    const meeples = {
        hero: 0, 
        enemy: 0
    }

    for (let i = 0; i < edges.length; i++) {
        const idx = edges[i]
        const x = dir[idx][1]
        const y = dir[idx][0]
        const neighbor = board[row + y][col + x]

        if (neighbor.empty) {
            continue
        }
        const currHero = map[hero].territory

        if (!currHero[row + y][col + x].claims.includes("city")) {
            continue
        }
        let edgeIdx

        if (neighbor.unjoined) {
            edgeIdx = joinMap.get(idx) as number

            if (!currHero[row + y][col + x].edgeIndices.includes(edgeIdx)) {
                continue
            }
        }
        const [chainIdx] = findChain(map[hero].chains, neighbor, "city", edgeIdx)

        if (chains.hero.includes(chainIdx) || chainIdx < 0) {
            continue
        }
        chains.hero.push(chainIdx)
    }

    for (let i = 0; i < edges.length; i++) {
        const idx = edges[i]
        const x = dir[idx][1]
        const y = dir[idx][0]
        const neighbor = board[row + y][col + x]

        if (neighbor.empty) {
            continue
        }
        const currEnemy = map[enemy].territory

        if (!currEnemy[row + y][col + x].claims.includes("city")) {
            continue
        }
        let edgeIdx

        if (neighbor.unjoined) {
            edgeIdx = joinMap.get(idx) as number

            if (!currEnemy[row + y][col + x].edgeIndices.includes(edgeIdx)) {
                continue
            }
        }
        const [chainIdx] = findChain(map[enemy].chains, neighbor, "city", edgeIdx)

        if (chains.enemy.includes(chainIdx) || chainIdx < 0) {
            continue
        }
        chains.enemy.push(chainIdx)
    }

    if (chains.hero.length === 0 || chains.enemy.length === 0) {
        return false
    }
    
    if (meeples.hero <= meeples.enemy) {
        return false
    }
    return true
}