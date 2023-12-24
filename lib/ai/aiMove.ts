import { findChain } from "../chains/findChain";
import { possibleClaims } from "../claims/possibleClaims";
import { randomIndex } from "../helperFunctions";
import { Claim, Overview, Score, Territory, Tile } from "../interfaces";
import { appendClaims } from "../main/append";
import { filterClaims } from "../main/filter";
import { isMoveLegal } from "../main/legal";
import { bestMoves } from "./bestMove";
import { copy } from "./copy";
import { finalEval } from "./eval";
import { validMoves } from "./moves";
import { rotateNode } from "./rotate";
import { selectClaim } from "./selectClaim";

export interface Move {
    row: number
    col: number
    eval: number, 
    map: Territory, 
    scores: Score, 
    node: Tile, 
    claims: Claim
    claim: any
    stats: Overview
}

export function aiMove(board: Tile[][], currMap: Territory, validTiles: boolean[][], currNode: Tile, currOverview: Overview) {
    const tiles = validMoves(validTiles)
    const moves: Move[] = []
    let rotate = 0
    
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
    
            const [scores, stats] = appendClaims(board, filteredClaims, node, map, square.row, square.col, overview)
            const claim = selectClaim(board, map, node, square.row, square.col, currClaims) 

            const currEval = finalEval(map, claim, square.row, square.col, filteredClaims, scores)

            moves.push({
                row: square.row, 
                col: square.col, 
                eval: currEval, 
                map: map,
                scores: scores,
                node: node, 
                claims: currClaims,
                claim: claim, 
                stats: stats
            }) 
        }
        rotate += 90
    }
    const arr = bestMoves(moves)
    const idx = randomIndex(arr.length)
    return arr[idx]
} 

function singleMove(board: Tile[][], currMap: Territory, row: number, col: number, currNode: Tile, overview: Overview) {
    const node: Tile = copy(currNode)
    rotateNode(node, currNode.rotate)

    if (!isMoveLegal(board, node, row, col)) {
        return 
    }   

    const map: Territory = copy(currMap)
    node.row = row
    node.col = col

    const claims: Claim = possibleClaims(node)
    const [currClaims, filteredClaims] = filterClaims(board, claims, node, map.player.territory, map.ai.territory, row, col)

    const scores = appendClaims(board, filteredClaims, node, map, row, col, overview)

    const claim = selectClaim(board, map, node, row, col, currClaims)

    return {
        row: row, 
        col: col, 
        eval: 1, 
        map: map,
        scores: scores,
        node: node, 
        claims: currClaims, 
        claim: claim
    }
}

