import React from 'react';
import canvasState from '../store/canvasState';
import toolState from '../store/toolState';
import Brush from '../tools/Brush';
import Rect from '../tools/Rect';
import Circle from '../tools/Circle';
import Line from '../tools/Line';
import '../styles/toolbar.scss';

const Toolbar = () => {
  const handleChangeColor = (e) => {
    toolState.setFillColor(e.target.value);
    toolState.setStrokeColor(e.target.value);
  }

  return (
    <div className="toolbar">
      <button className="toolbar__btn brush" onClick={() => toolState.setTool(new Brush(canvasState.canvas))}></button>
      <button className="toolbar__btn rect" onClick={() => toolState.setTool(new Rect(canvasState.canvas))}></button>
      <button className="toolbar__btn circle" onClick={() => toolState.setTool(new Circle(canvasState.canvas))}></button>
      <button className="toolbar__btn eraser"></button>
      <button className="toolbar__btn line" onClick={() => toolState.setTool(new Line(canvasState.canvas))}></button>
      <input type="color" onChange={handleChangeColor} />
      <button className="toolbar__btn undo"></button>
      <button className="toolbar__btn redo"></button>
      <button className="toolbar__btn save"></button>
    </div>
  );
};

export default Toolbar;