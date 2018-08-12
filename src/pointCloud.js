import nanogl from 'nanogl';

class PointCloud {
  constructor(points, size, range, gl) {
    this.gl = gl;
    this._points = [];
    this._selected = 0;

    if (points)
      this._points = points;
    else {
      for (let i = 0; i < size; i++) {
        this._points.push([(range[0] * (Math.random() * 2 - 1) + 1), (range[1] * (Math.random() * 2 - 1) + 1), (range[2] * (Math.random() * 2 - 1) + 1)]);
      }
    }
    this._createRenderBuffer();
  }

  setSelected(nr) {
    this._selected = nr;
  }

  flatten(array) {
    const returnArray = [];
    for (let i = 0; i < array.length; i++)
      for (let j = 0; j < array[i].length; j++)
        returnArray.push(array[i][j]);

    return returnArray;
  }

  _createRenderBuffer() {
    let flattenedPoints = this.flatten(this._points);
    flattenedPoints = new Float32Array(flattenedPoints);

    this._verticesBuffer = new nanogl.ArrayBuffer(this.gl, flattenedPoints, this.gl.STATIC_DRAW);
    this._verticesBuffer.attrib('aPosition', 3, this.gl.FLOAT);
  }

  getPoints() {
    return this._points;
  }

  getScreenPositions(camera) {
    this._screenPositions = [];
    const point = [];
    for (let i = 0; i < 4; i++)
      point.push(1);
    for (let i = 0; i < this._points.length; i++) {
      const transformedPoint = [0, 0, 0, 1];
      for (let j = 0; j < 3; j++)
        point[j] = this._points[i][j];
      this.transformMat4(transformedPoint, point, camera);
      transformedPoint[0] = transformedPoint[0] * (1 / transformedPoint[3]);
      transformedPoint[1] = transformedPoint[1] * (1 / transformedPoint[3]);
      transformedPoint[0] = (transformedPoint[0] + 1) / 2
      transformedPoint[1] = (1 - transformedPoint[1]) / 2

      transformedPoint[3] = i;

      this._screenPositions.push(transformedPoint);
    }
    return this._screenPositions;
  }

  transformMat4(out, a, m) {
    let x = a[0], y = a[1], z = a[2], w = a[3];
    out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
    out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
    out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
    out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
    return out;
  }


  update() {

  }

  render(shader) {

    shader.uSelected(this._points[this._selected] || [0, 0, 0]);
    this._verticesBuffer.attribPointer(shader);

    this.gl.drawArrays(this.gl.POINTS, 0, this._points.length);
  }

  getPrefferedShader() {
    return "points";
  }

}

export default PointCloud;
