'use client'

import Badge from "./badges/Badge"

interface Props {
    type: string
    int: number
}

export function Meeples({ type, int }: Props) {
    const arr = new Array(int).fill(false)
    const spacing: {[key: number]: string} = {
        0: "-left-4", 
        1: "left-4", 
        2: "left-12", 
        3: "left-20", 
        4: "left-28",
        5: "left-36",
        6: "left-44"
    }

    return (
        <div className="w-60 h-12">
            <div className="relative w-full ml-3">
                {arr.map((_, idx) => {
                    const str = spacing[idx]
                    return <Badge str={type} claim="empty" spacing={str}/>
                })}
            </div>
        </div>
    )
}