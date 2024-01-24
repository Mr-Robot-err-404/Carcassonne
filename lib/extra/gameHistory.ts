//When loading a previous game, this code runs in the Home component of the session page.

// const map = game[1].map
// const board = game[1].board
// const currStack = game[1].stack
// const node = game[1].node
// const next = game[1].next
// const meeples = game[1].meeples
// const stats = game[1].overview

// setCurrTile(next)
// setRecentTile(node)
// setState(game)
// updateState(map, board, currStack, node, next, matrix, meeples, stats)

//This goes in the Nav bar to cycle forward and back through moves

{/* <div className="flex md:space-x-10 space-x-2 px-3 md:px-6">
    <h2 onClick={() => setStart(true)} className="text-lg hover:text-blue-500 cursor-pointer">Start</h2>
    <BsArrowLeftCircle
        onClick={() => {
            if (idx == 1) {
                return 
            } 
            setIdx((prev: number) => prev - 1)
        }}
        onMouseEnter={() => setHover(1)}
        onMouseLeave={() => setHover(0)}
        fill={hover == 1 ? "#2563eb" : "#f8fafc"}
        size={25}
    />
    <BsArrowRightCircle
        onClick={() => {
            if (idx == state.length - 1) {
                return 
            } 
            setIdx((prev: number) => prev + 1)
        }}
        onMouseEnter={() => setHover(2)}
        onMouseLeave={() => setHover(0)}
        fill={hover == 2 ? "#2563eb" : "#f8fafc"}
        size={25}
    />
    <h2 onClick={() => console.log(JSON.stringify(board))} className="text-lg hover:text-blue-500 cursor-pointer">Board</h2>
    <h2 onClick={handleNextMove} className="text-sm md:text-lg hover:text-blue-500 cursor-pointer">Next turn</h2>
    <div className="w-24">
        <h2 className={`text-sm md:text-lg ${playerTurn ? "text-blue-500" : "text-orange-500"}`}>{playerTurn ? "Your move" : "Ai's move"}</h2>
    </div>
    </div> */}

//For the GridContext
// useEffect(() => {
    //     if (!state.length) {
    //         return 
    //     }

    //     const map = state[idx].map
    //     const board = state[idx].board
    //     const currStack = state[idx].stack
    //     const node = state[idx].node
    //     const next = state[idx].next
    //     const matrix = initValidTiles(board)
    //     const curr = state[idx].meeples
    //     const stats = state[idx].overview

    //     updateState(map, board, currStack, node, next, matrix, curr, stats)

    // }, [idx])
    
    // const newState = {
        //     map: copy(map), 
        //     node: copy(recentTile), 
        //     next: copy(currTile), 
        //     board: copy(board), 
        //     stack: copy(stack), 
        //     turn: playerTurn,
        //     score: copy(score), 
        //     meeples: copy(meeples), 
        //     overview: copy(overview)
        // }
        // setState(prev => [...prev, newState])
        
        // function updateState(map, board, currStack, node, next, matrix, curr, stats) {
        //     setCurrTile(next)
        //     setRecentTile(node)
        //     setBoard(board)
        //     setStack(currStack)
        //     setMeeples (curr)
        //     updateTerritory(map.player.territory, map.ai.territory, map.player.chains, map.ai.chains)
        //     setValidTiles(matrix)
        //     setOverview(stats)
        // }
    
    