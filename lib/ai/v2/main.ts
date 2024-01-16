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
import { isMoveImpossible } from "../helper/impossible";
import { closedChains } from "./closed_chains/main";
import { bestClaimV2 } from "./claims/claim";
import { findKeySquares } from "./board_vision/keys";
import { insideRadius } from "./board_vision/radius";
import { nearestSquare } from "./board_vision/nearest";
import { shortestPath } from "./board_vision/path/path";
import { pathEval } from "./board_vision/path/eval";
import { endpoint } from "../helper/end";
import { conquered } from "./board_vision/conquer";

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
            
            if (meeples[hero] + heroMeeples > 0) {
                const chains = selectClaims(board, map, node, square.row, square.col, currClaims, hero) 
                claim = bestClaimV2(chains, map, board, node, hero, heroMeeples, square.row, square.col)
            }
            let currEval = finalEval(map, claim, square.row, square.col, filteredClaims, scores, hero, enemy, currMap, heroMeeples)
            
            if (heroMeeples < 6) {
                currEval += closedChains(map, node, square.row, square.col, filteredClaims, hero)
            }

            if (insideRadius(filthySquares, square.row, square.col) && node.edges.includes("city")) {
                const end = nearestSquare(filthySquares, square.row, square.col, board)
                const path = shortestPath(board, end, square.row, square.col, node)

                if (endpoint(path, end)) {
                    currEval += pathEval(path, node)
                }
                if (conquered(map, board, square.row, square.col, hero)) {
                    currEval += 20
                }
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
                meeples: meeples
            }) 
        }
        rotate += 90
    }
    const arr = bestMoves(moves)
    const idx = randomIndex(arr.length)
    return arr[idx]
} 
