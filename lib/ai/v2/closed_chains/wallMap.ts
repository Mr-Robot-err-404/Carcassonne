import { ChainNode, Tile } from "@/lib/interfaces";

export function getWallMap(chain: ChainNode[], node: Tile) {
    const map: {[key: string]: number} = {
        top: 0, 
        right: 0, 
        down: 0, 
        left: 0
    }
    const dir = ["top", "right", "down", "left"]
    
    for (let i = 0; i < chain.length; i++) {
        if (chain[i].node.unjoined) {
            const idx = chain[i].edgeIdx as number
            const key = dir[idx]
            const int = map[key] as number
            map[key] = int + 1
            continue
        }
        const edges = chain[i].node.edges
        
        for (let j = 0; j < edges.length; j++) {
            const str = edges[j]
            if (str !== "city") {
                continue
            }

            const key = dir[j]
            const int = map[key] as number
            map[key] = int + 1
        }
    }

    const prevChain = chain.filter((curr: ChainNode) => {
        const str = JSON.stringify(curr.node)
        const str2 = JSON.stringify(node)
        return str !== str2
    })
    const prevMap: {[key: string]: number} = {
        top: 0, 
        right: 0, 
        down: 0, 
        left: 0
    }

    for (let i = 0; i < prevChain.length; i++) {
        if (prevChain[i].node.unjoined) {
            const idx = prevChain[i].edgeIdx as number
            const key = dir[idx]
            const int = prevMap[key] as number
            prevMap[key] = int + 1
            continue
        }
        const edges = prevChain[i].node.edges
        
        for (let j = 0; j < edges.length; j++) {
            const str = edges[j]
            if (str !== "city") {
                continue
            }

            const key = dir[j]
            const int = prevMap[key] as number
            prevMap[key] = int + 1
        }
    }
    return [map, prevMap]
}