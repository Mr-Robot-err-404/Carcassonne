'use client'

import { useState } from "react"
import { AiOutlineDownCircle } from "react-icons/ai"

interface Props {
    setToggle: React.Dispatch<React.SetStateAction<boolean>>
    setClaim:  React.Dispatch<React.SetStateAction<string>>
}

export function Popup({ setToggle, setClaim }: Props) {
    const [selected, setSelected] = useState("")
    const [hover, setHover] = useState(0)

    return (
        <>
            <div className="absolute z-10 inline-block w-40 h-24 bg-gray-800 rounded-md popover-y-container -translate-x-10">
                <div className="flex flex-col space-y-1 py-1">
                    <div className="flex justify-between pl-2 pr-1">
                        <h2 className="text-sm text-slate-300">Road</h2>
                        {selected === "road" ? 
                            <svg fill="#40C057" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="20px" height="20px"><path d="M 25 2 C 12.317 2 2 12.317 2 25 C 2 37.683 12.317 48 25 48 C 37.683 48 48 37.683 48 25 C 48 20.44 46.660281 16.189328 44.363281 12.611328 L 42.994141 14.228516 C 44.889141 17.382516 46 21.06 46 25 C 46 36.579 36.579 46 25 46 C 13.421 46 4 36.579 4 25 C 4 13.421 13.421 4 25 4 C 30.443 4 35.393906 6.0997656 39.128906 9.5097656 L 40.4375 7.9648438 C 36.3525 4.2598437 30.935 2 25 2 z M 43.236328 7.7539062 L 23.914062 30.554688 L 15.78125 22.96875 L 14.417969 24.431641 L 24.083984 33.447266 L 44.763672 9.046875 L 43.236328 7.7539062 z"/></svg>
                            :
                            <AiOutlineDownCircle
                                onClick={() => setSelected("road")}
                                onMouseEnter={() => setHover(1)}
                                onMouseLeave={() => setHover(0)}
                                fill={hover === 1 ? "#2563eb" : "#f8fafc"}
                                size={22}
                            />
                        }
                        
                    </div>
                    <div className="flex justify-between pl-2 pr-1">
                        <h2 className="text-sm text-slate-300">City</h2>
                        {selected === "city" ? 
                            <svg fill="#40C057" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="20px" height="20px"><path d="M 25 2 C 12.317 2 2 12.317 2 25 C 2 37.683 12.317 48 25 48 C 37.683 48 48 37.683 48 25 C 48 20.44 46.660281 16.189328 44.363281 12.611328 L 42.994141 14.228516 C 44.889141 17.382516 46 21.06 46 25 C 46 36.579 36.579 46 25 46 C 13.421 46 4 36.579 4 25 C 4 13.421 13.421 4 25 4 C 30.443 4 35.393906 6.0997656 39.128906 9.5097656 L 40.4375 7.9648438 C 36.3525 4.2598437 30.935 2 25 2 z M 43.236328 7.7539062 L 23.914062 30.554688 L 15.78125 22.96875 L 14.417969 24.431641 L 24.083984 33.447266 L 44.763672 9.046875 L 43.236328 7.7539062 z"/></svg>
                            :
                            <AiOutlineDownCircle
                                onClick={() => setSelected("city")}
                                onMouseEnter={() => setHover(2)}
                                onMouseLeave={() => setHover(0)}
                                fill={hover === 2 ? "#2563eb" : "#f8fafc"}
                                size={22}
                            />
                        }
                    </div>
                </div>
            </div>

            {selected &&
                <button
                    onClick={() => {
                        setToggle(false)
                        setClaim(selected)
                    }}
                    className="absolute z-10 -translate-y-9 translate-x-4 px-1 bg-green-500 border-2 border-transparent hover:border-slate-300 rounded-md text-sm">
                    Claim
                </button>
            }
            <div className="absolute z-20 w-2 h-2 bg-gray-800 translate-x-9 popover-y-arrow rotate-45"></div>
        </>
    )
}