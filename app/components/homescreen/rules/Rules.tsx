'use client'

import { Intro } from "./Intro"
import { Dragging } from "./Dragging"
import { Legal } from "./Legal"
import { ClaimingTerritory } from "./Claim"
import { Cities } from "./Cities"
import { Roads } from "./Roads"
import { Monastery } from "./Monastery"
import { Contested } from "./Contested"
import { Ready } from "./Ready"
import { useState } from "react"

interface Slide {
    title: string
    component: React.FC
}

const slides: Slide[] = [
    {
        title: "Welcome to Carcassonne!", 
        component: Intro
    }, 
    {
        title: "Making a Move", 
        component: Dragging
    }, 
    {
        title: "Legal Moves", 
        component: Legal
    }, 
    {
        title: "Claiming Territory", 
        component: ClaimingTerritory
    }, 
    {
        title: "Claiming a City", 
        component: Cities
    }, 
    {
        title: "Claiming a Road", 
        component: Roads
    }, 
    {
        title: "Monasteries", 
        component: Monastery
    }, 
    {
        title: "Contested Territory", 
        component: Contested
    }, 
    {
        title: "The Scoreboard", 
        component: Ready
    }, 
]

export function Rules() {
    const [curr, setCurr] = useState(slides[3])
    const [idx, setIdx] = useState(3)
    return (
        <div className="relative flex min-h-screen flex-col justify-center overflow-hidden py-6 sm:py-12">
            <div className="relative bg-slate-800 px-6 pb-8 pt-10 shadow-xl ring-1 ring-slate-300 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
                <div className="mx-auto max-w-md">
                    <h2 className="text-2xl text-slate-200">{curr.title}</h2>
                    <div className="divide-y divide-gray-300/50">
                        <div className="space-y-6 py-8 text-base leading-7 text-slate-300">
                            {curr.component({})}
                        </div>
                        <div className="flex items-center justify-between pt-8">
                            {idx === 0 ?
                                <button className="rounded-lg py-1 px-2 bg-blue-500 hover:bg-blue-400">Skip rules</button>
                                : 
                                <button className="rounded-lg py-1 px-2 bg-blue-500 hover:bg-blue-400">Back</button>
                            }
                            <button className="rounded-lg py-1 px-2 bg-green-500 hover:bg-green-400">Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}