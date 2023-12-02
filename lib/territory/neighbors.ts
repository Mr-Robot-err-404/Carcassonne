import { Tile, Land, Curr, Neighbor } from "../interfaces"
import { isTerritoryClaimed } from "../claims/isTerritoryClaimed"

export function findNeighborNodes(board: Tile[][], playerTerritory: Land[][], aiTerritory: Land[][], arr: Curr[], claim: string) {
    const nodes: Neighbor[] = []
    for (let i = 0; i < arr.length; i++) {
        const curr = arr[i]
        if (isTerritoryClaimed(playerTerritory, curr.node, curr.row, curr.col, curr.edgeIdx as number, claim)) {
            if (isTerritoryClaimed(aiTerritory, curr.node, curr.row, curr.col, curr.edgeIdx as number, claim)) {
                nodes.push({
                    str: "overlap", 
                    idx: curr.idx satisfies number
                })
            }
            else nodes.push({
                str: "player", 
                idx: curr.idx satisfies number
            })
        }

        else if (isTerritoryClaimed(aiTerritory, curr.node, curr.row, curr.col, curr.edgeIdx as number, claim)) {
            nodes.push(({
                str: "ai", 
                idx: curr.idx satisfies number
            }))
        }
            
        else if (board[curr.row][curr.col].empty) {
            nodes.push(({
                str: "empty", 
                idx: curr.idx satisfies number
            }))
        }
        else nodes.push(({
            str: "unclaimed", 
            idx: curr.idx satisfies number
        }))
    }
    return nodes
}