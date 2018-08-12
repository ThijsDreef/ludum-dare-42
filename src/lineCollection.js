import nanogl from 'nanogl';

class LineCollection {
  constructor(gl, color) {
    this._color = color;
    this.gl = gl;
    this._lineObjects = [];
    this._lines = [];
  }

  update() {

  }

  getLineObjects() {
    return this._lineObjects;
  }

  render(shader) {
    if (this.vBuffer) {
      shader.uColor(this._color);
      this.vBuffer.attribPointer(shader);
      this.gl.drawArrays(this.gl.LINES, 0, this._lineObjects.length * 2);
    }
  }

  addToBuffer(start, end) {

    this._lineObjects.push({start, end});

    for (let i = 0; i < start.length; i++)
      this._lines.push(start[i])
    for (let i = 0; i < end.length; i++)
      this._lines.push(end[i])

    this._lineBuffer = new Float32Array(this._lines);
    this.vBuffer = new nanogl.ArrayBuffer(this.gl, this._lineBuffer, this.gl.DYNAMIC_DRAW);
    this.vBuffer.attrib('aPosition', 3, this.gl.FLOAT);

  }

  getPrefferedShader() {

    return 'cube';

  }
}

export default LineCollection;
