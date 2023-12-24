import { isClaimPossible } from "../claims/isClaimPossible";
import { Claim, PotentialClaim, Score, Territory, Tile } from "../interfaces";

const evalMap: {[key: string]: number} = {
    "city": 2, 
    "road": 1, 
    "monastery": 1
}

export function finalEval(map: Territory, claim: PotentialClaim | undefined, row: number, col: number, filteredClaims: Claim, score: Score) {
    let currEval = 0
    
    if (isClaimPossible(filteredClaims)) {
        const aiLand = map.ai.territory[row][col]
        const playerLand = map.player.territory[row][col]

        if (!aiLand.node.empty) {
            const edgeIndices = aiLand.edgeIndices
            const claims = aiLand.claims
            const node = aiLand.node

            for (let i = 0; i < claims.length; i++) {
                const str = claims[i]
                if ((str === "city" && node.unjoined) || (str === "road" && node.village)) {
                    edgeIndices.forEach(() => currEval += evalMap[str])
                }
                currEval += evalMap[str]
            }
        }
        if (!playerLand.node.empty) {
            const edgeIndices = playerLand.edgeIndices
            const claims = playerLand.claims
            const node = playerLand.node

            for (let i = 0; i < claims.length; i++) {
                const str = claims[i]
                if ((str === "city" && node.unjoined) || (str === "road" && node.village)) {
                    edgeIndices.forEach(() => currEval -= (evalMap[str] * 1.5))
                }
                currEval -= (evalMap[str] * 1.5)
            }
        }
    }
    if (claim) {
        const str = claim.str
        currEval += (claim.chain.length * evalMap[str])
    }
    currEval += score.ai
    currEval -= score.player

    return currEval
}
