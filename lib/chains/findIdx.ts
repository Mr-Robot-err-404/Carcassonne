import { Chain } from "../interfaces";

export function findChainIdx(chains: Chain[], target: Chain) {
    for (let i = 0; i < chains.length; i++) {
        const curr = chains[i]
        if (curr === target) {
            return i 
        }
    }
}