import { Chain, Completed } from "../interfaces";
import { isCityComplete } from "./city";
import { isMonasteryComplete } from "./monastery";
import { isRoadComplete } from "./road";
import { threeWalls } from "./threeWalls";
import { emptyWalls } from "./walls";

export function completedChains(map: any, dir: number[][]) {
    const strs = ["player", "ai"]
    const completed: Completed = {
        player: [], 
        ai: []
    }

    for (let i = 0; i < strs.length; i++) {
        const str = strs[i]
        const chains: Chain[] = map[str].chains
        const end = chains.length - 1
        
        for (let j = end; j >= 0; j--) {
            const curr = chains[j]
            const chain = curr.chain

            if (curr.claim === "city") {
                if (isCityComplete(chain) && emptyWalls(chain, map[str].territory, dir)) {
                    completed[str].push({
                        idx: j, 
                        claim: "city"
                    })
                }
            }

            else if (curr.claim === "road") {
                if (isRoadComplete(chain, map[str].territory, dir)) {
                    completed[str].push({
                        idx: j, 
                        claim: "road"
                    })
                }
            }
            else if (curr.claim === "monastery") {
                if(isMonasteryComplete(chain)) {
                    completed[str].push({
                        idx: j, 
                        claim: "monastery"
                    })
                }
            }
        }
    }
    return completed
}