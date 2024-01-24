'use client'

import { useEffect, useRef, useContext, useState, MouseEvent } from "react"
import { DndContext } from '@dnd-kit/core'
import Grid from "../Grid"
import { distanceToCenter, findCenter, initValidTiles} from "@/lib/gridSetup"
import { parseKey } from "@/lib/helperFunctions"
import GridContext from "@/app/context/GridContext"
import { possibleClaims } from "@/lib/claims/possibleClaims"
import { Chain, Claim, Land, Territory, Tile } from "@/lib/interfaces"
import { appendClaims } from "@/lib/main/append"
import { filterClaims } from "@/lib/main/filter"
import { isMoveLegal } from "@/lib/main/legal"
import { getMap } from "@/lib/territory/map"
import Overview from "../Overview"
import Placeholder from "./Placeholder"

//This is only used for building the sandbox maps

export default function HomeSandbox({ preset }: any) {
  const { setBoard, setValidTiles, setCurrTile, stack, isGameFinished, updateTerritory, setRecentTile, setState, setStack, updateState } = useContext(GridContext)
  const [loading, setLoading] = useState(true)
  const [isDragging, setIsDragging] = useState(false);
  const [currentPos, setCurrentPos] = useState({ x: 0, y: 0 });
  const {cities, roads, monasteries} = useContext(GridContext)
  
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
      setCurrentPos({x: x, y: y})
      ref.current.scrollTo(x, y)  
    }
  }, []) 

  function handleMouseDown(e: MouseEvent) {
    if (e.button === 2) {
      setIsDragging(true);
      setCurrentPos({ x: e.clientX, y: e.clientY });
      return 
    }
    setIsDragging(false)
  }

  function handleMouseMove(e: MouseEvent) {
    if (isDragging && ref.current) {
      const dx = e.clientX - currentPos.x;
      const dy = e.clientY - currentPos.y;
      ref.current.scrollLeft -= dx;
      ref.current.scrollTop -= dy;
      setCurrentPos({ x: e.clientX, y: e.clientY });
    }
  }

  const position: {[key: number]: string} = {
    0: "top-16 left-0", 
    1: "top-48 left-0", 
    2: "top-80 left-0",
    3: "bottom-0 left-0", 
    4: "bottom-32 left-0", 
    5: "bottom-64 left-0",
    6: "bottom-0 right-0", 
    7: "bottom-0 right-60", 
    8: "bottom-0 right-120", 
    9: "bottom-0 left-60",
    10: "bottom-0 left-120", 
    11: "top-48 right-60"
}
    
  const pos: {[key: number]: string} = {
      0: "top-16 right-0", 
      1: "top-48 right-0", 
      2: "top-80 right-0" , 
      3: "bottom-32 right-0",  
      4: "bottom-64 right-0",  
  }
  

  return (
    <>
      <div ref={ref} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={() => setIsDragging(false)} className="w-full h-screen overflow-auto hide-scrollbar relative">
        <DndContext onDragEnd={(e) => handleDragEnd(e)}>
          {!loading && !isGameFinished &&
            <>
              {cities.map((tile: Tile, idx: number) => {
              return <Placeholder currTile={cities[idx]} position={position[idx]} id={`city-${idx}`} type="city" idx={idx}/>
            })}        
              {roads.map((tile: Tile, idx: number) => {
              return <Placeholder currTile={roads[idx]} position={pos[idx]} id={`road-${idx}`} type="road" idx={idx}/>
            })}        
              {monasteries.map((tile: Tile, idx: number) => {
              return <Placeholder currTile={monasteries[idx]} position="top-16 right-60" id={`monastery-${idx}`} type="monastery" idx={idx}/>
            })}        
            </>
            
          }
          <Grid center={center} />
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
