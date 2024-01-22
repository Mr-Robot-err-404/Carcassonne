import { possibleClaims } from "../../claims/possibleClaims";
import { Claim, Meeple, Overview, PotentialClaim, Score, Territory, Tile } from "../../interfaces";
import { appendClaims } from "../../main/append";
import { filterClaims } from "../../main/filter";
import { isMoveLegal } from "../../main/legal";
import { copy } from "../helper/copy";
import { finalEval } from "../eval/main";
import { validMoves } from "../helper/moves";
import { rotateNode } from "../helper/rotate";
import { selectClaims } from "../claims/selectClaim";
import { isMoveImpossible } from "../helper/impossible";
import { closedChains } from "./closed_chains/main";
import { bestClaimV2 } from "./claims/claim";
import { findKeySquares } from "./board_vision/keys";
import { insideRadius } from "./board_vision/radius";
import { nearestSquare } from "./board_vision/nearest";
import { heistEval } from "./board_vision/heist";
import { selectMove } from "../eval/select";
import { reviewClaim } from "./board_vision/claim";
import { finalEvalV2 } from "./eval/eval";

interface Target {
    acquired: boolean
    row: number
    col: number
}
export interface Move {
    row: number
    col: number
    eval: number, 
    map: Territory, 
    scores: Score, 
    node: Tile, 
    claims: Claim
    claim: PotentialClaim | undefined
    stats: Overview, 
    meeples: Meeple
    impossible?: boolean
    target: Target
}

const enemyMap: {[key: string]: string} = {
    ai: "player", 
    player: "ai"
}

export function aiMoveV2(board: Tile[][], currMap: Territory, validTiles: boolean[][], currNode: Tile, currOverview: Overview, hero: string, heroMeeples: number) {
    const tiles = validMoves(validTiles)
    const moves: Move[] = []
    const enemy = enemyMap[hero]
    let rotate = 0

    if (isMoveImpossible(board, currNode, tiles)) {
        return {impossible: true}
    }
    const filthySquares = findKeySquares(tiles, board, currMap)

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < tiles.length; j++) {
            const square = tiles[j]
            const node: Tile = copy(currNode)
            rotateNode(node, rotate)

            if (!isMoveLegal(board, node, square.row, square.col)) {
                continue
            }   

            const map: Territory = copy(currMap)
            const overview: Overview = copy(currOverview)
            node.row = square.row
            node.col = square.col

            const claims: Claim = possibleClaims(node)
            const [currClaims, filteredClaims] = filterClaims(board, claims, node, map.player.territory, map.ai.territory, square.row, square.col)
    
            const [scores, stats, meeples] = appendClaims(board, filteredClaims, node, map, square.row, square.col, overview)
            let claim: PotentialClaim | undefined
            let chains: PotentialClaim[] | undefined
            
            if (meeples[hero] + heroMeeples > 0) {
                chains = selectClaims(board, map, node, square.row, square.col, currClaims, hero) 
                claim = bestClaimV2(chains, map, board, node, hero, heroMeeples, square.row, square.col)
            }
            let currEval = finalEvalV2(currMap, claim, square.row, square.col, filteredClaims, scores, hero)
            
            if (heroMeeples < 6) {
                currEval += closedChains(map, node, square.row, square.col, filteredClaims, hero)
            }
            const target = {
                acquired: false, 
                row: 0, 
                col: 0
            }

            if (insideRadius(filthySquares, square.row, square.col) && node.edges.includes("city")) {
                const end = nearestSquare(filthySquares, square.row, square.col)
                const int = heistEval(end, square, board, map, node, hero)

                if (int > 0) {
                    target.acquired = true
                    target.row = end.row
                    target.col = end.col

                    if (claim && chains) {
                        claim = reviewClaim(claim, chains, node, end, square.row, square.col)
                        map[hero].territory = claim.matrix
                    }
                }
                currEval += int
            } 

            moves.push({
                row: square.row, 
                col: square.col, 
                eval: currEval, 
                map: map,
                scores: scores,
                node: node, 
                claims: currClaims,
                claim: claim,
                stats: stats, 
                meeples: meeples, 
                target: target
            }) 
        }
        rotate += 90
    }
    return selectMove(moves)
} 
