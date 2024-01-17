export function Cities() {
    return (
        <>
            <p>A city is complete when it is fully surrounded by walls. As with roads, a city placed that is connected to an opponent's city cannot directly be claimed. </p>
            <div className="flex w-full justify-center">
                <div className="h-40 w-60 bg-slate-600"></div>
            </div>
            <p>When a city is complete, each tile is worth 2 points and the claim is returned to that player to be used again. </p>
        </>
    )
}