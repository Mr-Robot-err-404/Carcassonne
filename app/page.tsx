import NewGame from "./components/NewGame"
import Image from "next/image"

export default function Main() {
    return (
        <div className="w-full h-screen relative overflow-auto hide-scrollbar">
            <div className="menu-dimensions relative ">
                <Image
                    className="absolute top-0 left-0 select-none"
                    alt=""
                    src="/moss/home-menu.webp"
                    quality={100}
                    width={1920}
                    height={1080}
                    style={{
                        objectFit: 'cover',
                    }}
                />
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-24">
                <NewGame/>
            </div>
        </div>
    )
}