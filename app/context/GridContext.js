import { riverTiles, tiles, emptyTile } from "@/lib/nodes";
import { createEmptyBoard, createEmptyMatrix, createEmptyTerritory, shuffleStack } from "@/lib/gridSetup";
import { createContext, useState } from "react";
import { randomizeRiver, updateValidTiles } from "@/lib/inGameFunctions"
import { selectRoads } from "@/lib/helperFunctions";

const GridContext = createContext()

export function GridProvider({ children }) { 
    const emptyBoard = createEmptyBoard()
    const emptyMatrix = createEmptyMatrix()
    const emptyTerritory = createEmptyTerritory()

    const [board, setBoard] = useState(emptyBoard)
    const [validTiles, setValidTiles] = useState(emptyMatrix)
    
    const [stack, setStack] = useState(shuffleStack(selectRoads(tiles)))
    const [currTile, setCurrTile] = useState(emptyTile)
    const [recentTile, setRecentTile] = useState({ ...emptyTile })
    const [claims, setClaims] = useState(new Map())

    const [playerTurn, setPlayerTurn] = useState(true)
    const [playerTerritory, setPlayerTerritory] = useState(emptyTerritory)
    const [opponentTerritory, setOpponentTerritory] = useState([...emptyTerritory])

    const [playerChains, setPlayerChains] = useState([])
    const [opponentChains, setOpponentChains] = useState([])

    const updateCell = (row, col, node, currClaims) => {
        const matrix = updateValidTiles(board, validTiles, row, col)
        const newBoard = [...board]
        newBoard[row][col] = node
        setBoard(newBoard)
        setValidTiles(matrix)
        setClaims(currClaims)
        setPlayerTurn(!playerTurn)
        updateStack()
    }

    const appendChain = (chain, matrix) => {
        if (playerTurn) {
            setPlayerChains((prev) => [...prev, chain])
            setPlayerTerritory(matrix)
        }
        else {
            setOpponentChains((prev) => [...prev, chain])
            setOpponentTerritory(matrix)
        }
    }

    const updateStack = () => {
        if (!stack.length || stack.length === 1) {
            return 
        }
        const currStack = [...stack]
        currStack.pop()

        const nextTile = currStack[currStack.length - 1]
        setStack(currStack)
        setCurrTile(nextTile)
    }
    
    const rotateCurrTile = () => {
        const edges = [...currTile.edges]
        const end = edges.pop()
        edges.unshift(end)

        setCurrTile((prev) => ({
            ...prev, 
            rotate: (prev.rotate + 90) % 360,
            edges: edges
        }))
    }

    return (
        <GridContext.Provider value={{ board, setBoard, updateCell, stack, rotateCurrTile, currTile, validTiles, setValidTiles, setCurrTile, playerTurn, recentTile, setRecentTile, claims, playerTerritory, setPlayerTerritory, appendChain, playerChains }}>
            {children}
        </GridContext.Provider>
    )
}

export default GridContext