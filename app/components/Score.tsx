"use client"

import { useContext, useState } from "react"
import GridContext from "../context/GridContext"

export default function Scoreboard() {
    const { score } = useContext(GridContext)
    return (
        <div className="flex justify-between w-40">
            <div className="flex items-center px-5">
                <h2 className="text-slate-400 text-lg">Score</h2>
            </div>
            <div className="flex justify-between items-center h-full w-28">
                <h2 className="text-lg text-blue-400">{score.player}</h2>
                                        -
                <h2 className="text-lg text-orange-500">{score.ai}</h2>
            </div>
        </div>
    )
}