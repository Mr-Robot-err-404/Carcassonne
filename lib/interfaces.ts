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

export interface Chain {
    chain: ChainNode[]
    meeples: number
    claim: string
}

export interface ChainNode {
    node: Tile, 
    edgeIdx?: number
}

export interface Completed {
    player: { idx: number, claim: string }[]
    ai: { idx: number, claim: string }[]
}

export interface Overlap {
    chain: ChainNode[]
    playerMeeples: number
    aiMeeples: number
    claim: string
}

export interface Score {
    player: number
    ai: number
}

export interface Claim {
    road?: number, 
    city?: number, 
    monastery?: number
    edgeIndices?: number[]
}

export interface PlayerChain {
    chain: ChainNode[]
    node: Tile
    overlap: boolean
}
export interface Territory {
    player: {
        territory: Land[][]
        chains: Chain[]
    }
    ai: {
        territory: Land[][]
        chains: Chain[]
    }
    player3?: {
        territory: Land[][]
        chains: Chain[]
    }
}

export interface Curr {
    node: Tile, 
    idx: number, 
    row: number, 
    col: number, 
    edgeIdx: number
}

export interface Neighbor {
    str: string, 
    idx: number
}

