// // let the chaos commence
    // useEffect(() => {
    //     if (start) {
    //         const currMap = getMap(playerTerritory, playerChains, opponentTerritory, opponentChains)
    //         const move = aiMove(board, currMap, validTiles, currTile, overview, "player", meeples.player)
    //         const map = move.map
    //         finishMove(move.row, move.col, move.node, move.claims, map.player.territory, map.ai.territory, map.player.chains, map.ai.chains, move.scores.player, move.scores.ai, map, move.stats, move.meeples)
            
    //         if (move.claim) {
    //             appendChain(move.claim.chain, map["player"].territory, move.claim.str)
    //         }
    //     }
    // }, [start])

    // //ai plays itself
    // useEffect(() => {
    //     // const newState = {
    //     //     map: copy(map), 
    //     //     node: copy(recentTile), 
    //     //     next: copy(currTile), 
    //     //     board: copy(board), 
    //     //     stack: copy(stack), 
    //     //     turn: playerTurn,
    //     //     score: copy(score), 
    //     //     meeples: copy(meeples)
    //     // }
    //     // setState(prev => [...prev, newState])
        
    //     let hero = 'player'
    //     if (!playerTurn) {
    //         hero = 'ai'
    //     }
    //     const currMove = versionMap[hero]

    //     if (!isGameFinished && start) {
    //         setTimeout(() => {
    //             const currMap = getMap(playerTerritory, playerChains, opponentTerritory, opponentChains)
    //             const move = currMove(board, currMap, validTiles, currTile, overview, hero, meeples[hero])

    //             if (move.impossible) {
    //                 updateStack()
    //                 setPlayerTurn(prev => !prev)
    //                 return 
    //             }

    //             const map = move.map
    //             finishMove(move.row, move.col, move.node, move.claims, map.player.territory, map.ai.territory, map.player.chains, map.ai.chains, move.scores.player, move.scores.ai, map, move.stats, move.meeples)
                
    //             if (move.claim) {
    //                 appendChain(move.claim.chain, map[hero].territory, move.claim.str)
    //             }
    //             else if (isClaimPossible(move.claims)) { 
    //                 if (stack.length <= 1) {
    //                     const map = getMap(playerTerritory, playerChains, opponentTerritory, opponentChains)
    //                     const leftover = leftoverChains(map)
    //                     const extraScore = scorePoints(leftover, map)
    //                     updateScore(Math.floor(extraScore.player / 2), Math.floor(extraScore.ai / 2))
    //                     setIsGameFinished(true)
    //                 }
    //                 setPlayerTurn(prev => !prev)
    //             }
    //         }, 400)
    //     }
    // }, [playerTurn])
    