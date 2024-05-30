import { useEffect, useState } from "react";

export const useUndoRedoHook = () => {
  const [circle, setCircle] = useState([])
  const [undoPoints, setUndoPoints] = useState([])

  useEffect(() => {
    const handlekeyDown = (e) => {
      if (e.ctrlKey && (e.key === "z" || e.key === "Z")) {
        undo()
      }
      else if (e.ctrlKey && (e.key === "y" || e.key === "Y")) {
        redo()
      }
    }

    window.addEventListener("keydown", handlekeyDown)
    
    return () => window.removeEventListener("keydown", handlekeyDown)
  }, [circle, undoPoints])

  const handleClick = (e) => {
    setCircle(prevCircle => [...prevCircle, { x: e.clientX, y: e.clientY }])
  }

  const undo = () => {
    if(!circle.length) return

    const newCircle = [...circle]
    const undoPoints = newCircle.pop()
    setCircle(newCircle)
    setUndoPoints(prevPoints => [...prevPoints, { x: undoPoints.x, y: undoPoints.y }])
  }

  const redo = () => {
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

  return { circle, undoPoints, undo, redo, reset, handleClick }
}
