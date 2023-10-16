'use client'

import { useContext } from "react"
import GridContext from "../context/GridContext"

export default function NavBar() {
    const { playerTurn, board } = useContext(GridContext)

    return (
        <div className="flex w-full h-16 bg-slate-800 sticky top-0 left-0 z-10 select-none">
            <div className="flex w-full justify-between items-center">
                <div className="md:px-10 px-5">
                    <h2 className="text-lg md:text-2xl">Carcassonne</h2>
                </div>
                <div className="flex md:space-x-16 space-x-5">
                    <h2 onClick={() => console.log(JSON.stringify(board))} className="text-lg hover:text-blue-500 cursor-pointer">Board</h2>
                </div>
                <div>
                    <div className="flex md:space-x-10 space-x-2 px-3 md:px-6">
                        <h2 className="text-sm md:text-lg hover:text-blue-500 cursor-pointer">New game</h2>
                        <h2 className="text-sm md:text-lg hover:text-blue-500 cursor-pointer">Difficulty</h2>
                        <h2 className="text-sm md:text-lg hover:text-blue-500 cursor-pointer">Rules</h2>
                        <h2 className="text-sm md:text-lg hover:text-blue-500 cursor-pointer">About</h2>
                        <div className="w-24">
                            <h2 className={`text-sm md:text-lg ${playerTurn ? "text-blue-500" : "text-orange-500"}`}>{playerTurn ? "Your move" : "Ai's move"}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}