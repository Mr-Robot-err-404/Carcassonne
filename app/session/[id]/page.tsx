import { fetch, fetchGame } from "@/lib/fetch/preset"
import Home from "../../components/Home"
import { parseId } from "@/lib/fetch/parse"
import { Tile } from "@/lib/interfaces"

interface Params {
  params: {
    id: string
  }
}

export default async function Main({ params }: Params) {
  const { id }  = params
  const [aiIdx, mapIdx, sandbox] = parseId(id)
  
  const preset: Tile[][] = await fetch(mapIdx, sandbox, id)

  if (!preset) {
    throw new Error("404")
  }

  return (
    <Home preset={preset} idx={aiIdx}/>
  )
}
