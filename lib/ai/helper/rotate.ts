import { Tile } from "../../interfaces";

export function rotateNode(node: Tile, rotate: number) {
    if (rotate === 0) {
        return 
    }
    const map: {[key: number]: number} = {
        90: 1, 
        180: 2, 
        270: 3, 
        360: 4
    }
    const target = map[rotate]

    for (let i = 0; i < target; i++) {
        const end = node.edges.pop() as string
        node.edges.unshift(end)
    }
    node.rotate = rotate
}
