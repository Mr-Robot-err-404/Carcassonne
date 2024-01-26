import { tiles, emptyTile } from "@/lib/nodes";
import { createEmptyBoard, createEmptyMatrix, createEmptyTerritory, preloadImages, shuffleStack } from "@/lib/gridSetup";
import { createContext, useEffect, useState } from "react";
import { updateValidTiles, initOverview } from "@/lib/inGameFunctions"
import { selectCities, selectMonasteries, selectRoads } from "@/lib/helperFunctions";
import { aiMove } from "@/lib/ai/base_version/main";
import { getMap } from "@/lib/territory/map";
import { isClaimPossible } from "@/lib/claims/isClaimPossible";
import { leftoverChains } from "@/lib/completed/leftover";
import { scorePoints } from "@/lib/completed/score";
import { aiMoveV2 } from "@/lib/ai/v2/main";
import { copy } from "@/lib/ai/helper/copy";

const GridContext = createContext()

export function GridProvider({ children }) { 
    const emptyBoard = createEmptyBoard()
    const emptyMatrix = createEmptyMatrix()
    const emptyTerritory = createEmptyTerritory()

    const [board, setBoard] = useState(emptyBoard)
    const [validTiles, setValidTiles] = useState(emptyMatrix)
    
    const [stack, setStack] = useState(shuffleStack(tiles))
    const [claims, setClaims] = useState(new Map())

    const [currTile, setCurrTile] = useState(emptyTile)
    const [recentTile, setRecentTile] = useState({...emptyTile})
 
    const [playerTurn, setPlayerTurn] = useState(true)
    const [isClaimReady, setIsClaimReady] = useState(false)

    const [playerTerritory, setPlayerTerritory] = useState(emptyTerritory)
    const [opponentTerritory, setOpponentTerritory] = useState(createEmptyTerritory())
    const [playerChains, setPlayerChains] = useState([])
    const [opponentChains, setOpponentChains] = useState([])

    const [meeples, setMeeples] = useState({
        player: 7, 
        ai: 7
    })
    const [score, setScore] = useState({
        player: 0, 
        ai: 0
    })
    const [isGameFinished, setIsGameFinished] = useState(false)
    const [overview, setOverview] = useState(initOverview)

    const [state, setState] = useState([])
    const [idx, setIdx] = useState(1)

    const [aiIdx, setAiIdx] = useState(1)
    const versionMap = [aiMove, aiMoveV2]

    useEffect(() => {
        if (stack.length === 56) {
            preloadImages(stack)
        }
    }, [stack])

    function setup(preset, matrix, idx) {
        setBoard(preset)
        setValidTiles(matrix)

        setPlayerTerritory(emptyTerritory)
        setOpponentTerritory(createEmptyTerritory())

        setPlayerChains([])
        setOpponentChains([])

        setStack(shuffleStack(tiles))

        setMeeples({
            player: 7, 
            ai: 7
        })
        setScore({
            player: 0, 
            ai: 0
        })
        setOverview(initOverview)
        setIsGameFinished(false)
        setState([])

        setPlayerTurn(true)
        setIsClaimReady(false)
        setClaims(new Map())
        
        if (idx === 1) {
            setAiIdx(0)
            return 
        }
        setAiIdx(1)
    }

    const updateCell = (row, col, node, currClaims) => {
        const matrix = updateValidTiles(board, validTiles, row, col)
        const newBoard = copy(board)
        newBoard[row][col] = node
        
        updateStack()
        setBoard(newBoard)
        setValidTiles(matrix)
        setClaims(currClaims)
    }

    const updateStack = () => {
        if (!stack.length || stack.length === 1) {
            return 
        }
        const currStack = copy(stack)
        currStack.pop()

        const nextTile = currStack[currStack.length - 1]
        setStack(currStack)
        setCurrTile(nextTile)
    }

    useEffect(() => {
        if (isClaimReady && meeples.player <= 0) {
            setPlayerTurn(false)
            setIsClaimReady(false)
       } 
    }, [isClaimReady])

    useEffect(() => {
        if (isGameFinished) {
            setOverview(prev => ({
                player: {
                    ...prev.player, 
                    finalScore: score.player
                }, 
                ai: {
                    ...prev.ai, 
                    finalScore: score.ai
                }
            }))
        }
    }, [isGameFinished])
    
    // ai vs player
    useEffect(() => {
        if (!playerTurn && !isGameFinished) {
            const currAiMove = versionMap[aiIdx]
            const currMap = getMap(playerTerritory, playerChains, opponentTerritory, opponentChains)

            const move = currAiMove(board, currMap, validTiles, currTile, overview, "ai", meeples.ai)

            if (move.impossible) {
                setPlayerTurn(true)
                updateStack()
                return 
            }

            const map = move.map
            finishMove(move.row, move.col, move.node, move.claims, map.player.territory, map.ai.territory, map.player.chains, map.ai.chains, move.scores.player, move.scores.ai, move.stats, move.meeples)

            if (move.target.acquired) {
                const curr = [...board]
                curr[move.target.row][move.target.col].target = true
                setBoard(curr)
            }

            if (move.claim) {
                appendChain(move.claim.chain, map.ai.territory, move.claim.str)
            }
            else if (isClaimPossible(move.claims)) {
                
                if (stack.length <= 1) {
                    const map = getMap(playerTerritory, playerChains, opponentTerritory, opponentChains)
                    const leftover = leftoverChains(map)
                    const extraScore = scorePoints(leftover, map)
                    updateScore(Math.floor(extraScore.player / 2), Math.floor(extraScore.ai / 2))
                    setIsGameFinished(true)
                }
                setPlayerTurn(prev => !prev)
            }
        }
    }, [playerTurn])

    function finishMove(row, col, node, currClaims, playerMatrix, aiMatrix, playerChains, aiChains, playerScore, aiScore, stats, newMeeples) {
        updateCell(row, col, node, currClaims)
        updateTerritory(playerMatrix, aiMatrix, playerChains, aiChains)
        updateScore(playerScore, aiScore)
        setRecentTile(node)
        setOverview(stats)

        setMeeples(prev => ({
            player: prev.player + newMeeples.player,
            ai: prev.ai + newMeeples.ai
        }))

        if (!isClaimPossible(currClaims)) {
            if (stack.length <= 1) {
                const map = getMap(playerTerritory, playerChains, opponentTerritory, opponentChains)
                const leftover = leftoverChains(map)
                const extraScore = scorePoints(leftover, map)
                
                updateScore(Math.floor(extraScore.player / 2), Math.floor(extraScore.ai / 2))
                setIsGameFinished(true)
            }
            setPlayerTurn(prevTurn => !prevTurn)
        }
        else if (playerTurn) {
            setIsClaimReady(true)
        }
    }

    const appendChain = (chain, matrix, claim) => {
        if (playerTurn) {
            setIsClaimReady(false)
            setPlayerChains((prev) => [...prev, {
                chain: chain, 
                meeples: 1, 
                claim: claim
            }])
            setPlayerTerritory(matrix)
            setMeeples(prev => ({
                ...prev, 
                player: prev.player - 1
            }))
        }
        else {
            setOpponentChains((prev) => [...prev, {
                chain: chain, 
                meeples: 1, 
                claim: claim
            }])
            setOpponentTerritory(matrix)
            setMeeples(prev => ({
                ...prev, 
                ai: prev.ai - 1
            }))
        }
        if (stack.length <= 1) {
            const map = getMap(playerTerritory, playerChains, opponentTerritory, opponentChains)
            const leftover = leftoverChains(map)
            const extraScore = scorePoints(leftover, map)
            updateScore(Math.floor(extraScore.player / 2), Math.floor(extraScore.ai / 2))
            setIsGameFinished(true)
        }
        setPlayerTurn(prevTurn => !prevTurn)
    }

    function updateTerritory(playerMatrix, aiMatrix, playerChains, aiChains) {
        setPlayerTerritory(playerMatrix)
        setOpponentTerritory(aiMatrix)
        setPlayerChains(playerChains)
        setOpponentChains(aiChains)
    } 

    function updateScore(playerScore, aiScore) {
        setScore(prev => ({
            player: prev.player + playerScore, 
            ai: prev.ai + aiScore
        }))
    }
    
    const rotateClockwise = () => {
        const edges = [...currTile.edges]
        const end = edges.pop()
        edges.unshift(end)

        setCurrTile((prev) => ({
            ...prev, 
            rotate: (prev.rotate + 90) % 360,
            edges: edges
        }))
    }

    const rotateAntiClockwise = () => {
        const edges = [...currTile.edges]
        const start = edges.shift()
        edges.push(start)

        setCurrTile((prev) => ({
            ...prev, 
            rotate: (prev.rotate + 270) % 360,
            edges: edges
        }))
    }

    return (
        <GridContext.Provider value={{setAiIdx, setup, state, setState, idx, setIdx, overview, board, setBoard, meeples, updateTerritory, updateCell, stack, setStack, rotateClockwise, rotateAntiClockwise, currTile, setRecentTile, validTiles, setValidTiles, setCurrTile, playerTurn, setPlayerTurn, recentTile, setRecentTile, claims, playerTerritory, setPlayerTerritory, opponentTerritory, appendChain, playerChains, opponentChains, score, updateScore, finishMove, isClaimReady, setIsClaimReady, isGameFinished}}>
            {children}
        </GridContext.Provider>
    )
}

export default GridContext