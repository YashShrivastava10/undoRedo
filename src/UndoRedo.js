import { useCallback, useEffect, useState } from 'react';
import "./UndoRedo.css"

export const UndoRedo = () => {

  const [circle, setCircle] = useState([])
  const [undoPoints, setUndoPoints] = useState([])

  const memoizedUndo = useCallback(undo, [undo]);
  const memoizedRedo = useCallback(redo, [redo]);

  useEffect(() => {
    const handlekeyDown = (e) => {
      if (e.ctrlKey && (e.key === "z" || e.key === "Z")) {
        memoizedUndo()
      }
      else if (e.ctrlKey && (e.key === "y" || e.key === "Y")) {
        memoizedRedo()
      }
    }

    window.addEventListener("keydown", handlekeyDown)
    
    return () => window.removeEventListener("keydown", handlekeyDown)
  }, [circle, undoPoints, memoizedUndo, memoizedRedo])

  const handleClick = (e) => {
    setCircle(prevCircle => [...prevCircle, { x: e.clientX, y: e.clientY }])
  }

  function undo(){
    if(!circle.length) return

    const newCircle = [...circle]
    const undoPoints = newCircle.pop()
    setCircle(newCircle)
    setUndoPoints(prevPoints => [...prevPoints, { x: undoPoints.x, y: undoPoints.y }])
  }

  function redo(){
    if(!undoPoints.length) return
    
    let newCircle = [...circle]
    const newUndoPoints = [...undoPoints]
    newCircle.push(newUndoPoints[newUndoPoints.length - 1])
    newUndoPoints.pop()
    setCircle(newCircle)
    setUndoPoints(newUndoPoints)
  }

  const reset = () => {
    setCircle([])
    setUndoPoints([])
  }

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
// class UndoRedo extends Component {
//   state = {
//     circle: [],
//     undoPoints: [],
//   }

//   componentDidMount() {
//     window.addEventListener("keydown", this.handlekeyDown)
//   }

//   componentWillUnmount() {
//     window.removeEventListener("keydown", this.handlekeyDown)
//   }

//   handlekeyDown = (e) => {
//     if (e.ctrlKey && (e.key === "z" || e.key === "Z")) {
//       if (this.state.circle.length) this.undo()
//     }
//     else if (e.ctrlKey && (e.key === "y" || e.key === "Y")) {
//       if (this.state.undoPoints.length) this.redo()
//     }
//   }
  
//   handleClick = (e) => {
//     this.setState({ circle: [...this.state.circle, { x: e.clientX, y: e.clientY }] })
//   }

//   undo = () => {
//     let circle = this.state.circle
//     let undoPoints = circle.pop()
//     this.setState({ circle, undoPoints: [...this.state.undoPoints, { x: undoPoints.x, y: undoPoints.y }] })
//   }

//   redo = () => {
//     let circle = this.state.circle
//     circle.push(this.state.undoPoints[this.state.undoPoints.length - 1])
//     this.state.undoPoints.pop()
//     this.setState({ circle })
//   }

//   reset = () => {
//     this.setState({ circle: [], undoPoints: [] })
//   }

//   render() {
//     return (
//       <div className='main'>
//         <div className='buttons'>
//           <button disabled={!this.state.circle.length} onClick={this.undo}>Undo (Ctrl + Z)</button>
//           <button disabled={!this.state.undoPoints.length} onClick={this.redo}>Redo (Ctrl + Y)</button>
//           <button disabled={!(this.state.undoPoints.length || this.state.circle.length)} onClick={this.reset}>Reset</button>
//         </div>
//         <div className='section' onClick={(e) => this.handleClick(e)}>
//           {this.state.circle.map((circle, id) => {
//             return <div key={id} className='circle' style={{ left: circle.x - 5 + "px", top: circle.y - 5 + "px" }}></div>
//           })}
//         </div>
//       </div>
//     );
//   }
// }

// export default UndoRedo;