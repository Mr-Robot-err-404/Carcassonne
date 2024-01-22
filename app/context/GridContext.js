import { riverTiles, tiles, emptyTile } from "@/lib/nodes";
import { createEmptyBoard, createEmptyMatrix, createEmptyTerritory, shuffleStack, test } from "@/lib/gridSetup";
import { createContext, useEffect, useState } from "react";
import { outerSquare, randomizeRiver, updateValidTiles, overview, initOverview } from "@/lib/inGameFunctions"
import { selectCities, selectMonasteries, selectRoads } from "@/lib/helperFunctions";
import { aiMove } from "@/lib/ai/base_version/main";
import { getMap } from "@/lib/territory/map";
import { isClaimPossible } from "@/lib/claims/isClaimPossible";
import { copy } from "@/lib/ai/helper/copy";
import { initValidTiles } from "@/lib/gridSetup";
import { leftoverChains } from "@/lib/completed/leftover";
import { scorePoints } from "@/lib/completed/score";
import { aiMoveV2 } from "@/lib/ai/v2/main";
import { fetchCities } from "../components/sandbox/helper/cities";
import { fetchRoads } from "../components/sandbox/helper/roads";
import { fetchMonasteries } from "../components/sandbox/helper/monasteries";

const GridContext = createContext()

