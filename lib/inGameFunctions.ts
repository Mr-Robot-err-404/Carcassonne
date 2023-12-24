import { shuffleStack } from "./gridSetup"
import { Tile } from "./interfaces"

export function updateSingleTile(board: Tile[][], matrix: Boolean[][], row: number, col: number) {
    const dir = [
        [-1, 0], 
        [0, 1], 
        [1, 0], 
        [0, -1]
    ]

    for (let i = 0; i < dir.length; i++) {
        const x = dir[i][1]
        const y = dir[i][0]

        if (board[row + x][col + y].empty) {
            matrix[row + x][col + y] = true
        }
    }
    matrix[row][col] = false
}

export function updateValidTiles(board: Tile[][], validTiles: Boolean[][], row: number, col: number) {
    const matrix: Boolean[][] = [...validTiles]
    const dir = [
        [1, 0], 
        [-1, 0], 
        [0, 1], 
        [0, -1]
    ]

    for (let i = 0; i < dir.length; i++) {
        const x = dir[i][0]
        const y = dir[i][1]

        if (board[row + x][col + y].empty) {
            matrix[row + x][col + y] = true
        }
    }
    matrix[row][col] = false
    return matrix 
}

export const initOverview = {
    player: {
        finalScore: 0, 
        cities: 0, 
        roads: 0, 
        monasteries: 0, 
        stolenCities: 0, 
        stolenRoads: 0, 
        maxCity: 0, 
        maxRoad: 0
    },
    ai: {
        finalScore: 0, 
        cities: 0, 
        roads: 0, 
        monasteries: 0, 
        stolenCities: 0, 
        stolenRoads: 0, 
        maxCity: 0, 
        maxRoad: 0
    },
}

export function outerSquare(arr: Boolean[][]) {
    const matrix = [...arr]
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            if (j >= 21 && j <= 29) {
                if (i >= 12 && i <= 18) {
                    matrix[i][j] = true
                }
            }
        }
    }
    return matrix 
}

export function randomizeRiver(tiles: Tile[]) {
    const arr: Tile[] = [...tiles]
    const end: any = arr.pop()
    const start: any = arr.shift()
    
    const stack: Tile[] = shuffleStack(arr)
    stack.push(end)
    stack.unshift(start)
    
    return stack
}