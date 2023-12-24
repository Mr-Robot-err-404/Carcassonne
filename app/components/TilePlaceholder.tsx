'use client'

import { useContext } from 'react'
import { RxRotateCounterClockwise } from 'react-icons/rx'
import Image from 'next/image'
import GridContext from "../context/GridContext"
import StackTile from './StackTile'


export default function TilePlaceholder() {
    const { rotateCurrTile } = useContext(GridContext)
   
    return (
        <div className="fixed top-16 left-0 w-60 stack-h flex justify-center items-center rounded-r-lg border-2 border-slate-600  bg-slate-400 z-20">
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
                <StackTile/>
            </div>
            <div className="absolute ml-40 scale-x-[-1]">
                <div onClick={rotateCurrTile} className="flex justify-center items-center hover:bg-slate-400 rounded-full cursor-pointer w-10 h-10">
                    <RxRotateCounterClockwise className="ml-1" size={23}/>
                </div>
            </div>
            
        </div>
    )
}