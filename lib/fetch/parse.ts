export function parseId(key: string): number[] {
    const res = []
    const arr = key.split("-")

    for (let i = 0; i < arr.length; i++) {
        const int = parseInt(arr[i])
        res.push(int)
    }
    return res
}
