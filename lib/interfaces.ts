export interface Tile {
    img: string
    edges: string[]
    rotate: number
    row?: number
    col?: number
    end?: boolean
    monastery?: boolean
    shield?: boolean
    type?: string
    misaligned?: boolean
    id?: number
    empty?: boolean
    unjoined?: boolean
    village?: boolean
    deadEnd?: boolean
}

export interface Land {
    node: Tile
    claims: string[]
    edgeIndices: number[]
    row: number
    col: number
}

export interface Claim {
    road?: number, 
    city?: number, 
    monastery?: number
    edgeIndices?: number[]
}


