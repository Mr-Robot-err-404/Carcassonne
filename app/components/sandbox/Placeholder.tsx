'use client'

import { useContext } from 'react'
import { RxRotateCounterClockwise } from 'react-icons/rx'
import Image from 'next/image'
import GridContext from '@/app/context/GridContext'
import StackTile from './StackTile'
import { Tile } from '@/lib/interfaces'

interface Props {
    currTile: Tile
    position: string
    id: string
    type: string
    idx: number
}

export default function Placeholder({currTile, position, id, type, idx}: Props) {
    const { currRotateClockwise, currRotateAntiClockwise } = useContext(GridContext)

    return (
        <div className={`fixed ${position} w-60 stack-h flex justify-center items-center rounded-r-lg border-2 border-slate-600  bg-slate-400 z-20`}>
            <Image
                className="absolute top-0 left-0 select-none rounded-r-lg"
                alt=""
                src="/wood-textures/wood.jpg"
                quality={100}
                width={240}
                height={128}
                style={{
                    objectFit: 'contain',
                }}
            />
            <div className="flex items-center justify-center bg-light-brown w-24 h-24 border-4 border-light-brown rounded-lg z-10">
                <StackTile currTile={currTile} id={id} />
            </div>
            <div className="absolute ml-40">
                <div className='flex flex-col space-y-2'>
                    <div onClick={() => currRotateClockwise(type, idx)} className="flex justify-center items-center scale-x-[-1] hover:bg-slate-400 rounded-full cursor-pointer w-10 h-10">
                        <RxRotateCounterClockwise className="ml-1" size={23}/>
                    </div>
                    <div onClick={() => currRotateAntiClockwise(type, idx)} className="flex justify-center items-center hover:bg-slate-400 rounded-full cursor-pointer w-10 h-10">
                        <RxRotateCounterClockwise className="ml-1" size={23}/>
                    </div>
                </div>
            </div>
        </div>
    )
}