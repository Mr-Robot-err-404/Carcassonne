import { Square } from "./keys";

export function insideRadius(arr: Square[], row: number, col: number) {
    for (let i = 0; i < arr.length; i++) {
        const square = arr[i]
        const x = Math.abs(col - square.col)
        const y = Math.abs(row - square.row)
        const dist = x + y

        if (dist < 3) {
            return true
        }
    }
    return false
} 