import path from 'path';
import { promises as fs } from 'fs';

export async function fetchPreset(idx: number) {
    const jsonDirectory = path.join(process.cwd(), 'app/presets')
    const data = await fs.readFile(jsonDirectory + `/v${idx}.json`, 'utf8')
    return JSON.parse(data)
}

export async function fetchGame() {
    const jsonDirectory = path.join(process.cwd(), 'app/games/main_event')
    const data = await fs.readFile(jsonDirectory + `/somePeople.json`, 'utf8')
    return JSON.parse(data)
}