function setCities() {}
function setRoads() {}
function setMonasteries() {}

const cities: any[] = []
const roads: any[] = []
const monasteries: any[] = []

//Note: these functions would be set in context with useState
// cities, roads and monasteries would be fetched from tiles

const currMap: any = {
    "city": {
        arr: cities, 
        foo: setCities
    }, 
    "road": {
        arr: roads, 
        foo: setRoads
    }, 
    "monastery": {
        arr: monasteries, 
        foo: setMonasteries
    }
}

const currRotateClockwise = (str: string, idx: number) => {
    const arr = [...currMap[str].arr]
    const foo = currMap[str].foo

    const edges = arr[idx].edges
    const end = edges.pop()
    edges.unshift(end)

    const rotate = arr[idx].rotate
    arr[idx].rotate = (rotate + 90) % 360
    arr[idx].edges = edges

    foo(arr)
}

const currRotateAntiClockwise = (str: string, idx: number) => {
    const arr = [...currMap[str].arr]
    const foo = currMap[str].foo

    const edges = arr[idx].edges
    const start = edges.shift()
    edges.push(start)

    const rotate = arr[idx].rotate
    arr[idx].rotate = (rotate + 270) % 360
    arr[idx].edges = edges

    foo(arr)
}