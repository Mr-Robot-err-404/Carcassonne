import { Chain, Tile } from "../interfaces"

export function findChain(chains: Chain[], node: Tile, claim: string, idx?: number): number[] {
    const str = JSON.stringify(node)
    for (let i = 0; i < chains.length; i++) {
        if (chains[i].claim !== claim) {
            continue
        }
        const chain = chains[i].chain

        for (let j = 0; j < chain.length; j++) {
            const curr = JSON.stringify(chain[j].node)
            if (curr === str) {
                if ((chain[j].node.village && claim === "road") || (chain[j].node.unjoined && claim === "city")) {
                    if (chain[j].edgeIdx !== idx) {
                        continue
                    }
                }
                return [i, j]
            }
        } 
    }
    return [-1, -1]
}