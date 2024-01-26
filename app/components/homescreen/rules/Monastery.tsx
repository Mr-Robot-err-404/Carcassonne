import Image from "next/image"
import Badge from "../../badges/Badge"

export function Monastery() {
    return (
        <>
            <p>When a monastery is claimed, it scores points for every neighbor it has. A monastery is complete when it is fully surrounded by neighboring tiles.</p>
            <div className="flex w-full justify-center">
                <div className="h-60 w-60 bg-light-brown relative">
                    <div className="absolute left-20 top-20">
                        <Image 
                            className="select-none rounded-sm"
                            src={"/monastery/Adobe Scan 12 Sept 2023 (25)-1.jpg"}
                            width={80}
                            height={80}
                            alt="Tile"
                            priority={true}
                        />
                        <Badge str="player" claim="monastery"/>
                    </div>
                    <div className="absolute left-0 top-0">
                        <Image 
                            className="select-none rounded-sm rotate-180"
                            src={"/cities/Adobe Scan 12 Sept 2023 (59)-1.jpg"}
                            width={80}
                            height={80}
                            alt="Tile"
                            priority={true}
                        />
                    </div>
                    <div className="absolute left-0 bottom-0">
                        <Image 
                            className="select-none rounded-sm -rotate-90"
                            src={"/cities/Adobe Scan 12 Sept 2023 (28)-1.jpg"}
                            width={80}
                            height={80}
                            alt="Tile"
                            priority={true}
                        />
                    </div>
                    <div className="absolute left-0 top-20">
                        <Image 
                            className="select-none rounded-sm rotate-90"
                            src={"/cities/Adobe Scan 12 Sept 2023 (24)-1.jpg"}
                            width={80}
                            height={80}
                            alt="Tile"
                            priority={true}
                        />
                    </div>
                    <div className="absolute top-20 right-0">
                        <Image 
                            className="select-none rounded-sm"
                            src={"/roads/Adobe Scan 12 Sept 2023 (34)-1.jpg"}
                            width={80}
                            height={80}
                            alt="Tile"
                            priority={true}
                        />
                    </div>
                    <div className="absolute bottom-0 left-20">
                        <Image 
                            className="select-none rounded-sm -rotate-90"
                            src={"/roads/Adobe Scan 12 Sept 2023 (33)-1.jpg"}
                            width={80}
                            height={80}
                            alt="Tile"
                            priority={true}
                        />
                    </div>
                    <div className="absolute bottom-0 right-0">
                        <Image 
                            className="select-none rounded-sm rotate-90"
                            src={"/roads/Adobe Scan 12 Sept 2023 (54)-1.jpg"}
                            width={80}
                            height={80}
                            alt="Tile"
                            priority={true}
                        />
                    </div>
                    <div className="absolute top-0 left-20">
                        <Image 
                            className="select-none rounded-sm rotate-180"
                            src={"/roads/Adobe Scan 12 Sept 2023 (33)-1.jpg"}
                            width={80}
                            height={80}
                            alt="Tile"
                            priority={true}
                        />
                    </div>
                    <div className="absolute top-0 right-0 mt-xs">
                        <Image 
                            className="select-none rounded-sm"
                            src={"/roads/Adobe Scan 12 Sept 2023 (54)-1.jpg"}
                            width={80}
                            height={80}
                            alt="Tile"
                            priority={true}
                        />
                    </div>
                </div>
            </div>
            <p>Each tile scores 1 point, as well as the monastery tile itself, giving a total of 9 points.</p>
        </>
    )
}