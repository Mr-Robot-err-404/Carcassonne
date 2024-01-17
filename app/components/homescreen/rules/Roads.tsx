export function Roads() {
    return (
        <>
            <p>A road is complete when both ends reach a deadend (either a village, monastery or city) or the road loops onto itself. In this case, the two villages complete the road on either side.</p>
            <div className="flex w-full flex-col items-center space-y-2">
                <div className="w-52 text-sm text-slate-400">
                    <p>Notice that one road cannot be claimed, as it already connects to the opponent's road.</p>
                </div>
                <div className="h-40 w-60 bg-slate-600"></div>
            </div>
            <p>When a road is complete, the claim is given back to that player and can be used for claiming other territory. Each completed road is worth 1 point for every tile.</p>
        </>
    )
}