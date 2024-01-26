'use client'

import { useContext } from "react"
import Node from "./Node"
import { isCenter } from "@/lib/gridSetup"
import GridContext from "../context/GridContext"
import { Tile } from "@/lib/interfaces"
import Image from "next/image"
import { placedTile } from "@/lib/helperFunctions"

export default function Grid({ center }: { center: number[]}) {
    const { board, recentTile } = useContext(GridContext)
    
    return (
        <>
            <div className="grid-dimensions relative select-none bg-slate-800">
                <Image
                    className="absolute top-0 left-0 select-none"
                    alt=""
                    src="/background.jpg"
                    quality={100}
                    width={4000}
                    height={2000}
                    style={{
                        objectFit: 'cover',
                    }}
                    priority={true}
                />
                {board.map((curr: Tile[], i: number) => {
                    return (
                    <div key={i} className='flex w-full h-20'>
                        
                        {board[i].map((tile: Tile, j: number) => {
                            const isNodeCenter = isCenter(i, j, center) 
                            let isRecentTile = false

                            if (placedTile(tile, recentTile)) {
                                isRecentTile = true
                            }
                            
                            return <Node row={i} col={j} tile={tile} isNodeCenter={isNodeCenter} isRecentTile={isRecentTile} key={`${i}-${j}`}/>
                        })}
                    </div>) 
                })}
            </div> 
        </>
    )
}
