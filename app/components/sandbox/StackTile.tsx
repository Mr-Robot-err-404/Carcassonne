'use client'

import { useContext } from 'react'
import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities';
import GridContext from '@/app/context/GridContext';
import { Tile } from '@/lib/interfaces';

interface Props {
    currTile: Tile
    id: string
}

export default function StackTile({ currTile, id }: Props) {
    const { updateCell, board, overview, updateTerritory, setRecentTile, playerTerritory, playerChains, opponentTerritory, opponentChains, updateScore, finishMove, isClaimReady, playerTurn } = useContext(GridContext)
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: id,
        data: {
            stackTile: currTile, 
            updateCell: updateCell, 
            board: board, 
            setRecentTile: setRecentTile, 
            playerTerritory: playerTerritory, 
            playerChains: playerChains, 
            opponentTerritory: opponentTerritory, 
            opponentChains: opponentChains, 
            updateTerritory: updateTerritory, 
            updateScore: updateScore, 
            finishMove: finishMove, 
            overview: overview
        }
    })
    
    const style = {
        transform: CSS.Translate.toString(transform),
    } 

    return (
        <>
            <div
                className={`flex items-center justify-center bg-light-brown w-24 h-24 rounded-lg select-none`}>
                <div
                    style={style}
                    ref={playerTurn ? setNodeRef : null}
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



 