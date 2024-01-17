export function Ready() {
    return (
        <>
            <p>During the game, the current score for both sides is shown in the component below, as well as the number of claims each side has left:</p>
            <div className="flex w-full justify-center">
                <div className="h-44 w-80 bg-slate-700"></div>
            </div>
            <div className="flex w-full justify-center">
                <p>You're now ready for a match!</p>
            </div>
        </>
    )
}