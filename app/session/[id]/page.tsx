import { fetchGame, fetchPreset } from "@/lib/fetchPreset"
import Home from "../../components/Home"
import { parseKey, randomIndex } from "@/lib/helperFunctions"

interface Params {
  params: {
    id: string
  }
}

export default async function Main({ params }: Params) {
  const { id }  = params
  const [aiIdx, mapIdx] = parseKey(id)
  const idx = randomIndex(12) + 1
  const preset = await fetchPreset(idx)
  // const game = await fetchGame()

  return (
    <Home preset={preset}/>
  )
}