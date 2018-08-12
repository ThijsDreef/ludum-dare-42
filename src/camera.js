class Camera {
  constructor(aspect) {

    this._rotation = [];
    this._zoom = -25 - (aspect) * 25;
    this._pointerUpThisFrame = false;

    for (let i = 0; i < 3; i++)
      this._rotation.push(0);


    this._setupEventListeners();
  }

  getRotation() {
    return this._rotation;
  }

  getZoom() {
    return this._zoom;
  }

  lastFrameUp() {
    const pointerUp = this._pointerUpThisFrame;
    this._pointerUpThisFrame = false;
    return pointerUp;

  }

  getMousePos() {
    return {x: this._lastClientx, y: this._lastClienty};
  }

  _setupEventListeners() {
    document.addEventListener('pointermove', this.pointerMove.bind(this));
    document.addEventListener('pointerdown', this.pointerDown.bind(this));
    document.addEventListener('pointerup', this.pointerUp.bind(this));


  }

  pointerUp(e) {
    this._pointerDown = false;
    this._pointerUpThisFrame = true;
  }

  pointerDown(e) {
    this._pointerDown = true;
    this._lastClientx = e.clientX;
    this._lastClienty = e.clientY;
  }

  pointerMove(e) {

    if (this._pointerDown) {
      this._rotation[0] += (e.clientY - this._lastClienty) * 0.01;
      this._rotation[1] += (e.clientX - this._lastClientx) * 0.01;
    }
    this._lastClientx = e.clientX;
    this._lastClienty = e.clientY;
  }
}

export default Camera;
