'use client'

import { Tile } from "@/lib/interfaces"
import Image from "next/image"
import { useDroppable } from "@dnd-kit/core"
import { useContext, useState } from "react"
import GridContext from "../context/GridContext"
import ClaimPopup from "./ClaimPopup"
import { isClaimPossible } from "@/lib/claims/isClaimPossible"
import Badge from "./badges/Badge"
import { isBadgeActive } from "@/lib/claims/isBadgeActive"
import { isBadgeValid } from "@/lib/claims/validBadge"

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
    const [isNodeClaimed, setIsNodeClaimed] = useState(false)
    const { validTiles, playerTurn, playerTerritory, opponentTerritory, claims, isClaimReady } = useContext(GridContext)
    const {isOver, setNodeRef} = useDroppable({
        id: `${row}-${col}`,
    })
    const currBadge = isBadgeActive(playerTerritory, opponentTerritory, row, col)
    const isValid = isBadgeValid(currBadge)

    return (
        <div className="relative">
            {isRecentTile && isClaimPossible(claims) && !isNodeClaimed && isClaimReady &&
                <ClaimPopup toggle={toggle} setToggle={setToggle} isNodeClaimed={isNodeClaimed} setIsNodeClaimed={setIsNodeClaimed} row={row} col={col}/>
            }
            <div
            onClick={() => setToggle(!toggle)}
            ref={validTiles[`${row}`][`${col}`] ? setNodeRef : null}
            className={`h-full bg-transparent w-20 hover:border hover:border-transparent ${isRecentTile && isClaimPossible(claims) && !isNodeClaimed && isClaimReady && 'border-4 border-yellow-500'} ${playerTerritory.length && playerTerritory[row][col].claims.length && "border-2 border-green-400"} ${opponentTerritory.length && opponentTerritory[row][col].claims.length && "border-2 border-orange-500"} ${playerTerritory.length && playerTerritory[row][col].claims.length && opponentTerritory[row][col].claims.length && "border-2 border-purple-500"}  ${isOver ? "border-green-500 border-2" : ""} flex-shrink-0`}>
            {tile.img && 
                <Image
                    className={`select-none ${tile.rotate === 90 ? "rotate-90" : tile.rotate === 180 ? "rotate-180" : tile.rotate === 270 && "-rotate-90"} rounded-sm`}
                    src={tile.img}
                    width={80}
                    height={80}
                    alt="Tile" 
                />
            }
            {isValid &&
                <Badge str={currBadge.str} claim={currBadge.claim} idx={currBadge.idx}/>
            }
            </div> 
        </div>
    )
}