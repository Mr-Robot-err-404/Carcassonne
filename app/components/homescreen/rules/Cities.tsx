import Image from "next/image"
import Badge from "../../badges/Badge"

export function Cities() {
    return (
        <>
            <p>A city is complete when it is fully surrounded by walls. Each tile is worth 2 points, and an extra 2 points if it has a coat of arms. This completed city scores 8 points. </p>
            <div className="flex w-full justify-center">
                <div className="h-40 w-60 bg-light-brown relative">
                    <div className="absolute left-0 bottom-0">
                        <Image 
                            className="select-none rounded-sm rotate-90"
                            src={"/cities/Adobe Scan 12 Sept 2023 (59)-1.jpg"}
                            width={80}
                            height={80}
                            alt="Tile"
                            priority={true}
                        />
                    </div>
                    <div className="absolute top-0 right-0">
                        <Image 
                            className="select-none rounded-sm -rotate-90"
                            src={"/cities/Adobe Scan 12 Sept 2023 (58)-1.jpg"}
                            width={80}
                            height={80}
                            alt="Tile"
                            priority={true}
                        />
                        <Badge str="player" claim="city"/>
                    </div>
                    <div className="absolute bottom-0 left-20">
                        <Image 
                            className="select-none rounded-sm -rotate-90"
                            src={"/cities/Adobe Scan 12 Sept 2023 (28)-1.jpg"}
                            width={80}
                            height={80}
                            alt="Tile"
                            priority={true}
                        />
                    </div>
                    <div className="absolute top-0 right-20">
                        <Image 
                            className="select-none rounded-sm rotate-90"
                            src={"/cities/Adobe Scan 12 Sept 2023 (28)-1.jpg"}
                            width={80}
                            height={80}
                            alt="Tile"
                            priority={true}
                        />
                    </div>
                </div>
            </div>
            <p>After a city tile is placed, a claim cannot be made if it already connects to another claimed city. The same rule applies to roads.</p>
        </>
    )
}