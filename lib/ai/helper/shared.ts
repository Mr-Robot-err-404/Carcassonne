import { findChain } from "@/lib/chains/findChain";
import { Land, Territory, Tile } from "@/lib/interfaces";

export function enemyConquered(map: Territory, node: Tile, heroLand: Land, enemyLand: Land, claim: string, hero: string, enemy: string, idx?: number): boolean {

    if (heroLand.node.empty) {
        return false
    }

    if (!heroLand.claims.includes(claim)) {
        return false
    }

    if (typeof idx === 'number') {
        if (!heroLand.edgeIndices.includes(idx)) {
            return false
        }
    }

    const [heroIdx] = findChain(map[hero].chains, node, claim, idx)
    const [enemyIdx] = findChain(map[enemy].chains, node, claim, idx)

    if (heroIdx < 0 || enemyIdx < 0) {
        return true
    }

    const heroMeeples = map[hero].chains[heroIdx].meeples
    const enemyMeeples = map[enemy].chains[enemyIdx].meeples

    if (heroMeeples >= enemyMeeples) {
        return true
    }
    return false
}
