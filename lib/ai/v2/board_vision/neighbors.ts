import { Land, Territory } from "@/lib/interfaces"

export function adjacentTerritory(map: Territory, joinMap: Map<number, number>, idx: number, hero: string, enemy: string, row: number, col: number): boolean {
    const currHero = map[hero].territory[row][col]
    const currEnemy = map[enemy].territory[row][col]

    if (currEnemy.claims.includes("city")) {

        if (!currEnemy.node.unjoined) {
            return true
        }
        const edgeIdx = joinMap.get(idx) as number
        
        if (currEnemy.edgeIndices.includes(edgeIdx)) {
            return true
        }
    }

    if (currHero.claims.includes("city")) {

        if (!currHero.node.unjoined) {
            return true
        }
        const edgeIdx = joinMap.get(idx) as number
        
        if (currHero.edgeIndices.includes(edgeIdx)) {
            return true
        }
    }
    return false
}