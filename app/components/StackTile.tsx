'use client'

import { useContext } from 'react'
import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities';
import GridContext from "../context/GridContext"

export default function StackTile() {
    const { currTile, updateCell, board, setRecentTile, playerTerritory, playerChains } = useContext(GridContext)
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: 'stack-tile',
        data: {
            stackTile: currTile, 
            updateCell: updateCell, 
            board: board, 
            setRecentTile: setRecentTile, 
            playerTerritory: playerTerritory, 
            playerChains: playerChains
        }
    })
    
    const style = {
        transform: CSS.Translate.toString(transform),
    }

    return (
        <>
            <div
                className={`flex items-center justify-center bg-slate-500 w-24 h-24 rounded-lg select-none`}>
                <div
                    style={style}
                    ref={setNodeRef}
                    {...listeners} {...attributes}
                    className={`w-20 h-20 rounded-md z-30`}>
                    <img
                        className={`select-none ${currTile.rotate === 90 ? "rotate-90" : currTile.rotate === 180 ? "rotate-180" : currTile.rotate === 270 && "-rotate-90"}`}
                        src={currTile.img}
                        alt="StackTile"
                    />
                </div>
            </div>
        </>
    )
}



 