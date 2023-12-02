import { ChainNode } from "../interfaces";

export function sumPoints(chain: ChainNode[], claim: string): number {
    const map: any = {
        "city": 2, 
        "road": 1, 
        "monastery": 1
    }
    const value = map[claim] as number
    let sum = 0

    for (let i = 0; i < chain.length; i++) {
        const curr = chain[i]

        if (curr.node.shield) {
            sum += 2
        }
        sum += value
    }
    return sum
}