import Image from "next/image"
import Badge from "../../badges/Badge"

export function Roads() {
    return (
        <>
            <p>A road is complete when both ends reach a deadend (either a village, monastery or city) or the road loops onto itself. In this case, a monastery and a village complete the road on either side.</p>
            <div className="flex justify-center w-full">
                <div className="h-40 w-60 bg-light-brown relative">
                    <div className="absolute left-0 bottom-0">
                        <Image 
                            className="select-none rounded-sm"
                            src={"/roads/Adobe Scan 12 Sept 2023 (52)-1.png"}
                            width={80}
                            height={80}
                            alt="Tile"
                        />
                    </div>
                    <div className="absolute left-20 bottom-0">
                        <Image 
                            className="select-none rounded-sm rotate-90"
                            src={"/roads/Adobe Scan 12 Sept 2023 (34)-1.png"}
                            width={80}
                            height={80}
                            alt="Tile"
                        />
                    </div>
                    <div className="absolute right-0 bottom-0">
                        <Image 
                            className="select-none rounded-sm rotate-90"
                            src={"/roads/Adobe Scan 12 Sept 2023 (33)-1.png"}
                            width={80}
                            height={80}
                            alt="Tile"
                        />
                        <Badge str="player" claim="road"/>
                    </div>
                    <div className="absolute right-0 top-0">
                        <Image 
                            className="select-none rounded-sm"
                            src={"/monastery/Adobe Scan 12 Sept 2023 (49)-1.png"}
                            width={80}
                            height={80}
                            alt="Tile"
                        />
                    </div>
                </div>
            </div>
            <p>When a road is complete, the claim is given back to that player and can be used for claiming other territory. Each completed road is worth 1 point for every tile, scoring 4 points in this case. </p>
        </>
    )
}