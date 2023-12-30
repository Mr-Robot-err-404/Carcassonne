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
    claimed?: boolean
}

export interface Land {
    node: Tile
    claims: string[]
    edgeIndices: number[]
    row: number
    col: number
    claimed?: string
    claimedIdx?: number
    complete: string[]
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
    [key: string]: { idx: number, claim: string, extra?: boolean }[]
}

export interface Overlap {
    chain: ChainNode[]
    playerMeeples: number
    aiMeeples: number
    claim: string
}

export interface Score {
    [key: string]: number
    player: number
    ai: number
}

export interface Claim {
    road?: number, 
    city?: number, 
    monastery?: number
    edgeIndices?: number[]
    [key: string]: number | number[] | undefined;
}


export interface PotentialClaim {
    chain: ChainNode[], 
    str: string, 
    matrix: Land[][]
    idx?: number, 
    weight: number
}

export interface PlayerChain {
    chain: ChainNode[]
    node: Tile
    overlap: boolean, 
    edgeIdx?: number
}
export interface Territory {
    [key: string]: {territory: Land[][], chains: Chain[]}
    player: {
        territory: Land[][]
        chains: Chain[]
    }
    ai: {
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
export interface Stats {
    [key: string] : number
    finalScore: number
    cities: number
    roads: number
    monasteries: number
    stolenCities: number
    stolenRoads: number
    maxCity: number
    maxRoad: number
}

export interface Overview {
    [key: string]: Stats, 
    player: Stats, 
    ai: Stats
}

export interface Meeple {
    [key: string]: number
    player: number
    ai: number
}