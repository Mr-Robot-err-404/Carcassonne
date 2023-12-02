import { ChainNode } from "../interfaces";

export function isCityComplete(chain: ChainNode[]) {
    const map: any = {
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
    return map.top === map.down && map.left === map.right
}