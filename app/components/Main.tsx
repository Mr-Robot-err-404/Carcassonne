'use client'

import { Tile } from "@/lib/interfaces"
import { GridProvider } from "../context/GridContext"
import Home from "./Home"

interface Props {
    preset: Tile[][]
    idx: number
}

export default function Main({ preset, idx }: Props) {
    return (
        <GridProvider>
            <Home preset={preset} idx={idx}/>
        </GridProvider>
    )
}