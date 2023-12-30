export function validMoves(tiles: boolean[][]) {
    const arr = []
    for (let i = 0; i < tiles.length; i++) {
        for (let j = 0; j < tiles[0].length; j++) {
            const bool = tiles[i][j]
            if (bool) {
                arr.push({
                    row: i, 
                    col: j
                })
            }
        }
    }
    return arr
}