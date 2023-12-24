import { Territory } from "../interfaces";

export function copy(map: any) {
    return JSON.parse(JSON.stringify(map))
}