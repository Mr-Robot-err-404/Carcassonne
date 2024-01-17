export function Legal() {
    return (
        <>
            <p>A move is considered legal if all its neighboring tiles have matching edges. A road must match with another road, and the same applies for fields and cities. The marked tile is currently being placed in both examples.</p>
            <div className="flex space-x-14 ml-5">
                <div className="flex flex-col space-y-1 items-center">
                    <h2 className="text-sm text-slate-500">legal move</h2>
                    <div className="h-40 w-40 bg-slate-300"></div>
                </div>
                <div className="flex flex-col space-y-1 items-center">
                    <h2 className="text-sm text-slate-500">illegal move</h2>
                    <div className="h-40 w-40 bg-slate-300"></div>
                </div>
            </div>        
        </>
    )
}