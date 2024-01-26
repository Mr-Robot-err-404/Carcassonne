import Image from "next/image"

export function Legal() {
    return (
        <>
            <p>A move is considered legal if all its neighboring tiles have matching edges. A road must match with another road, and the same applies for fields and cities.</p>
            <div className="flex space-x-14 ml-5">
                <div className="flex flex-col space-y-1 items-center">
                    <h2 className="text-sm text-slate-400">legal move</h2>
                    <div className="flex h-40 w-40 bg-light-brown relative">
                        <div className="h-full flex-col">
                            <Image 
                                className="select-none rounded-sm"
                                src={"/roads/Adobe Scan 12 Sept 2023 (17)-1.jpg"}
                                width={80}
                                height={80}
                                alt="Tile"
                                priority={true}
                            />
                            <Image 
                                className="select-none rounded-sm -rotate-90"
                                src={"/cities/Adobe Scan 12 Sept 2023 (12)-1.jpg"}
                                width={80}
                                height={80}
                                alt="Tile"
                                priority={true}
                            />
                        </div>
                        <div className="absolute bottom-0 right-0 mb-xs">
                            <Image 
                                className="select-none rounded-sm"
                                src={"/roads/Adobe Scan 12 Sept 2023 (48)-1.jpg"}
                                width={80}
                                height={80}
                                alt="Tile"
                                priority={true}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col space-y-1 items-center">
                    <h2 className="text-sm text-slate-400">illegal move</h2>
                    <div className="flex h-40 w-40 bg-light-brown relative">
                        <div className="h-full flex-col">
                            <Image 
                                className="select-none rounded-sm"
                                src={"/roads/Adobe Scan 12 Sept 2023 (17)-1.jpg"}
                                width={80}
                                height={80}
                                alt="Tile"
                                priority={true}
                            />
                            <Image 
                                className="select-none rounded-sm rotate-180"
                                src={"/cities/Adobe Scan 12 Sept 2023 (12)-1.jpg"}
                                width={80}
                                height={80}
                                alt="Tile"
                                priority={true}
                            />
                        </div>
                        <div className="absolute bottom-0 right-0 mb-xs">
                            <Image 
                                className="select-none rounded-sm"
                                src={"/roads/Adobe Scan 12 Sept 2023 (48)-1.jpg"}
                                width={80}
                                height={80}
                                alt="Tile"
                                priority={true}
                            />
                        </div>
                    </div>
                </div>
            </div>       
            <p>In the second example, the bottom left tile matches the road above it, but doesn't match to its right. A tile won't be accepted on the board if the move is illegal.</p>
        </>
    )
}