import { fetch } from "@/lib/fetch/preset"
import { parseId } from "@/lib/fetch/parse"
import { Tile } from "@/lib/interfaces"
import Main from "@/app/components/Main"

interface Params {
  params: {
    id: string
  }
}

export default async function Page({ params }: Params) {
  const { id }  = params
  const [aiIdx, mapIdx, sandbox] = parseId(id)
  
  const preset: Tile[][] = await fetch(mapIdx, sandbox, id)

  if (!preset) {
    throw new Error("404")
  }

  return (
    <Main preset={preset} idx={aiIdx}/>
  )
}
