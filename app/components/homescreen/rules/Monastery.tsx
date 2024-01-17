export function Monastery() {
    return (
        <>
            <p>When a monastery is claimed, it scores points for every neighbor it has. A monastery is complete when it is fully surrounded by any neighboring tiles.</p>
            <div className="flex w-full justify-center">
                <div className="h-60 w-60 bg-slate-600"></div>
            </div>
            <p>Each tile scores 1 point, as well as the monastery tile itself.</p>
        </>
    )
}