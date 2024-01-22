import { randomIndex } from "@/lib/helperFunctions";
import { Move } from "../base_version/main";
import { bestMoves } from "./move";

export function selectMove(moves: Move[]) {
    const arr = bestMoves(moves)
    const idx = randomIndex(arr.length)

    return arr[idx]
}