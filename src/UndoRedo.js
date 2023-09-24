import React, { Component } from 'react';
import "./UndoRedo.css"

class UndoRedo extends Component {
  state = {
    circle: [],
    undoPoints: [],
  }
  handleClick = (e) => {
    this.setState({ circle: [...this.state.circle, { x: e.clientX, y: e.clientY }] })
  }

  undo = () => {
    let circle = this.state.circle
    let undoPoints = circle.pop()
    this.setState({ circle, undoPoints: [...this.state.undoPoints, { x: undoPoints.x, y: undoPoints.y }] })
  }

  redo = () => {
    let circle = this.state.circle
    circle.push(this.state.undoPoints[this.state.undoPoints.length - 1])
    this.state.undoPoints.pop()
    this.setState({ circle })
  }

  reset = () => {
    this.setState({ circle: [], undoPoints: [] })
  }

  render() {
    return (
      <div className='main'>
        <div className='buttons'>
          <button disabled={!this.state.circle.length} onClick={this.undo}>Undo</button>
          <button disabled={!this.state.undoPoints.length} onClick={this.redo}>Redo</button>
          <button disabled={!(this.state.undoPoints.length || this.state.circle.length)} onClick={this.reset}>Reset</button>
        </div>
        <div className='section' onClick={(e) => this.handleClick(e)}>
          {this.state.circle.map((circle, id) => {
            return <div key={id} className='circle' style={{ left: circle.x - 5 + "px", top: circle.y - 5 + "px" }}></div>
          })}
        </div>
      </div>
    );
  }
}

export default UndoRedo;