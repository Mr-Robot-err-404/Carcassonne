import { BiTargetLock } from "react-icons/bi"

export function Navigating() {
    return (
        <>
            <p>When navigating the board, you can hold right-click to drag around the board. It's still recommended to use the mousepad or pressing the mousewheel.</p>
                <div className="flex justify-center h-10 w-full">
                    <div className="flex space-x-20">
                        <div className="flex justify-center items-center hover:bg-slate-600 rounded-full cursor-pointer w-10 h-10">
                            <BiTargetLock size={20} fill={"white"} />
                        </div> 
                        <button className="px-3 py-1 border border-slate-500 rounded-sm text-md hover:border-slate-300">Pass</button>
                    </div> 
                </div>
            <p>In the Nav Bar, the target button finds the center of the board. If you wish to save a claim and finish your move, you can use the Pass button.</p> 
        </>
    )
}