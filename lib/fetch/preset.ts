import path from 'path'
import { promises as fs } from 'fs'
import { randomIndex } from '../helperFunctions'

const keys = ["citadel", "crossroads", "haven", "labyrinth", "megacity", "metropolis"]

const options = ["1-1-0",  "2-1-0", "1-2-0", "1-2-1", "1-2-2", "1-2-3", "1-2-4", "1-2-5", "2-2-0", "2-2-1", "2-2-2", "2-2-3", "2-2-4", "2-2-5"]

export async function fetch(mapIdx: number, currIdx: number, id: string) {

    if (!options.includes(id)) {
        return undefined
    }

    if (mapIdx === 2) {
        const key = keys[currIdx]
        const jsonDirectory = path.join(process.cwd(), 'app/sandbox')
        const data = await fs.readFile(jsonDirectory + `/${key}.json`, 'utf8')

        return JSON.parse(data)
    }

    const idx = randomIndex(12) + 1
    const jsonDirectory = path.join(process.cwd(), 'app/presets')
    const data = await fs.readFile(jsonDirectory + `/v${idx}.json`, 'utf8')

    return JSON.parse(data)
}

export async function fetchGame() {
    const jsonDirectory = path.join(process.cwd(), 'app/testing')
    const data = await fs.readFile(jsonDirectory + `/rick.json`, 'utf8')
    return JSON.parse(data)
}