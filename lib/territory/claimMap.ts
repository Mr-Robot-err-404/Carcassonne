import { ChainNode, Land, Tile } from "../interfaces";
import { claimCity } from "../main/claimCity";
import { claimMonastery } from "../main/claimMonastery";
import { claimRoad } from "../main/claimRoads";

export const claimFunction: {[key: string]: (board: Tile[][], recentTile: Tile, row: number, col: number, territory: Land[][], dir?: number) => [chain: ChainNode[], matrix: Land[][]]} = {
    "monastery": claimMonastery, 
    "city": claimCity, 
    "road": claimRoad
}