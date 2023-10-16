'use client'

import { useEffect, useRef, useContext, useState } from "react"
import { DndContext } from '@dnd-kit/core'
import Grid from "./Grid"
import NavBar from "./NavBar"
import { distanceToCenter, findCenter, initValidTiles } from "@/lib/gridSetup"
import TilePlaceholder from "./TilePlaceholder"
import { parseKey } from "@/lib/helperFunctions"
import GridContext from "../context/GridContext"
import { appendClaims, filterClaims, isMoveLegal, possibleClaims } from "@/lib/inGameFunctions"
import { Claim, Land, Tile } from "@/lib/interfaces"

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
    const playerTerritory: Land[][] = active.data.current.playerTerritory
    const playerChains: Tile[][] = active.data.current.playerChains
    const opponentTerritory: Land[][] = active.data.current.opponentTerritory
    const opponentChains: Tile[][] = active.data.current.opponentChains
    const claims: Claim = possibleClaims(node)
    const [currClaims, filteredClaims] = filterClaims(claims, node, playerTerritory, row, col)

    appendClaims(board, filteredClaims, node, playerTerritory, playerChains, opponentTerritory, opponentChains, row, col)

    const updateCell = active.data.current.updateCell
    const setRecentTile = active.data.current.setRecentTile
    updateCell(row, col, node, currClaims)
    setRecentTile(node)
  }
}