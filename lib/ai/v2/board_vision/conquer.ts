import { Territory, Tile } from "@/lib/interfaces";
import { oppositeEdges } from "@/lib/helperFunctions";
import { findChain } from "@/lib/chains/findChain";

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

export function conquered(map: Territory, board: Tile[][], row: number, col: number, hero: string) {
    const heroChains: number[] = []
    const enemyChains: number[] = []
    const enemy = heroMap[hero]
    let heroMeeples = 0
    let enemyMeeples = 0

    for (let i = 0; i < dir.length; i++) {
        const x = dir[i][1]
        const y = dir[i][0]
        const neighbor = board[row + y][col + x]

        if (neighbor.empty) {
            continue
        }
        const currHero = map[hero].territory

        if (!currHero[row + y][col + x].claims.includes("city")) {
            continue
        }
        let idx

        if (neighbor.unjoined) {
            idx = joinMap.get(i) as number
            if (!currHero[row + y][col + x].edgeIndices.includes(idx)) {
                continue
            }
        }
        const [chainIdx] = findChain(map[hero].chains, neighbor, "city", idx)
        if (heroChains.includes(chainIdx) || chainIdx < 0) {
            continue
        }
        heroChains.push(chainIdx)
    }

    for (let i = 0; i < dir.length; i++) {
        const x = dir[i][1]
        const y = dir[i][0]
        const neighbor = board[row + y][col + x]

        if (neighbor.empty) {
            continue
        }
        const currEnemy = map[enemy].territory

        if (!currEnemy[row + y][col + x].claims.includes("city")) {
            continue
        }
        let idx

        if (neighbor.unjoined) {
            idx = joinMap.get(i) as number
            if (!currEnemy[row + y][col + x].edgeIndices.includes(idx)) {
                continue
            }
        }
        const [chainIdx] = findChain(map[enemy].chains, neighbor, "city", idx)
        if (enemyChains.includes(chainIdx) || chainIdx < 0) {
            continue
        }
        enemyChains.push(chainIdx)
    }
    heroChains.forEach((idx: number) => heroMeeples += map[hero].chains[idx].meeples)
    enemyChains.forEach((idx: number) => enemyMeeples += map[enemy].chains[idx].meeples)

    return heroMeeples > enemyMeeples
}