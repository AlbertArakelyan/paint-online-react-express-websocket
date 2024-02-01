import { makeAutoObservable } from 'mobx';

class ToolState {
  tool = null;

  constructor() {
    makeAutoObservable(this);
  }

  // Actions
  setTool(tool) {
    this.tool = tool;
  }

  setFillColor(color) {
    this.tool.fillColor = color;
  }

  setStrokeColor(color) {
    this.tool.strokeColor = color;
  }

  setLineWidth(width) {
    // TODO if there is no chosen tool handle it
    this.tool.lineWidth = width;
  }
}

export default new ToolState();