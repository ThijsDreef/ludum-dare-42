const nanogl = require('nanogl');

class Cube {
  constructor(gl, position) {
    this.gl = gl;
    this._position = position;
    this._createRenderBuffer();
  }

  update() {

  }

  render(shader) {
    this.vBuffer.attribPointer(shader);
    this.iBuffer.bind();
    this.iBuffer.draw(this.gl.TRIANGLES, undefined, 0);
  }

  _createRenderBuffer() {
    var vertices =
     [-1.0, -1.0,  1.0,
       1.0, -1.0,  1.0,
       1.0,  1.0,  1.0,
      -1.0,  1.0,  1.0,

      // Back face
      -1.0, -1.0, -1.0,
      -1.0,  1.0, -1.0,
       1.0,  1.0, -1.0,
       1.0, -1.0, -1.0,

      // Top face
      -1.0,  1.0, -1.0,
      -1.0,  1.0,  1.0,
       1.0,  1.0,  1.0,
       1.0,  1.0, -1.0,

      // Bottom face
      -1.0, -1.0, -1.0,
       1.0, -1.0, -1.0,
       1.0, -1.0,  1.0,
      -1.0, -1.0,  1.0,

      // Right face
       1.0, -1.0, -1.0,
       1.0,  1.0, -1.0,
       1.0,  1.0,  1.0,
       1.0, -1.0,  1.0,

      // Left face
      -1.0, -1.0, -1.0,
      -1.0, -1.0,  1.0,
      -1.0,  1.0,  1.0,
      -1.0,  1.0, -1.0];

    var indices = [
        0, 1, 2,
        0, 2, 3,
        4, 5, 6,
        4, 6, 7,
        8, 9, 10,
        8, 10, 11,
        12, 13, 14,
        12, 14, 15,
        16, 17, 18,
        16, 18, 19,
        20, 21, 22,
        20, 22, 23

    ];
    vertices = new Float32Array(vertices);
    indices = new Uint16Array(indices);
    var verticesBuffer = new nanogl.ArrayBuffer(this.gl, vertices, this.gl.STATIC_DRAW);
    var indiceBuffer = new nanogl.IndexBuffer(this.gl, this.gl.UNSIGNED_SHORT, indices, this.gl.STATIC_DRAW);
    verticesBuffer.attrib("aPosition", 3, this.gl.FLOAT);

    this.vBuffer = verticesBuffer;
    this.iBuffer = indiceBuffer;
  }

  getPrefferedShader() {
    return 'cube';
  }
}

export default Cube;
