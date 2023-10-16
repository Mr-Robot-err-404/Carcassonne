'use client'

import { Tile } from "@/lib/interfaces"
import Image from "next/image"
import { useDroppable } from "@dnd-kit/core"
import { useContext, useState } from "react"
import GridContext from "../context/GridContext"
import ClaimPopup from "./ClaimPopup"


interface NodeProps {
    isNodeCenter: boolean
    row: number
    col: number
    tile: Tile
    key?: string
    isRecentTile?: boolean
}

export default function Node({ isNodeCenter, row, col, tile, isRecentTile }: NodeProps) {
    const [toggle, setToggle] = useState(false)
    const { validTiles } = useContext(GridContext)
    const {isOver, setNodeRef} = useDroppable({
        id: `${row}-${col}`,
    })

    return (
        <div className="relative">
            {isRecentTile &&
                <ClaimPopup toggle={toggle} setToggle={setToggle} row={row} col={col} />
            }
            <div
            onClick={() => setToggle(!toggle)}
            ref={validTiles[`${row}`][`${col}`] ? setNodeRef : null}
            className={`h-full bg-transparent w-20 hover:border hover:border-transparent ${isOver ? "border-green-500 border-2" : ""} ${isNodeCenter && "bg-slate-600"} flex-shrink-0`}>
            {tile.img && 
                <Image
                    className={`select-none ${tile.rotate === 90 ? "rotate-90" : tile.rotate === 180 ? "rotate-180" : tile.rotate === 270 && "-rotate-90"} rounded-sm`}
                    src={tile.img}
                    width={80}
                    height={80}
                    alt="Tile" 
                />
            }
            </div> 
        </div>
    )
}