export function GridProvider({ children }) { 
    const emptyBoard = createEmptyBoard()
    const emptyMatrix = createEmptyMatrix()
    const emptyTerritory = createEmptyTerritory()

    const [board, setBoard] = useState(emptyBoard)
    const [validTiles, setValidTiles] = useState(emptyMatrix)
    
    const [stack, setStack] = useState(shuffleStack(selectCities(tiles)))
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

    const [map, setMap] = useState({
        player: {
            territory: [], 
            chains: [], 
        },
        ai: {
            territory: [], 
            chains: [],
        }
    })
    const [state, setState] = useState([])
    const [idx, setIdx] = useState(1)
    const [start, setStart] = useState(false)

    const [aiIdx, setAiIdx] = useState(1)
    const versionMap = [aiMove, aiMoveV2]

    // useEffect(() => {
    //     // console.clear()
    //     console.log(JSON.stringify(state))
    // }, [playerTurn])

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
    
    // useEffect(() => {
    //     if (!state.length) {
    //         return 
    //     }

    //     const map = state[idx].map
    //     const board = state[idx].board
    //     const currStack = state[idx].stack
    //     const node = state[idx].node
    //     const next = state[idx].next
    //     const matrix = initValidTiles(board)
    //     const curr = state[idx].meeples
    //     const stats = state[idx].overview

    //     updateState(map, board, currStack, node, next, matrix, curr, stats)

    // }, [idx])
    
    function updateState(map, board, currStack, node, next, matrix, curr, stats) {
        setCurrTile(next)
        setRecentTile(node)
        setBoard(board)
        setStack(currStack)
        setMeeples (curr)
        updateTerritory(map.player.territory, map.ai.territory, map.player.chains, map.ai.chains)
        setValidTiles(matrix)
        setOverview(stats)
    }
    // ai vs player
    useEffect(() => {
        // const newState = {
        //     map: copy(map), 
        //     node: copy(recentTile), 
        //     next: copy(currTile), 
        //     board: copy(board), 
        //     stack: copy(stack), 
        //     turn: playerTurn,
        //     score: copy(score), 
        //     meeples: copy(meeples), 
        //     overview: copy(overview)
        // }
        // setState(prev => [...prev, newState])

        if (!playerTurn && !isGameFinished) {
            const currAiMove = versionMap[aiIdx]
            const currMap = getMap(playerTerritory, playerChains, opponentTerritory, opponentChains)

            const move = currAiMove(board, currMap, validTiles, currTile, overview, "ai", meeples.ai)
            const map = move.map
            finishMove(move.row, move.col, move.node, move.claims, map.player.territory, map.ai.territory, map.player.chains, map.ai.chains, move.scores.player, move.scores.ai, map, move.stats, move.meeples)

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

    
    // // let the chaos commence
    // useEffect(() => {
    //     if (start) {
    //         const currMap = getMap(playerTerritory, playerChains, opponentTerritory, opponentChains)
    //         const move = aiMove(board, currMap, validTiles, currTile, overview, "player", meeples.player)
    //         const map = move.map
    //         finishMove(move.row, move.col, move.node, move.claims, map.player.territory, map.ai.territory, map.player.chains, map.ai.chains, move.scores.player, move.scores.ai, map, move.stats, move.meeples)
            
    //         if (move.claim) {
    //             appendChain(move.claim.chain, map["player"].territory, move.claim.str)
    //         }
    //     }
    // }, [start])

    // //ai plays itself
    // useEffect(() => {
    //     // const newState = {
    //     //     map: copy(map), 
    //     //     node: copy(recentTile), 
    //     //     next: copy(currTile), 
    //     //     board: copy(board), 
    //     //     stack: copy(stack), 
    //     //     turn: playerTurn,
    //     //     score: copy(score), 
    //     //     meeples: copy(meeples)
    //     // }
    //     // setState(prev => [...prev, newState])
        
    //     let hero = 'player'
    //     if (!playerTurn) {
    //         hero = 'ai'
    //     }
    //     const currMove = versionMap[hero]

    //     if (!isGameFinished && start) {
    //         setTimeout(() => {
    //             const currMap = getMap(playerTerritory, playerChains, opponentTerritory, opponentChains)
    //             const move = currMove(board, currMap, validTiles, currTile, overview, hero, meeples[hero])

    //             if (move.impossible) {
    //                 updateStack()
    //                 setPlayerTurn(prev => !prev)
    //                 return 
    //             }

    //             const map = move.map
    //             finishMove(move.row, move.col, move.node, move.claims, map.player.territory, map.ai.territory, map.player.chains, map.ai.chains, move.scores.player, move.scores.ai, map, move.stats, move.meeples)
                
    //             if (move.claim) {
    //                 appendChain(move.claim.chain, map[hero].territory, move.claim.str)
    //             }
    //             else if (isClaimPossible(move.claims)) { 
    //                 if (stack.length <= 1) {
    //                     const map = getMap(playerTerritory, playerChains, opponentTerritory, opponentChains)
    //                     const leftover = leftoverChains(map)
    //                     const extraScore = scorePoints(leftover, map)
    //                     updateScore(Math.floor(extraScore.player / 2), Math.floor(extraScore.ai / 2))
    //                     setIsGameFinished(true)
    //                 }
    //                 setPlayerTurn(prev => !prev)
    //             }
    //         }, 400)
    //     }
    // }, [playerTurn])
    
    function finishMove(row, col, node, currClaims, playerMatrix, aiMatrix, playerChains, aiChains, playerScore, aiScore, map, stats, newMeeples) {
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
            setMap(map)
            setPlayerTurn(prevTurn => !prevTurn)
        }
        else if (playerTurn) {
            setIsClaimReady(true)
        }
    }
    
    const updateCell = (row, col, node, currClaims) => {
        const matrix = updateValidTiles(board, validTiles, row, col)
        const newBoard = [...board]
        newBoard[row][col] = node
        
        setBoard(newBoard)
        setValidTiles(matrix)
        setClaims(currClaims)
        updateStack()
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

            setMap(prev => ({
                ...prev, 
                player: {
                    territory: matrix, 
                    chains: [...prev.player.chains, {
                        chain: chain, 
                        meeples: 1, 
                        claim: claim
                    }]
                }
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

            setMap(prev => ({
                ...prev, 
                ai: {
                    territory: matrix, 
                    chains: [...prev.ai.chains, {
                        chain: chain, 
                        meeples: 1, 
                        claim: claim
                    }]
                }
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

        setMap({
            player: {
                territory: playerMatrix, 
                chains: playerChains
            },
            ai: {
                territory: aiMatrix, 
                chains: aiChains
            },
        })
    } 

    function updateScore(playerScore, aiScore) {
        setScore(prev => ({
            player: prev.player + playerScore, 
            ai: prev.ai + aiScore
        }))
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
        <GridContext.Provider value={{setAiIdx, state, setState, updateState, idx, setIdx, overview, board, setBoard, setStart, meeples, updateTerritory, updateCell, stack, setStack, rotateClockwise, rotateAntiClockwise, currTile, setRecentTile, validTiles, setValidTiles, setCurrTile, playerTurn, setPlayerTurn, recentTile, setRecentTile, claims, playerTerritory, setPlayerTerritory, opponentTerritory, appendChain, playerChains, opponentChains, score, updateScore, finishMove, isClaimReady, isGameFinished}}>
            {children}
        </GridContext.Provider>
    )
}

export default GridContext