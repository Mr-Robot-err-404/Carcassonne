"use client"

import { useContext, useState } from "react"
import GridContext from "../context/GridContext"

export default function Scoreboard() {
    const { score } = useContext(GridContext)
    return (
        <div>
            <div className="flex justify-center items-center h-full w-60">
                <h2 className="text-lg text-blue-400 mr-5">{score.player}</h2>
                                        -
                <h2 className="text-lg text-orange-400 ml-5">{score.ai}</h2>
            </div>
        </div>
    )
}