'use client'

import { useContext, useState } from "react"
import GridContext from "../context/GridContext"
import Scoreboard from "./Score"
import { BsArrowLeftCircle, BsArrowRightCircle } from 'react-icons/bs'
import { Meeples } from "./Meeples"
import { BiTargetLock } from "react-icons/bi"

interface Props {
    loading: boolean
    center: {
        x: number
        y: number
    }
    currRef: React.MutableRefObject<HTMLInputElement | null>
}

export default function NavBar({ loading, center, currRef }: Props) {
    const { playerTurn, setPlayerTurn, isClaimReady, setIsClaimReady } = useContext(GridContext)
    const [hover, setHover] = useState(0)

    const handleNextMove = () => {
        setPlayerTurn(!playerTurn)
    }

    function pass() {
        setIsClaimReady(false)
        setPlayerTurn(false)
    }

    return (
        <div className="flex w-full h-16 bg-slate-800 sticky top-0 left-0 z-10 select-none">
            <div className="flex w-full items-center relative">
                <div className="md:px-10 px-5">
                    <h2 className="text-lg md:text-2xl text-white">Carcassonne</h2>
                </div>
                <div className="absolute left-52 mt-1">
                    <div
                        onClick={() => currRef.current?.scrollTo(center.x, center.y)}
                        className="flex justify-center items-center hover:bg-slate-600 rounded-full cursor-pointer w-10 h-10">
                            <BiTargetLock size={20} fill={"white"} />
                    </div> 
                </div> 
                {playerTurn && isClaimReady &&
                <div onClick={pass} className="absolute left-72 mt-1">
                    <button className="px-3 py-1 border border-slate-500 rounded-sm text-md hover:border-slate-300">Pass</button>
                </div>}
            </div>
        </div>
    )
}