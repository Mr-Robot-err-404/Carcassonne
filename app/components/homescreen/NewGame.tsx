'use client'

import Link from 'next/link'
import { Select } from './Select'
import { useState } from 'react'

const map = {
    ai: {
        first: {
            text: "Base version. Claims as much territory as possible but lacks awareness", 
            title: "Blind Greed"
        }, 
        second: {
            text: "May fight for contested areas and uses claims wisely. Makes for a good challenge", 
            title: "Cunning Tactician"
        }, 
        style: "border-t border-slate-400 mt-5"
    },
    mode: {
        first: {
            text: "Only the river tiles are placed to start. Recommended way to play", 
            title: "Standard"
        }, 
        second: {
            text: "Fight to claim large cities and twisted roads. Imbalanced chaos at its finest", 
            title: "Sandbox"
        }, 
        style: ""
    }
}

interface Options {
    [key: string]: string
    opponent: string
    map: string
}

interface Props {
    setToggle: React.Dispatch<React.SetStateAction<boolean>>
}

export default function NewGame({ setToggle }: Props) {
    const [options, setOptions] = useState<Options>({
        opponent: "1", 
        map: "1"
    })
    const [selected, setSelected] = useState(0)


    function handleOption(option: string, str: string) {
        setOptions(prev => ({
            ...prev, 
            [option]: str
        }))
    }

    return (
        <div className="flex sm:h-auto h-auto sm:menu-width w-full flex-col rounded-lg bg-slate-800 overflow-y-auto mt-14 md:mt-0">
            <div className="flex h-12 w-full items-center justify-center md:justify-start border-b border-slate-400">
                <h2 className="ml-4 text-lg text-white">Create new game</h2>
            </div>
            <div className="flex h-full w-full flex-col rounded-b-lg">
                <Select map={map.mode} type={"map"} handleOption={handleOption} options={options} selected={selected} setSelected={setSelected}/>
                <Select map={map.ai} type={"opponent"} handleOption={handleOption} options={options} selected={selected} setSelected={setSelected}/>

                <div className="flex justify-between items-center h-14 w-full rounded-b-lg px-8 border-t mt-4">
                    <button
                        onClick={() => setToggle(false)}
                        className="rounded-lg py-1 px-2 bg-blue-500 hover:bg-blue-400">Rules
                    </button>

                    <Link href={`/session/${options.opponent}-${options.map}-${selected}`}>
                        <button className="rounded-lg py-1 px-2 bg-green-500 hover:bg-green-400">Start</button>
                    </Link>
                </div>
            </div> 
        </div>
    )
}