export function Rules() {
    return (
        <div className="relative flex min-h-screen flex-col justify-center overflow-hidden py-6 sm:py-12">
            <div className="relative bg-slate-200 px-6 pb-8 pt-10 shadow-xl ring-1 ring-slate-300 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
                <div className="mx-auto max-w-md">
                    <h2 className="text-2xl text-slate-800">Welcome to Carcasssonne!</h2>
                    <div className="divide-y divide-gray-300/50">
                        <div className="space-y-6 py-8 text-base leading-7 text-gray-600">
                            <p>Based on the popular board game created by Klaus-Jürgen Wrede, Carcasssonne is a classic game of simple strategy. These are the three main components of the game:</p>
                            <div className="ml-10 flex space-x-10">
                                <div className="flex w-20 flex-col justify-center space-y-2">
                                    <div className="h-20 w-full bg-gray-400"></div>
                                    <p className="text-sm text-slate-700">Tile with a city</p>
                                </div>
                                <div className="flex w-20 flex-col justify-center space-y-2">
                                    <div className="h-20 w-full bg-gray-400"></div>
                                    <p className="text-sm text-slate-700">Tile with a road</p>
                                </div>
                                <div className="flex w-20 flex-col justify-center space-y-2">
                                    <div className="h-20 w-full bg-gray-400"></div>
                                    <p className="text-sm text-slate-700">Tile with a monastery</p>
                                </div>
                            </div>
                            <p>During the game, you and the opponent will build the board using similar tiles, with the option of claiming a city, road or monastery. The goal is to score the most points by the end.</p>
                        </div>
                        <div className="flex items-center justify-between pt-8">
                            <button className="rounded-lg py-1 px-2 bg-blue-500 hover:bg-blue-400">Skip rules</button>
                            <button className="rounded-lg py-1 px-2 bg-green-500 hover:bg-green-400">Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}