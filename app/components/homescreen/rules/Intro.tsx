import Image from "next/image"

export function Intro() {
    return (
        <>
            <p>Based on the popular board game created by Klaus-Jürgen Wrede, Carcasssonne is a classic game of simple strategy. These are the three main components of the game:</p>
            <div className="px-10 flex flex-col items-center space-y-3 sm:flex-row sm:space-x-10 sm:space-y-0">
                <div className="flex w-20 flex-col justify-center space-y-2">
                    <div className="h-20">
                        <Image 
                            className="select-none rounded-sm"
                            src={"/cities/Adobe Scan 12 Sept 2023 (28)-1.png"}
                            width={80}
                            height={80}
                            alt="Tile"
                        />
                    </div>
                    <p className="text-sm text-slate-400">Tile with a city</p>
                </div>
                <div className="flex w-20 flex-col justify-center space-y-2">
                    <div className="h-20">
                        <Image 
                            className="select-none rounded-sm"
                            src={"/roads/Adobe Scan 12 Sept 2023 (18)-1.png"}
                            width={80}
                            height={80}
                            alt="Tile"
                        />
                    </div>
                    <p className="text-sm text-slate-400">Tile with a road</p>
                </div>
                <div className="flex w-20 flex-col justify-center space-y-2">
                    <div className="h-20">
                        <Image 
                            className="select-none rounded-sm"
                            src={"/monastery/Adobe Scan 12 Sept 2023 (25)-1.png"}
                            width={80}
                            height={80}
                            alt="Tile"
                        />
                    </div>
                    <p className="text-sm text-slate-400">Tile with a monastery</p>
                </div>
            </div>
            <p>During the game, you and the opponent will expand the board using similar tiles, with the option of claiming a city, road or monastery. The goal is to score the most points by the end.</p>
        </>
    )
}