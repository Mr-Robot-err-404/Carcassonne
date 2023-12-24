import { Move } from "./aiMove";

export function bestMoves(moves: Move[]) {
    let arr: Move[] = []
    let max = -Infinity
    for (let i = 0; i < moves.length; i++) {
        const move = moves[i]
        const currEval = move.eval
        if (currEval > max) {
            max = currEval
            arr = [move]
        }
        else if (currEval === max) {
            arr.push(move)
        }
    }
    return arr 
}