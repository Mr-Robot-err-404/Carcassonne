'use client'

import { useContext } from "react"
import GridContext from "../context/GridContext"
import { Land } from "@/lib/interfaces"
import { landChain } from "@/lib/helperFunctions"
import Scoreboard from "./Scoreboard"

export default function NavBar() {
    const { playerTurn, setPlayerTurn, board, playerTerritory, opponentTerritory } = useContext(GridContext)

    const handleNextMove = () => {
        setPlayerTurn(!playerTurn)
    }

    function whatAboutTheDroidAttackOnTheWookies() {
        if (playerTurn) {
            const arr = landChain(playerTerritory)
            console.log("Player land chain: ", arr)
            return
        }
        const arr = landChain(opponentTerritory)
        console.log("AI land chain: ", arr)
    }

    return (
        <div className="flex w-full h-16 bg-slate-800 sticky top-0 left-0 z-10 select-none">
            <div className="flex w-full justify-between items-center">
                <div className="md:px-10 px-5">
                    <h2 className="text-lg md:text-2xl">Carcassonne</h2>
                </div>
                <Scoreboard/>
                <div>
                    <div className="flex md:space-x-10 space-x-2 px-3 md:px-6">
                        <h2 onClick={() => console.log(JSON.stringify(board))} className="text-lg hover:text-blue-500 cursor-pointer">Board</h2>
                        <h2 onClick={whatAboutTheDroidAttackOnTheWookies} className="text-sm md:text-lg hover:text-blue-500 cursor-pointer">Land</h2>
                        <h2 onClick={handleNextMove} className="text-sm md:text-lg hover:text-blue-500 cursor-pointer">Next turn</h2>
                        <div className="w-24">
                            <h2 className={`text-sm md:text-lg ${playerTurn ? "text-blue-500" : "text-orange-500"}`}>{playerTurn ? "Your move" : "Ai's move"}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}