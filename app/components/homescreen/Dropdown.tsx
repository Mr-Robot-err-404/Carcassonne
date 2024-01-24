'use client'

import { useState } from "react"
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { RiArrowDropDownLine } from "react-icons/ri";

interface Option {
    text: string
    style: string
}

const options = [
    { text: "citadel", style: "rounded-t-md" },
    { text: "crossroads", style: "" },
    { text: "haven", style: "" },
    { text: "labyrinth", style: "" },
    { text: "megacity", style: "" },
    { text: "metropolis", style: "rounded-b-md" },
];
  
interface Props {
    selected: number
    setSelected: React.Dispatch<React.SetStateAction<number>>
}

export function Dropdown({ selected, setSelected }: Props) {
    const [toggle, setToggle] = useState(false)

    function handleClick(idx: number) {
        setSelected(idx)
        setToggle(false)
    }

    return (
        <>
            <div
                onClick={() => setToggle(!toggle)}
                className="flex px-1 mb-1 items-center space-x-1 border hover:border-slate-300 border-slate-500 rounded-sm">
                    <h2 className={`text-md text-white`}>{options[selected].text}</h2>
                    <RiArrowDropDownLine size={20} color={"#f1f5f9"}/>
            </div>
            {toggle &&
            <div className="absolute inline-block h-auto w-32 translate-y-24 rounded-md bg-slate-600 z-20">
                <ul>
                    {options.map((curr: Option, idx: number) => {
                        return (
                            <li onClick={() => handleClick(idx)}
                                className={`w-full cursor-default ${curr.style} px-3 py-1 hover:bg-slate-700`}>
                                <h2 className="text-sm text-white">{curr.text}</h2>
                            </li>
                        )
                    })}
                </ul>
            </div>}
        </>
    )
}