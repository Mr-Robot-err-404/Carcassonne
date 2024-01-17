export function Contested() {
    return (
        <>
            <p>Separate cities and roads can be joined together, which can create contested tiles between two players. Here, two different cities are joined together as a single city.</p>
            <div className="ml-10 flex space-x-10">
                <div className="h-60 w-0 sm:w-40 bg-slate-600"></div>
                <div className="h-60 w-40 bg-slate-600"></div>
            </div>
            <p>When the joined city is complete, the number of claims is compared. If both sides have an equal stake, points are split between them. If one side has more claims, they receive the full share while the opposing side receives nothing.</p>
        </>
    )
}