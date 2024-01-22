import { fetch, fetchGame } from "@/lib/fetch/preset"
import Home from "../../components/Home"
import { parseId } from "@/lib/fetch/parse"

interface Params {
  params: {
    id: string
  }
}

export default async function Main({ params }: Params) {
  const { id }  = params
  const [aiIdx, mapIdx, sandbox] = parseId(id)
  
  const preset = await fetch(mapIdx, sandbox, id)
  // const game = await fetchGame()

  return (
    <Home preset={preset} idx={aiIdx}/>
  )
}
