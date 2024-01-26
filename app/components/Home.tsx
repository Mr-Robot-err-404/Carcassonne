'use client'

import { useEffect, useRef, useContext, useState, MouseEvent } from "react"
import { DndContext } from '@dnd-kit/core'
import Grid from "./Grid"
import NavBar from "./NavBar"
import { distanceToCenter, initValidTiles, adjustTile } from "@/lib/gridSetup"
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
import { Scoreboard } from "./Scoreboard"

interface Props {
  preset: Tile[][]
  idx: number
}

export default function Home({ preset, idx }: Props) {
  const { isGameFinished, setup} = useContext(GridContext)
  const [loading, setLoading] = useState(true)

  const [isDragging, setIsDragging] = useState(false);
  const [currentPos, setCurrentPos] = useState({ x: 0, y: 0 });
  
  const [center, setCenter] = useState({x: 0, y: 0})
  const ref: React.MutableRefObject<HTMLInputElement | null> = useRef(null);
  
  useEffect(() => {
    if (ref.current) { 
      
      const matrix = initValidTiles(preset)
      setup(preset, matrix, idx)

      setLoading(false)
      const [x, y] = distanceToCenter([15, 25], window.innerWidth)

      setCenter({x: x, y: y})
      setCurrentPos({ x: x, y: y })
      
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
      const targetScrollLeft = ref.current.scrollLeft - dx;
      const targetScrollTop = ref.current.scrollTop - dy;

      ref.current.scrollTo({
        left: targetScrollLeft,
        top: targetScrollTop,
      });

      setCurrentPos({ x: e.clientX, y: e.clientY });
    }
  }

  return (
    <>
      <div ref={ref} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={() => setIsDragging(false)} className="w-full h-screen overflow-auto hide-scrollbar relative">
        <NavBar loading={loading} center={center} currRef={ref}/>
        <Scoreboard loading={loading}/>
        <DndContext onDragEnd={(e) => handleDragEnd(e)}>
          {!loading && !isGameFinished &&
            <TilePlaceholder/>
          }
          <Grid center={[15, 25]}/>
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

    finishMove(row, col, node, currClaims, map.player.territory, map.ai.territory, map.player.chains, map.ai.chains, scores.player, scores.ai, stats, meeples)
  }
}
