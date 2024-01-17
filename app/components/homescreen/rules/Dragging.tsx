export function Dragging() {
    return (
        <div className="space-y-6 py-8 text-base leading-7 text-gray-600">
          <p>During their move, players will draw a single tile from the stack of 84 tiles. In the game, you can drag this tile onto the board from the component below:</p>
          <div className="ml-20 h-32 w-60 bg-slate-700"></div>
          <p>This tile can rotated in either direction using the 2 buttons. The game is finished when all tiles in the stack have been played.</p>
        </div>
    )
}