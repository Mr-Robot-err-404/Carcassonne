import { isClaimPossible } from "../../claims/isClaimPossible";
import { Claim, Meeple, PotentialClaim, Score, Territory, Tile } from "../../interfaces";

const evalMap: {[key: string]: number} = {
    "city": 2, 
    "road": 1, 
    "monastery": 1
}

export function finalEval(map: Territory, claim: PotentialClaim | undefined, row: number, col: number, filteredClaims: Claim, score: Score, hero: string, enemy: string, originalMap: Territory, heroMeeples: number) {
    let currEval = 0
    
    if (isClaimPossible(filteredClaims)) {
        const heroLand = map[hero].territory[row][col]
        const enemyLand = map[enemy].territory[row][col]

        if (!heroLand.node.empty) {
            const edgeIndices = heroLand.edgeIndices
            const claims = heroLand.claims
            const node = heroLand.node

            for (let i = 0; i < claims.length; i++) {
                const str = claims[i]

                if ((str === "city" && node.unjoined) || (str === "road" && node.village)) {
                    edgeIndices.forEach(() => currEval += evalMap[str])
                    continue
                }
                currEval += evalMap[str]
            }
        }
        if (!enemyLand.node.empty) {
            const edgeIndices = enemyLand.edgeIndices
            const claims = enemyLand.claims
            const node = enemyLand.node

            for (let i = 0; i < claims.length; i++) {
                const str = claims[i]
                if ((str === "city" && node.unjoined) || (str === "road" && node.village)) {
                    edgeIndices.forEach(() => currEval -= (evalMap[str] * 1.5))
                    continue
                }
                currEval -= (evalMap[str] * 2)
            }
        }
    }
    if (claim) {
        const str = claim.str
        currEval += (claim.chain.length * evalMap[str])
    }

    currEval += score[hero]
    currEval -= score[enemy] 

    return currEval
}
