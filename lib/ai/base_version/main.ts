import { findChain } from "../../chains/findChain";
import { possibleClaims } from "../../claims/possibleClaims";
import { randomIndex } from "../../helperFunctions";
import { Claim, Meeple, Overview, PotentialClaim, Score, Territory, Tile } from "../../interfaces";
import { appendClaims } from "../../main/append";
import { filterClaims } from "../../main/filter";
import { isMoveLegal } from "../../main/legal";
import { bestMoves } from "../eval/move";
import { copy } from "../helper/copy";
import { finalEval } from "../eval/main";
import { validMoves } from "../helper/moves";
import { rotateNode } from "../helper/rotate";
import { selectClaims } from "../claims/selectClaim";
import { bestClaim } from "../eval/claim";
import { claimEval } from "../board_vision/claimEval";
import { isMoveImpossible } from "../helper/impossible";

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

const emptyTarget: Target = {
    acquired: false,
    row: 0,
    col: 0
}

export function aiMove(board: Tile[][], currMap: Territory, validTiles: boolean[][], currNode: Tile, currOverview: Overview, hero: string, heroMeeples: number) {
    const tiles = validMoves(validTiles)
    const moves: Move[] = []
    const enemy = enemyMap[hero]
    let rotate = 0

    if (isMoveImpossible(board, currNode, tiles)) {
        return {impossible: true}
    }
    
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
            
            if (meeples[hero] + heroMeeples > 0) {
                const chains = selectClaims(board, map, node, square.row, square.col, currClaims, hero) 
                claim = bestClaim(chains, map, hero)
            }
            const currEval = finalEval(map, claim, square.row, square.col, filteredClaims, scores, hero, enemy, currMap, heroMeeples)

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
                target: emptyTarget
            }) 
        }
        rotate += 90
    }
    const arr = bestMoves(moves)
    const idx = randomIndex(arr.length)
    return arr[idx]
} 

