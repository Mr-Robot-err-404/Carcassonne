import { Tile, Claim, Chain, Curr, ChainNode } from "../interfaces"
import { neighborNodes, appendLand, findNodeStr, findOtherValue } from "../helperFunctions"
import { joinChains } from "../claimFunctions"
import { createEmptyMatrix } from "../gridSetup"
import { walkRoad } from "../walk/walkRoad"
import { visitNodes } from "../chains/visitNodes"
import { appendVillage } from "./village"
import { findChain } from "../chains/findChain"


export function appendRoads(board: Tile[][], map: any, claims: Claim, roadEdges: number[], node: Tile, row: number, col: number, dir: number[][], joinMap: Map<number, number>) {
    //There be dragons here..
    
    if (!claims.road) {
        return 
    }
    if (node.village || node.monastery || node.deadEnd) {
        appendVillage(board, map, claims, node, dir, joinMap, row, col)
        return 
    } 
    const neighbors: Curr[] = []
    
    for (let i = 0; i < roadEdges.length; i++) {
        const idx = roadEdges[i]
        const x = dir[idx][1]
        const y = dir[idx][0]
        const neighbor = board[row + y][col + x]
        neighbors.push({
            node: neighbor, 
            idx: joinMap.get(idx) as number, 
            row: row + y, 
            col: col + x, 
            edgeIdx: idx
        })
    }

    const nodes: string[] = neighborNodes(board, map.player.territory, map.ai.territory, neighbors, "road")

    if (nodes.includes("empty")) {
        if (neighbors[0].node.empty) {
            neighbors.shift()
        }
        else neighbors.pop()

        let str = findNodeStr(nodes, ["player", "ai"])
        if (nodes.includes("overlap")) {
            str = "player"
        }

        const chains: Chain[] = map[str].chains
        const neighbor = neighbors.pop() as { node: Tile, idx: number, row: number, col: number }
        
        const [chainIdx, idx] = findChain(chains, neighbor.node, "road", neighbor.idx)  
        const chain = chains[chainIdx].chain
        
        if (idx === 0) {
            chain.unshift({node: node})
        }
        else {
            chain.push({node: node})
        }
        chains[chainIdx].chain = chain

        if (nodes.includes("overlap")) {
            appendLand(map.player.territory, row, col, node, "road")
            appendLand(map.ai.territory, row, col, node, "road")
            const [currIdx] = findChain(map.ai.chains, neighbor.node, "road", neighbor.idx)
            
            map.player.chains = chains
            map.ai.chains[currIdx].chain = chain
        }
        else {
            const matrix = map[str].territory
            appendLand(matrix, row, col, node, "road")

            map[str].territory = matrix 
            map[str].chains = chains
        }
        return 
    }
    const curr1 = neighbors[0]
    const curr2 = neighbors[1]

    if (nodes[0] === nodes[1]) {
        let str = findNodeStr(nodes, ["player", "ai"])
        if (nodes.includes("overlap")) {
            str = "player"
        }

        //This is where the fun begins...

        const chains: Chain[] = map[str].chains
        const [chainIdx1] = findChain(chains, curr1.node, "road", curr1.idx)
        const [chainIdx2] = findChain(chains, curr2.node, "road", curr2.idx)
        const chain1 = chains[chainIdx1].chain
        const chain2 = chains[chainIdx2].chain
        
        let int: number = chains[chainIdx1].meeples + chains[chainIdx2].meeples
        let mergedChain = joinChains(chain1, chain2, curr1.node, curr2.node, node)

        if (chainIdx1 === chainIdx2) {
            mergedChain = chain1
            mergedChain.push({ node: node })
            int = chains[chainIdx1].meeples
            chains.splice(chainIdx1, 1)
        }
        
        else if (chainIdx2 > chainIdx1) {
            chains.splice(chainIdx2, 1)
            chains.splice(chainIdx1, 1)
        }
        else {
            chains.splice(chainIdx1, 1)
            chains.splice(chainIdx2, 1)
        }
        appendLand(map[str].territory, row, col, node, "road")
        
        chains.push({chain: mergedChain, meeples: int, claim: "road"})
        map[str].chains = chains

        if (nodes.includes("overlap")) {
            const [idx1] = findChain(map.ai.chains, curr1.node, "road", curr1.idx)
            const [idx2] = findChain(map.ai.chains, curr2.node, "road", curr2.idx)
            const currChains: Chain[] = map.ai.chains
            let int: number = currChains[idx1].meeples + currChains[idx2].meeples

            if (idx1 === idx2) {
                mergedChain = currChains[idx1].chain
                mergedChain.push({ node: node })
                int = currChains[idx1].meeples
                map.ai.chains.splice(idx1, 1)
            }

            if (idx2 > idx1) {
                map.ai.chains.splice(idx2, 1)
                map.ai.chains.splice(idx1, 1)
            }
            else {
                map.ai.chains.splice(idx1, 1)
                map.ai.chains.splice(idx2, 1)
            }
            map.ai.chains.push({ chain: mergedChain, meeples: int, claim: "road" })
            appendLand(map.ai.territory, row, col, node, "road")
        }
    }

    else if (nodes.includes("unclaimed")) { 
        let str = findNodeStr(nodes, ["player", "ai"])
        if (nodes.includes("overlap")) {
            str = "player"
        }
        
        let claimed = curr1
        let unclaimed = curr2

        if (nodes[0] === "unclaimed") {
            unclaimed = curr1
            claimed = curr2
        }

        const chains: Chain[] = map[str].chains
        const territory = map[str].territory

        const [chainIdx] = findChain(chains, claimed.node, "road", claimed.idx)
        const currChain: ChainNode[] = chains[chainIdx].chain

        const chain: ChainNode[] = []
        const visited: boolean[][] = createEmptyMatrix()
        visited[row][col] = true
        
        appendLand(territory, row, col, node, "road")
        visitNodes(currChain, visited)
        
        walkRoad(board, unclaimed.node, chain, territory, visited, unclaimed.idx, joinMap, dir, unclaimed.row, unclaimed.col, true)

        const mergedChain = joinChains(currChain, chain, claimed.node, unclaimed.node, node)
        chains[chainIdx].chain = mergedChain

        map[str].chains = chains
        map[str].territory = territory

        if (nodes.includes("overlap")) {
            chain.forEach((curr: ChainNode) => appendLand(map.ai.territory, curr.node.row as number, curr.node.col as number, curr.node, "road"))
            appendLand(map.ai.territory, row, col, node, "road")
            
            const [idx] = findChain(map.ai.chains, claimed.node, "road", claimed.idx)
            map.ai.chains[idx].chain = mergedChain
        }
    }
    else {
        let currPlayer = curr1, currAi = curr2
        let idx = 0, str = ""

        if (nodes.includes("overlap")) {
            const [val, i] = findOtherValue(nodes, "overlap")
            idx = i as number
            str = val as string
        }

        if ((nodes[idx] === "player" && idx === 1) || (nodes[idx] === "ai" && idx === 0)) {
            currPlayer = curr2
            currAi = curr1
        }

        const playerChains: Chain[] = map.player.chains
        const playerTerritory = map.player.territory
        const aiChains: Chain[] = map.ai.chains
        const aiTerritory = map.ai.territory

        const [chainIdx1] = findChain(playerChains, currPlayer.node, "road", currPlayer.idx)
        const [chainIdx2] = findChain(aiChains, currAi.node, "road", currAi.idx)
        const chain1 = playerChains[chainIdx1].chain
        const chain2 = aiChains[chainIdx2].chain
        
        const mergedChain = joinChains(chain1, chain2, currPlayer.node, currAi.node, node)

        if (str === "player") {
            const [idx] = findChain(playerChains, currAi.node, "road", currAi.idx)
            const int: number = playerChains[chainIdx1].meeples + playerChains[idx].meeples

            playerChains[chainIdx1].meeples = int
            playerChains[chainIdx1].chain = mergedChain
            aiChains[chainIdx2].chain = mergedChain
            
            playerChains.splice(idx, 1)
            chain1.forEach((curr: ChainNode) => appendLand(aiTerritory, curr.node.row as number, curr.node.col as number, curr.node, "road", curr.edgeIdx))
        }
        else if (str === "ai") {
            const [idx] = findChain(aiChains, currPlayer.node, "road", currPlayer.idx)
            const int: number = aiChains[chainIdx2].meeples + aiChains[idx].meeples

            aiChains[chainIdx2].meeples = int
            aiChains[chainIdx2].chain = mergedChain
            playerChains[chainIdx1].chain = mergedChain
            
            aiChains.splice(idx, 1)
            chain2.forEach((curr: ChainNode) => appendLand(playerTerritory, curr.node.row as number, curr.node.col as number, curr.node, "road", curr.edgeIdx))
        }
        else {
            chain1.forEach((curr: ChainNode) => appendLand(aiTerritory, curr.node.row as number, curr.node.col as number, curr.node, "road", curr.edgeIdx))
            chain2.forEach((curr: ChainNode) => appendLand(playerTerritory, curr.node.row as number, curr.node.col as number, curr.node, "road", curr.edgeIdx))
            playerChains[chainIdx1].chain = mergedChain
            aiChains[chainIdx2].chain = mergedChain
        }
        appendLand(playerTerritory, row, col, node, "road")
        appendLand(aiTerritory, row, col, node, "road")
        
        map.player.chains = playerChains
        map.ai.chains = aiChains
        
        map.player.territory = playerTerritory
        map.ai.territory = aiTerritory
    }
}