import { updateSingleTile } from "./inGameFunctions"
import { Land, Tile } from "./interfaces"

export function findCenter(rows: number, cols: number) {
    const row = Math.floor(rows / 2)
    const col = Math.floor(cols / 2)
    return [row, col]
}

export function isCenter(currRow: number, currCol: number, center: number[]): boolean {
    return currRow === center[0] && currCol === center[1]
}

export function distanceToCenter(center: number[], width: number) {
    let x: number 
    const y: number = center[0] * 60
    if(width < 576) {
        x = center[1] * 70
    }
    else x = center[1] * 53

    return [x, y]
}

export function initValidTiles(board: Tile[][]) {
    const matrix = createEmptyMatrix()
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            if (board[i][j].empty) {
                continue
            }
            else updateSingleTile(board, matrix, i, j)
        }
    }
    return matrix
}

export function createEmptyBoard() { 
    const board: Tile[][] = []
    for (let i = 0; i < 25; i++) {
        board[i] = []
        for (let j = 0; j < 50; j++) {
            const node: Tile = {img: "", rotate: 0, edges: [], row: i, col: j}
            board[i].push(node)
        }
    }
    return board
}

export function createEmptyMatrix() {
    const matrix: boolean[][] = [] 
    for (let i = 0; i < 25; i++) {
        matrix[i] = []
        for (let j = 0; j < 50; j++) {
            matrix[i].push(false)
        }
    }
    return matrix 
}

export function createEmptyTerritory() {
    const node: Tile = {img: "", rotate: 0, edges: [], empty: true} 
    const matrix: Land[][] = [] 
    for (let i = 0; i < 25; i++) {
        matrix[i] = []
        for (let j = 0; j < 50; j++) {
            matrix[i].push({
                node: node, 
                claims: [], 
                edgeIndices: [], 
                row: i, 
                col: j, 
                complete: []
            })
        }
    }
    return matrix
}

export function shuffleStack(tiles: Tile[]) {
    const arr = [...tiles]
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        const tmp = arr[i]
        arr[i] = arr[j]
        arr[j] = tmp
    }
    return arr 
}

export function adjustBoard(board: Tile[][]) {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            if (board[i][j].empty) {
                continue
            }
            board[i][j].row = i
            board[i][j].col = j
        }
    }
}

export function adjustTile(board: Tile[][]) {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            if (board[i][j].id === 70) {
                board[i][j].deadEnd = true
            }
        }
    }
}

export function test(board: Tile[][]) {
    const arr = []
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            const tile = board[i][j]
            if (tile.empty) {
                continue
            }
            arr.push(tile)
        }
    }
    console.log("arr: ", arr)
}

