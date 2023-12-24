'use client'

import { useContext } from "react"
import GridContext from "../context/GridContext"

export default function Overview() {
    const { overview } = useContext(GridContext)
    const keys = Object.keys(overview.player)
    const strMap: {[key: string]: string} = {
        "finalScore": "final score",
        "cities": "cities completed",
        "roads": "roads completed", 
        "monasteries": "monasteries",
        "stolenCities": "cities stolen", 
        "stolenRoads": "roads stolen", 
        "maxCity": "largest city", 
        "maxRoad": "longest road"
    }
    return (
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex w-96 flex-col rounded-lg bg-slate-800 border border-slate-500 z-30">
                <div className="flex flex-row w-full">
                    <div className="flex h-auto w-40 flex-col items-center rounded-l-lg border-r border-slate-600">
                        <div className="flex h-10 w-full items-center justify-center bg-slate-700 rounded-tl-lg">
                            <h2 className="text-md text-white">Results</h2>
                        </div>
                        <div className="flex h-full w-full flex-col space-y-1 rounded-bl-lg py-2">
                            {keys.map((key: string, i: number) => {
                                const title = strMap[key]
                                return (
                                    <div className="flex w-full items-center border-b border-slate-600">
                                        <h2 className="text-md px-2 text-white">{title}</h2>
                                    </div>
                                )
                            })}    
                        </div>
                    </div>
                    <div className="flex h-auto w-28 flex-col border-r border-slate-600">
                        <div className="flex h-10 w-full items-center justify-center bg-slate-700">
                            <h2 className="text-md text-white">You</h2>
                        </div>
                        <div className="flex h-full w-full flex-col space-y-1 py-2">
                            {keys.map((key: string) => {
                                return (
                                    <div className="flex w-full justify-center border-b border-slate-600">
                                        <h2 className="text-md px-2 text-blue-500">{overview.player[key]}</h2>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="flex h-auto w-28 flex-col rounded-r-lg">
                        <div className="flex h-10 w-full items-center justify-center bg-slate-700 rounded-tr-lg">
                            <h2 className="text-md text-white">Avg Joe</h2>
                        </div>
                        <div className="flex h-full w-full flex-col space-y-1 rounded-r-lg py-2">
                            {keys.map((key: string) => {
                                return (
                                    <div className="flex w-full justify-center border-b border-slate-600">
                                        <h2 className="text-md px-2 text-orange-500">{overview.ai[key]}</h2>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className="flex justify-between items-center h-14 w-full bg-slate-700 rounded-b-lg px-8">
                    <button className="rounded-lg py-1 px-2 bg-blue-500 hover:bg-blue-400">Play again</button>
                    <button className="rounded-lg py-1 px-2 bg-green-500 hover:bg-green-400">Done</button>
                </div>
            </div>
    )
}