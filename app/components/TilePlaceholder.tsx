'use client'

import { useContext } from 'react'
import { RxRotateCounterClockwise } from 'react-icons/rx'
import GridContext from "../context/GridContext"
import StackTile from './StackTile'


export default function TilePlaceholder() {
    const { rotateCurrTile } = useContext(GridContext)
   
    return (
        <div className="fixed top-16 left-0 w-60 h-36 flex justify-center items-center rounded-lg border-2 border-slate-600  bg-slate-400 z-20">
            <div className="flex items-center justify-center bg-slate-500 w-24 h-24 border-4 border-slate-500 rounded-lg">
                <StackTile/>
            </div>
            <div className="absolute ml-40 scale-x-[-1]">
                <div onClick={rotateCurrTile} className="flex justify-center items-center hover:bg-slate-500 rounded-full cursor-pointer w-10 h-10">
                    <RxRotateCounterClockwise className="ml-1" size={23}/>
                </div>
            </div>
        </div>
    )
}