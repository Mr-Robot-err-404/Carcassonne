import { Tile } from "../interfaces"
import { edgeIdxArr } from "../helperFunctions"

export function possibleClaims(node: Tile) {
    const edges: string[] = node.edges
    const claims: any = {}
    
    for (let i = 0; i < edges.length; i++) {
        const str = edges[i]
        if (str === "field") {
            continue
        }
        if (!claims[str]) {
            claims[str] = 1
        }
        else {
            let int = claims[str]
            claims[str] = int + 1
        }
    }

    if (node.monastery) {
        claims.monastery = 1
    }

    if (claims.city) {
        if (!node.unjoined) {
            claims.city = 1
        }
    }

    if (claims.road) {
        if (!node.village) {
            claims.road = 1
        }
    }
    claims.edgeIndices = edgeIdxArr(claims, node)
    return claims
}
