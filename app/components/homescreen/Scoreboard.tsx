import { Meeples } from "../Meeples";

export function Scoreboard() {
    return (
        <div>
            <div className="flex h-44 w-80 flex-col bg-slate-800">
                <div className="flex h-10 w-full items-center justify-between border-b border-slate-400">
                    <h2 className="p-1 ml-1 text-xl text-slate-300">Scoreboard</h2>
                    <div className="flex justify-between space-x-2 mr-20">
                        <h2 className="p-1 text-lg text-blue-400">25</h2>
                        <h2 className="p-1 text-lg text-white">-</h2>
                        <h2 className="p-1 text-lg text-orange-500">32</h2>
                    </div>
                </div>
                <div className="flex h-full w-full bg-slate-800 rounded-b-lg">
                    <div className="flex flex-col h-full w-14 border-r border-slate-400">
                        <div className="flex justify-center items-center h-1/2">
                            <h2 className="text-lg text-blue-400">You</h2>
                        </div>
                        <div className="flex justify-center items-center h-1/2">
                            <h2 className="text-lg text-orange-500">Ai</h2>
                        </div>
                    </div>
                    <div className="flex flex-col w-full h-full bg-slate-800">
                        <div className="flex items-center h-1/2 border-b border-slate-400">
                            <Meeples type="hero" int={5}/>
                        </div>
                        <div className="flex items-center h-1/2 border-b border-slate-400">
                            <Meeples type="enemy" int={4}/>
                        </div>
                    </div>
                </div>  
            </div>
        </div>
    )
}