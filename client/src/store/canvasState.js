import { makeAutoObservable } from 'mobx';

class CanvasState {
  canvas = null;

  constructor() {
    makeAutoObservable(this);
  }

  // Actions
  setCanvas(canvas) {
    this.canvas = canvas;
  }
}

export default new CanvasState();