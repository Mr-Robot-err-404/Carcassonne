'use client'

import { useEffect, useRef, useContext, useState } from "react"
import { DndContext } from '@dnd-kit/core'
import Grid from "./Grid"
import NavBar from "./NavBar"
import { adjustBoard, adjustTile, distanceToCenter, findCenter, initValidTiles, test} from "@/lib/gridSetup"
import TilePlaceholder from "./TilePlaceholder"
import { parseKey } from "@/lib/helperFunctions"
import GridContext from "../context/GridContext"
import { possibleClaims } from "@/lib/claims/possibleClaims"
import { Chain, Claim, Land, Territory, Tile } from "@/lib/interfaces"
import { appendClaims } from "@/lib/main/append"
import { filterClaims } from "@/lib/main/filter"
import { isMoveLegal } from "@/lib/main/legal"
import { getMap } from "@/lib/territory/map"
import Overview from "./Overview"

export default function Home({ preset, game }: any) {
  const { setBoard, setValidTiles, setCurrTile, stack, isGameFinished, updateTerritory, setRecentTile, setState, setStack, updateState } = useContext(GridContext)
  const [loading, setLoading] = useState(true)
  
  const ref: any = useRef(null)
  const center: number[] = findCenter(30, 50)
  
  useEffect(() => {
    if (ref.current) { 
      // const map = game[1].map
      // const board = game[1].board
      // const currStack = game[1].stack
      // const node = game[1].node
      // const next = game[1].next
      // setRecentTile(node)
      // setCurrTile(next)
      // updateState(map, board, currStack, node, next, matrix)
      // setState(game)
      
      const matrix = initValidTiles(preset)
      setCurrTile(stack[stack.length - 1])
      setValidTiles(matrix)
      setBoard(preset)
      setLoading(false)
      const [x, y] = distanceToCenter(center, window.innerWidth)
      ref.current.scrollTo(x, y)  
    }
  }, []) 

  return (
    <>
      <div ref={ref} className="w-full h-screen overflow-auto hide-scrollbar relative">
        <NavBar />
        <DndContext onDragEnd={(e) => handleDragEnd(e)}>
          {!loading && !isGameFinished &&
            <TilePlaceholder />
          }
          <Grid center={center}/>
        </DndContext>
        {isGameFinished && <Overview/>}
      </div>
    </>
  )
}

function handleDragEnd(e: any) {
  const { over, active } = e
  if (!over) {
    return
  } 

  const [row, col] = parseKey(over.id)
  const node: Tile = active.data.current.stackTile
  const board: Tile[][] = active.data.current.board

  if (isMoveLegal(board, node, row, col)) {
    node.row = row, node.col = col
    const playerTerritory: Land[][] = active.data.current.playerTerritory
    const playerChains: Chain[] = active.data.current.playerChains
    const opponentTerritory: Land[][] = active.data.current.opponentTerritory
    const opponentChains: Chain[] = active.data.current.opponentChains
    const finishMove = active.data.current.finishMove
    const overview = active.data.current.overview

    const claims: Claim = possibleClaims(node)
    const [currClaims, filteredClaims] = filterClaims(board, claims, node, playerTerritory, opponentTerritory, row, col)

    const map = getMap(playerTerritory, playerChains, opponentTerritory, opponentChains)
    const [scores, stats, meeples] = appendClaims(board, filteredClaims, node, map, row, col, overview)
    
    finishMove(row, col, node, currClaims, map.player.territory, map.ai.territory, map.player.chains, map.ai.chains, scores.player, scores.ai, map, stats, meeples)
  }
}