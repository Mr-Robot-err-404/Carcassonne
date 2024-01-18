import Image from "next/image"
import Badge from "../../badges/Badge"

export function Contested() {
    return (
        <>
            <p>Separate cities and roads can be joined together, which can create contested tiles between two players. Here, two different cities are joined together as a single city.</p>
            <div className="ml-10 flex space-x-10">
                <div className="h-60 w-0 sm:w-40 bg-light-brown relative">
                    <div className="absolute top-20 left-0">
                        <Image 
                            className="select-none rounded-sm"
                            src={"/monastery/Adobe Scan 12 Sept 2023 (25)-1.png"}
                            width={80}
                            height={80}
                            alt="Tile"
                        />
                    </div>
                    <div className="absolute top-0 left-0">
                        <Image 
                            className="select-none rounded-sm rotate-90"
                            src={"/cities/Adobe Scan 12 Sept 2023 (58)-1.png"}
                            width={80}
                            height={80}
                            alt="Tile"
                        />
                    </div>
                    <div className="absolute top-0 right-0">
                        <Image 
                            className="select-none rounded-sm rotate-180"
                            src={"/cities/Adobe Scan 12 Sept 2023 (28)-1.png"}
                            width={80}
                            height={80}
                            alt="Tile"
                        />
                        <Badge str="player" claim="city"/>
                    </div>
                    <div className="absolute bottom-0 right-0">
                        <Image 
                            className="select-none rounded-sm -rotate-90"
                            src={"/cities/Adobe Scan 12 Sept 2023 (28)-1.png"}
                            width={80}
                            height={80}
                            alt="Tile"
                        />
                        <Badge str="ai" claim="city"/>
                    </div>
                    <div className="absolute bottom-0 left-0">
                        <Image 
                            className="select-none rounded-sm rotate-90"
                            src={"/cities/Adobe Scan 12 Sept 2023 (28)-1.png"}
                            width={80}
                            height={80}
                            alt="Tile"
                        />
                    </div>
                </div>
                <div className="h-60 w-40 bg-light-brown relative">
                    <div className="absolute top-20 left-0">
                        <Image 
                            className="select-none rounded-sm"
                            src={"/monastery/Adobe Scan 12 Sept 2023 (25)-1.png"}
                            width={80}
                            height={80}
                            alt="Tile"
                        />
                    </div>
                    <div className="absolute top-0 left-0">
                        <Image 
                            className="select-none rounded-sm rotate-90"
                            src={"/cities/Adobe Scan 12 Sept 2023 (58)-1.png"}
                            width={80}
                            height={80}
                            alt="Tile"
                        />
                    </div>
                    <div className="absolute top-0 right-0">
                        <Image 
                            className="select-none rounded-sm rotate-180"
                            src={"/cities/Adobe Scan 12 Sept 2023 (28)-1.png"}
                            width={80}
                            height={80}
                            alt="Tile"
                        />
                        <Badge str="player" claim="city"/>
                    </div>
                    <div className="absolute bottom-0 right-0">
                        <Image 
                            className="select-none rounded-sm -rotate-90"
                            src={"/cities/Adobe Scan 12 Sept 2023 (28)-1.png"}
                            width={80}
                            height={80}
                            alt="Tile"
                        />
                        <Badge str="ai" claim="city"/>
                    </div>
                    <div className="absolute bottom-0 left-0">
                        <Image 
                            className="select-none rounded-sm rotate-90"
                            src={"/cities/Adobe Scan 12 Sept 2023 (28)-1.png"}
                            width={80}
                            height={80}
                            alt="Tile"
                        />
                    </div>
                    <div className="absolute top-20 right-0">
                        <Image 
                            className="select-none rounded-sm rotate-90"
                            src={"/cities/Adobe Scan 12 Sept 2023 (24)-1.png"}
                            width={80}
                            height={80}
                            alt="Tile"
                        />
                    </div>
                </div>
            </div>
            <p>When the joined city is complete, the number of claims is compared. If both players have an equal stake, points are split between them. If one side has more claims, they receive the full share while the opposing side receives nothing.</p>
        </>
    )
}