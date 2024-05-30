import "./UndoRedo.css"
import { useUndoRedoHook } from './useUndoRedoHook';

export const UndoRedo = () => {

  const { circle, undoPoints, undo, redo, reset, handleClick } = useUndoRedoHook()

  return (
    <div className='main'>
      <div className='buttons'>
        <button disabled={!circle.length} onClick={undo}>Undo (Ctrl + Z)</button>
        <button disabled={!undoPoints.length} onClick={redo}>Redo (Ctrl + Y)</button>
        <button disabled={!(undoPoints.length || circle.length)} onClick={reset}>Reset</button>
      </div>
      <div className='section' onClick={handleClick}>
        {circle.map((circle, id) => {
          return <div key={id} className='circle' style={{ left: circle.x - 5 + "px", top: circle.y - 5 + "px" }}></div>
        })}
      </div>
    </div>
  );
}