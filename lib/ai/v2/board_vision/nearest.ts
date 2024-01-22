import { Square } from "./keys";

export function nearestSquare(arr: Square[], row: number, col: number) {
    let min = Infinity
    let curr = {row: -1, col: -1}

    for (let i = 0; i < arr.length; i++) {
        const square = arr[i]
        const x = Math.abs(col - square.col)
        const y = Math.abs(row - square.row)
        const dist = x + y

        if (dist < min) {
            min = dist
            curr = square
        }
    }
    return curr
}