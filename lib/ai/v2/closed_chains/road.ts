import { findChain } from "@/lib/chains/findChain";
import { Claim, Territory, Tile } from "@/lib/interfaces";

export function roadEval(map: Territory, claims: Claim, node: Tile, hero: string) {
   let currEval = 0
   
    if (node.village) {
      const edges = claims.edgeIndices

      if (!edges) {
         return currEval
      }
      
      for (let i = 0; i < edges.length; i++) {
         const idx = edges[i]
         const [chainIdx] = findChain(map[hero].chains, node, "road", idx)

         if (chainIdx < 0) {
            return currEval
         }
         const chain = map[hero].chains[chainIdx].chain

         if (chain.length < 2) {
            return currEval
         } 
         currEval++
      }
       return currEval
    }
    if (node.monastery) {
         const [idx] = findChain(map[hero].chains, node, "road")

         if (idx < 0) {
            return currEval
         }
         const chain = map[hero].chains[idx].chain
      
         if (chain.length < 3) {
            return currEval
         } 
    } 
    
    //pathfinding to locate nearby loops

    return currEval
}