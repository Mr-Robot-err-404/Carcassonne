'use client'

import ClaimOption from './ClaimOption'
import { useContext, useState } from 'react'
import GridContext from '../context/GridContext'
import { capitalizeFirstLetter, dirIdxMap, dirMap } from '@/lib/helperFunctions'
import { copy } from '@/lib/ai/helper/copy'
import { claimFunction } from '@/lib/territory/claimMap'

interface Props {
    setToggle: React.Dispatch<React.SetStateAction<boolean>>,
    isNodeClaimed: boolean, 
    setIsNodeClaimed: React.Dispatch<React.SetStateAction<boolean>>
    row: number,
    col: number
}

export default function ClaimPopup({ setToggle, isNodeClaimed, setIsNodeClaimed, row, col }: Props) {
    const [selected, setSelected] = useState<string>("")
    const [dir, setDir] = useState<string>("")
    const { claims, recentTile, board, playerTerritory, opponentTerritory, appendChain, playerTurn } = useContext(GridContext)

    const arr: string[] = Object.keys(claims)

    function handleClaim() {
        setToggle(false)

        if (isNodeClaimed) {
            return 
        }

        const territory = playerTurn ? playerTerritory : opponentTerritory
        const str: string = copy(selected).toLowerCase()

        if (!str.length) {
            return 
        }

        const idx = dirIdxMap[dir] 

        const createClaim = claimFunction[str]
        const [chain, matrix] = createClaim(board, recentTile, row, col, territory, idx)

        appendChain(chain, matrix, str)
        setIsNodeClaimed(true)
    }
   
    return (
        <div>
            <div className="absolute z-20 inline-block w-40 h-24 bg-gray-800 rounded-md popover-y-container -translate-x-10">
                <div className="flex flex-col space-y-1 py-2">
                    {arr.map((key: string) => {
                        if (key === "edgeIndices") {
                            return <div key={"Hello there!"}></div>
                        }
                        const int = claims[key]
                        const str = capitalizeFirstLetter(key)

                        if (int === 0) {
                            return 
                        }
                        if ((key === "road" && recentTile.village) || (key === "city" && recentTile.unjoined)) {
                            const map = dirMap(recentTile, key)
                            return (
                                <div key={`${key}-0`} className='flex justify-between px-2'>
                                    <h2 className='text-sm text-slate-300'>{str}</h2>
                                    {claims.edgeIndices.map((idx: string) => {
                                        return (
                                            <>
                                                {selected === str && dir === map[idx] ?
                                                    <svg key={`${idx}-${idx}`} fill="#40C057" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="20px" height="20px"><path d="M 25 2 C 12.317 2 2 12.317 2 25 C 2 37.683 12.317 48 25 48 C 37.683 48 48 37.683 48 25 C 48 20.44 46.660281 16.189328 44.363281 12.611328 L 42.994141 14.228516 C 44.889141 17.382516 46 21.06 46 25 C 46 36.579 36.579 46 25 46 C 13.421 46 4 36.579 4 25 C 4 13.421 13.421 4 25 4 C 30.443 4 35.393906 6.0997656 39.128906 9.5097656 L 40.4375 7.9648438 C 36.3525 4.2598437 30.935 2 25 2 z M 43.236328 7.7539062 L 23.914062 30.554688 L 15.78125 22.96875 L 14.417969 24.431641 L 24.083984 33.447266 L 44.763672 9.046875 L 43.236328 7.7539062 z"/></svg>
                                                    :
                                                    <ClaimOption key={`${idx}`} setSelected={setSelected} setDir={setDir} title={str} width="" dir={map[idx]} />
                                                }
                                            </>
                                        )
                                    })}
                                </div>
                            )
                        }
                        else return (
                            <div key={key} className="flex justify-between pl-2 pr-option">
                                <h2 className="text-sm text-slate-300">{str}</h2>
                                {selected === str ?
                                    <div className="flex justify-end w-9 px-sm">
                                        <svg fill="#40C057" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="20px" height="20px"><path d="M 25 2 C 12.317 2 2 12.317 2 25 C 2 37.683 12.317 48 25 48 C 37.683 48 48 37.683 48 25 C 48 20.44 46.660281 16.189328 44.363281 12.611328 L 42.994141 14.228516 C 44.889141 17.382516 46 21.06 46 25 C 46 36.579 36.579 46 25 46 C 13.421 46 4 36.579 4 25 C 4 13.421 13.421 4 25 4 C 30.443 4 35.393906 6.0997656 39.128906 9.5097656 L 40.4375 7.9648438 C 36.3525 4.2598437 30.935 2 25 2 z M 43.236328 7.7539062 L 23.914062 30.554688 L 15.78125 22.96875 L 14.417969 24.431641 L 24.083984 33.447266 L 44.763672 9.046875 L 43.236328 7.7539062 z"/></svg>
                                    </div>
                                    :
                                    <ClaimOption setSelected={setSelected} setDir={setDir} title={str} width='w-9'/>
                                }
                            </div>
                        )
                    })}
                </div>
            </div>
            {selected &&
            <button
                className={`absolute z-20 -translate-y-9 translate-x-4 px-1 text-slate-200 bg-green-500 border-2 border-transparent hover:border-slate-300 rounded-md text-sm`}
                onClick={handleClaim}
            >
                Claim
            </button>}
            <div className="absolute z-20 w-2 h-2 bg-gray-800 translate-x-9 popover-y-arrow rotate-45"></div>
        </div>
    )
}