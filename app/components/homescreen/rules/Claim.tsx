export function ClaimingTerritory() {
    return (
        <>
            <p>After placing a tile, multiple claims may be available for that tile. If a claim is available, the tile will have a gold border. The player can click on this square and select a claim.</p>
            <div className="flex justify-center w-full">
                <div className="flex flex-col items-center space-y-2">
                    <h2 className="text-sm text-slate-500">click on the tile and select a claim:</h2>
                    <div className="w-60 h-40 bg-slate-700"></div>
                </div>
            </div>
            <p>Note that claims are optional. Each player has a maximum of 7 claims each, and may want to preserve a claim for more valuable territory.</p>
        </>
    )
}