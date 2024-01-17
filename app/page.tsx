import NewGame from "./components/homescreen/NewGame"
import Image from "next/image"
import { Setup } from "./components/homescreen/Setup"

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
            <Setup/>
        </div>
    )
}