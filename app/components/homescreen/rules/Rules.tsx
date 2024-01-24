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
import { useEffect, useState } from "react"
import { IoIosRadioButtonOff, IoIosRadioButtonOn } from "react-icons/io"
import { Navigating } from "./Navigating"

interface Slide {
    title: string
    component: React.FC
}

interface Props {
    setToggle: React.Dispatch<React.SetStateAction<boolean>>
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
        title: "Completing a Road", 
        component: Roads
    }, 
    {
        title: "Completing a City", 
        component: Cities
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
        title: "Navigating the Board", 
        component: Navigating
    },
    {
        title: "The Scoreboard", 
        component: Ready
    }, 
]

const radios = new Array(10).fill(true)


export function Rules({setToggle}: Props) {
    const [curr, setCurr] = useState(slides[0])
    const [idx, setIdx] = useState(0)

    useEffect(() => {
        setCurr(slides[idx])
    }, [idx])

    function handleNext() {
        if (idx < 9) {
            setIdx(prev => prev + 1)
        }
    }

    function handleBack() {
        if (idx >= 0) {
            setIdx(prev => prev - 1)
        }
    }

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
                                <button
                                    onClick={() => setToggle(true)}
                                    className="rounded-lg py-1 px-2 bg-blue-500 hover:bg-blue-400 text-slate-200">Skip rules</button>
                                : 
                                <button
                                    onClick={handleBack}
                                    className="rounded-lg py-1 px-2 bg-blue-500 hover:bg-blue-400 text-slate-200">Back
                                </button>
                            }

                            <div className="flex justify-center space-x-1 w-60 mr-2">
                                {radios.map((_, i) => {
                                    return (
                                        <div key={i}>
                                            {i === idx ? 
                                                <IoIosRadioButtonOn size={15} color={"#f1f5f9"} />
                                                : 
                                                <IoIosRadioButtonOff
                                                    onClick={() => setIdx(i)}
                                                    size={15}
                                                    color={"#f1f5f9"}
                                                />
                                            } 
                                        </div>
                                    )
                                })}
                            </div>

                            {idx <= 8 &&
                            <button
                                onClick={handleNext}
                                className="rounded-lg py-1 px-2 bg-green-500 hover:bg-green-400 text-slate-200">Next
                            </button>
                            }
                            {idx >= 9 && 
                            <button
                                onClick={() => setToggle(true)}
                                className="rounded-lg py-1 px-1 sm:px-2 bg-green-500 hover:bg-green-400 text-slate-200">Get started
                            </button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}