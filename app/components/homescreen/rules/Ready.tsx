import { Scoreboard } from "../Scoreboard"

export function Ready() {
    return (
        <>
            <p>During the game, the current score for both sides is shown in the component below, as well as the number of claims each side has left:</p>
            <div className="flex w-full justify-center">
                <div className="h-44 w-80">
                    <Scoreboard/>
                </div>
            </div>
            <p>When the game finishes, any incomplete territory will receive points, but at half the original amount.</p>
            <div className="flex justify-center w-full">
                <p>You're now ready for a match!</p>
            </div>
        </>
    )
}