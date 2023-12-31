import { fetchGame, fetchPreset } from "@/lib/fetchPreset";
import Home from "./components/Home"
import { randomIndex } from "@/lib/helperFunctions";

export default async function Main() {
  const idx = randomIndex(12) + 1
  const preset = await fetchPreset(idx)
  // const game = await fetchGame()
  
  return (
    <Home preset={preset} />
  )
}