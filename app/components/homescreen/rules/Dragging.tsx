import { DndContext } from "@dnd-kit/core";
import Placeholder from "../Placeholder";

export function Dragging() {
    return (
      <>
        <DndContext>
          <p>During their move, players will draw a single tile from the stack of 84 tiles. In the game, you can drag this tile onto the board from the component below:</p>
            <div className="ml-20">
              <Placeholder/>  
            </div>
          <p>This tile can be rotated in either direction using the 2 buttons. The game is finished when all tiles in the stack have been played.</p> 
        </DndContext> 
      </>
    )
}