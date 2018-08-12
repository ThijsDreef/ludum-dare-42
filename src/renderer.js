

class Renderer {
  constructor() {

    this._objects = [];
    this._shaderList = [];
    this._camera = null;

  }

  addShader(shader, key) {
    shader.bind();
    this._shaderList[key] = shader;

  }

  addObject(object) {

    this._objects.push(object);

  }

  setCamera(camera) {

    this._camera = camera;

  }

  update() {

    for (let i = 0; i < this._objects.length; i ++)
      this._objects[i].update();

  }

  render() {

    for (let i = 0; i < this._objects.length; i++) {
      const shader = this._shaderList[this._objects[i].getPrefferedShader()];
      shader.bind();
      shader.uMvp(this._camera);
      this._objects[i].render(shader);
    }

  }

}

export default Renderer;
