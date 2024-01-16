'use client'

import { useContext, useState } from "react"
import GridContext from "../context/GridContext"
import Scoreboard from "./Score"
import { BsArrowLeftCircle, BsArrowRightCircle } from 'react-icons/bs'
import BlueCity from "./badges/Badge"
import { Meeples } from "./Meeples"

interface Props {
    loading: boolean
}

export default function NavBar({ loading }: Props) {
    const { playerTurn, setPlayerTurn, board, state, idx, setIdx, meeples, setStart } = useContext(GridContext)
    const [hover, setHover] = useState(0)

    const handleNextMove = () => {
        setPlayerTurn(!playerTurn)
    }

    return (
        <div className="flex w-full h-16 bg-slate-800 sticky top-0 left-0 z-10 select-none">
            <div className="flex justify-between w-full items-center">
                <div className="md:px-10 px-5">
                    <h2 className="text-lg md:text-2xl">Carcassonne</h2>
                </div>
                {/* <Scoreboard/> */}
                {/* <h2 onClick={() => console.log(JSON.stringify(board))} className="text-lg hover:text-blue-500 cursor-pointer">Board</h2> */}
                <div>

                    {/* <div className="flex md:space-x-10 space-x-2 px-3 md:px-6">
                        <h2 onClick={() => setStart(true)} className="text-lg hover:text-blue-500 cursor-pointer">Start</h2>
                        <BsArrowLeftCircle
                            onClick={() => {
                                if (idx == 1) {
                                    return 
                                } 
                                setIdx((prev: number) => prev - 1)
                            }}
                            onMouseEnter={() => setHover(1)}
                            onMouseLeave={() => setHover(0)}
                            fill={hover == 1 ? "#2563eb" : "#f8fafc"}
                            size={25}
                        />
                        <BsArrowRightCircle
                            onClick={() => {
                                if (idx == state.length - 1) {
                                    return 
                                } 
                                setIdx((prev: number) => prev + 1)
                            }}
                            onMouseEnter={() => setHover(2)}
                            onMouseLeave={() => setHover(0)}
                            fill={hover == 2 ? "#2563eb" : "#f8fafc"}
                            size={25}
                        />
                        <h2 onClick={() => console.log(JSON.stringify(board))} className="text-lg hover:text-blue-500 cursor-pointer">Board</h2>
                        <h2 onClick={handleNextMove} className="text-sm md:text-lg hover:text-blue-500 cursor-pointer">Next turn</h2>
                        <div className="w-24">
                            <h2 className={`text-sm md:text-lg ${playerTurn ? "text-blue-500" : "text-orange-500"}`}>{playerTurn ? "Your move" : "Ai's move"}</h2>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    )
}