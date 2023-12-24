import { Chain, Land, Territory } from "../interfaces"

export function getMap(playerTerritory: Land[][], playerChains: Chain[], aiTerritory: Land[][], aiChains: Chain[]) {
    const map: Territory = {
        player: {
            territory: [...playerTerritory], 
            chains: [...playerChains]
        },
        ai: {
            territory: [...aiTerritory], 
            chains: [...aiChains]
        }
    }
    return map
}