import Image from "next/image"
import Badge from "../../badges/Badge"

export function Cities() {
    return (
        <>
            <p>A city is complete when it is fully surrounded by walls. As with roads, a city placed that is connected to an opponent's city cannot directly be claimed. </p>
            <div className="flex w-full justify-center">
                <div className="h-40 w-60 bg-light-brown relative">
                    <div className="absolute left-0 bottom-0">
                        <Image 
                            className="select-none rounded-sm rotate-90"
                            src={"/cities/Adobe Scan 12 Sept 2023 (59)-1.png"}
                            width={80}
                            height={80}
                            alt="Tile"
                        />
                    </div>
                    <div className="absolute top-0 right-0">
                        <Image 
                            className="select-none rounded-sm -rotate-90"
                            src={"/cities/Adobe Scan 12 Sept 2023 (58)-1.png"}
                            width={80}
                            height={80}
                            alt="Tile"
                        />
                        <Badge str="player" claim="city"/>
                    </div>
                    <div className="absolute bottom-0 left-20">
                        <Image 
                            className="select-none rounded-sm -rotate-90"
                            src={"/cities/Adobe Scan 12 Sept 2023 (28)-1.png"}
                            width={80}
                            height={80}
                            alt="Tile"
                        />
                    </div>
                    <div className="absolute top-0 right-20">
                        <Image 
                            className="select-none rounded-sm rotate-90"
                            src={"/cities/Adobe Scan 12 Sept 2023 (28)-1.png"}
                            width={80}
                            height={80}
                            alt="Tile"
                        />
                    </div>
                </div>
            </div>
            <p>When a city is complete, each tile is worth 2 points and the claim is returned to that player to be used again. Cities may have a shield which is worth an extra 2 points.</p>
        </>
    )
}