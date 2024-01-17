'use client'

import Image from "next/image"
import { Popup } from "../Popup"
import { useState } from "react"
import Badge from "../../badges/Badge"

export function ClaimingTerritory() {
    const [toggle, setToggle] = useState(false)
    const [claim, setClaim] = useState("")

    function handleClick() {
        if (!claim) {
            setToggle(!toggle)
        }
    }

    return (
        <>
            <p>After placing a tile, multiple claims may be available for that tile. If a claim is available, the tile will have a gold border. The player can click on this square and select a claim.</p>
            <div className="flex justify-center w-full">
                <div className="flex flex-col items-center space-y-2">
                    {claim ? 
                        <h2 className="text-sm text-slate-400">{claim} claimed!</h2>
                        : 
                        <h2 className="text-sm text-slate-400">click on the tile to select a claim:</h2>
                    }
                    <div className="w-60 h-40 bg-light-brown relative">
                        <div className="absolute bottom-0 right-0 mb-xs">
                            <Image 
                                className="select-none rounded-sm"
                                src={"/roads/Adobe Scan 12 Sept 2023 (48)-1.png"}
                                width={80}
                                height={80}
                                alt="Tile"
                            />
                        </div>
                        <div className="absolute bottom-0 right-20 mb-xs">
                            {toggle &&
                                <Popup setToggle={setToggle} setClaim={setClaim}/>
                            }
                            <div
                                className={`w-20 h-20 hover:border hover:border-transparent ${!toggle && !claim && "border-4 border-yellow-500"}`}
                                onClick={handleClick}>
                                <Image 
                                    className="select-none rounded-sm"
                                    src={"/cities/Adobe Scan 12 Sept 2023 (35)-1.png"}
                                    width={80}
                                    height={80}
                                    alt="Tile"
                                />
                                {claim &&
                                    <Badge str="player" claim={claim} />
                                }
                            </div>
                        </div>
                        <div className="absolute top-0 right-20 mb-xs">
                            <Image 
                                className="select-none rounded-sm rotate-180"
                                src={"/cities/Adobe Scan 12 Sept 2023 (58)-1.png"}
                                width={80}
                                height={80}
                                alt="Tile"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <p>Making a claim is optional, as players may want to preserve a claim for more valuable territory.</p>
        </>
    )
}