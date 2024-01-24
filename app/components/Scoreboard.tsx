'use client'

import { useContext } from "react"
import { Meeples } from "./Meeples"
import GridContext from "../context/GridContext"

interface Props {
    loading: boolean
}

export function Scoreboard({ loading }: Props) {
    const { meeples, score } = useContext(GridContext)

    return (
        <div className="fixed top-7 right-0 z-40">
            <div className="relative">
                <div className="flex h-44 w-80 flex-col rounded-l-lg bg-slate-800">
                    <div className="flex h-10 w-full items-center justify-between border-b border-slate-400">
                        <h2 className="p-1 ml-1 text-xl text-slate-300">Scoreboard</h2>
                        <div className="flex justify-between space-x-2 mr-20">
                            <h2 className="p-1 text-lg text-blue-400">{score.player}</h2>
                            <h2 className="p-1 text-lg text-white">-</h2>
                            <h2 className="p-1 text-lg text-orange-500">{score.ai}</h2>
                        </div>
                    </div>
                    <div className="flex h-full w-full bg-slate-800 rounded-b-lg">
                        <div className="flex flex-col h-full w-14 border-r border-slate-400">
                            <div className="flex justify-center items-center h-1/2">
                                <h2 className="text-lg text-blue-400">You</h2>
                            </div>
                            <div className="flex justify-center items-center h-1/2">
                                <h2 className="text-lg text-orange-500">Ai</h2>
                            </div>
                        </div>
                        <div className="flex flex-col w-full h-full bg-slate-800">
                            <div className="flex items-center h-1/2 border-b border-slate-400">
                                {!loading &&
                                    <Meeples type="hero" int={meeples.player}
                                />}
                            </div>
                            <div className="flex items-center h-1/2 border-b border-slate-400">
                                {!loading &&
                                    <Meeples type="enemy" int={meeples.ai}
                                />}
                            </div>
                        </div>
                    </div>  
                </div>
            </div>
        </div>
    )
}