'use client'

import { useState } from "react"
import NewGame from "./NewGame"
import { Rules } from "./rules/Rules"

export function Setup() {
    const [toggle, setToggle] = useState(false)
    return (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-24">
            {toggle &&
                <NewGame />
            }
            {!toggle &&
                <Rules />
            }
        </div>
    )
}