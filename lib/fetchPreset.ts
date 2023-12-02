import path from 'path';
import { promises as fs } from 'fs';

export async function fetchPreset(idx: number) {
    const jsonDirectory = path.join(process.cwd(), 'app/beauties')
    const data = await fs.readFile(jsonDirectory + `/heart.json`, 'utf8')
    return JSON.parse(data)
}