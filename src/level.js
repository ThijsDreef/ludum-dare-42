import nanogl from 'nanogl';
import mat4 from 'gl-mat4';

import Renderer from './renderer';
import Cube from './cube';
import Camera from './camera';
import CollisionDetection from './collisionDetection';
import LineCollection from './lineCollection';
import Score from './score';

import PointCloud from './pointCloud';
import pointVert from './shaders/point.vert';
import pointFrag from './shaders/point.frag';

import cubeVert from './shaders/simpleGeo.vert';
import cubeFrag from './shaders/simpleGeo.frag';

class Level {
  constructor(gl, width, height) {

    this._width = width;
    this._height = height;

    this._gl = gl;
    this._score = 0;

    this._cubes = [];
    this._cubes.push(new Cube(gl, [15, 15, 15], [1, 0, 0]));
    this._cubes.push(new Cube(gl, [-15, 15, 15], [1, 1, 0]));
    this._cubes.push(new Cube(gl, [15, -15, 15], [0, 1, 1]));
    this._cubes.push(new Cube(gl, [15, 15, -15], [0, 1, 0]));
    this._cubes.push(new Cube(gl, [-15, 15, -15], [0, 1, 1]));
    this._cubes.push(new Cube(gl, [-15, -15, 15], [1, 0.5, 0.5]));
    this._cubes.push(new Cube(gl, [15, -15, -15], [0, 1, 0.5]));
    this._cubes.push(new Cube(gl, [-15, -15, -15], [0.2, 0, 0.5]));


    this._renderer = new Renderer();
    this._cameraObject = new Camera(height / width);
    this._camera = mat4.create();
    this._aspect = width / height;

    this.update = this.update.bind(this);
    const pointsShader = new nanogl.Program(gl, pointVert, pointFrag);
    const cubeShader = new nanogl.Program(gl, cubeVert, cubeFrag);

    this._renderer.addShader(pointsShader, 'points');
    this._renderer.addShader(cubeShader, 'cube');

  }

  getCurrentScore() {
    return this._score + this._cd._s;
  }

  start(level) {
    let c = 0;
    if (this._cd) {
      c = this._cd._s;
    }
    this._stop = false;
    this._pointCloud = new PointCloud(null, 12 + level * 2, [10, 10, 10], this._gl);
    this._lines = new LineCollection(this._gl, [1, 1, 0]);

    this._cd = new CollisionDetection(this._lines, this._pointCloud);
    this._cd._s = c;
    this._renderer.clearObjects();
    this._renderer.addObject(this._pointCloud);
    this._renderer.addObject(this._lines);
    for (let i = 0; i < this._cubes.length; i++)
      this._renderer.addObject(this._cubes[i]);

    this.update();
  }

  stop() {
    this._stop = true;
  }

  pause() {

  }

  update() {

    this._gl.clear(this._gl.COLOR_BUFFER_BIT | this._gl.DEPTH_BUFFER_BIT);
    const pos = this._cameraObject.getMousePos();

    mat4.perspective(this._camera, 45, this._aspect, 0.01, 150);
    mat4.translate(this._camera, this._camera, [0, 0, this._cameraObject.getZoom()]);
    mat4.rotateY(this._camera, this._camera, this._cameraObject.getRotation()[1]);
    mat4.rotateX(this._camera, this._camera, this._cameraObject.getRotation()[0]);
    if (this._cameraObject.lastFrameUp() && !this._stop) {
      this._cd.checkSelect({x: pos.x / this._width, y: pos.y / this._height}, this._camera);
    }

    this._renderer.setCamera(this._camera);

    this._renderer.render();

  }
}

export default Level;
