'use client'

import { useEffect, useRef, useContext, useState } from "react"
import { DndContext } from '@dnd-kit/core'
import Grid from "./Grid"
import NavBar from "./NavBar"
import { distanceToCenter, findCenter, initValidTiles } from "@/lib/gridSetup"
import TilePlaceholder from "./TilePlaceholder"
import { parseKey } from "@/lib/helperFunctions"
import GridContext from "../context/GridContext"
import { possibleClaims } from "@/lib/claims/possibleClaims"
import { Chain, Claim, Land, Territory, Tile } from "@/lib/interfaces"
import { appendClaims } from "@/lib/main/append"
import { filterClaims } from "@/lib/main/filter"
import { isMoveLegal } from "@/lib/main/legal"

export default function Home({ preset }: any) {
  const { setBoard, setValidTiles, setCurrTile, stack } = useContext(GridContext)
  const [loading, setLoading] = useState(true)
  
  const ref: any = useRef(null)
  const center: number[] = findCenter(30, 50)
  
  useEffect(() => {
    if (ref.current) { 
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
          {!loading &&
            <TilePlaceholder />
          }
          <Grid center={center}/>
        </DndContext>
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

    const claims: Claim = possibleClaims(node)
    const [currClaims, filteredClaims] = filterClaims(board, claims, node, playerTerritory, opponentTerritory, row, col)
    
    const [map, scores] = appendClaims(board, filteredClaims, node, playerTerritory, playerChains, opponentTerritory, opponentChains, row, col)
    
    const updateCell = active.data.current.updateCell
    const setRecentTile = active.data.current.setRecentTile
    const updateTerritory = active.data.current.updateTerritory
    const updateScore = active.data.current.updateScore

    updateCell(row, col, node, currClaims)
    updateTerritory(map.player.territory, map.ai.territory, map.player.chains, map.ai.chains)
    updateScore(scores.player, scores.ai)
    setRecentTile(node)
  }
}