import nanogl from 'nanogl';
import mat4 from 'gl-mat4';

import Renderer from './renderer';
import Cube from './cube';
import Camera from './camera';
import CollisionDetection from './collisionDetection';
import LineCollection from './lineCollection';

import PointCloud from './pointCloud';
import pointVert from './shaders/point.vert';
import pointFrag from './shaders/point.frag';

import cubeVert from './shaders/simpleGeo.vert';
import cubeFrag from './shaders/simpleGeo.frag';

const canvas = document.querySelector('.game-canvas');
const gl = canvas.getContext('webgl', {preserveDrawingBuffer: true});
const pointsShader = new nanogl.Program(gl, pointVert, pointFrag);
const cubeShader = new nanogl.Program(gl, cubeVert, cubeFrag);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const p = new PointCloud(null, 24, [10, 10, 10], gl);
const cube = new Cube(gl, [1, 1, 1]);
const renderer = new Renderer();
const cameraObject = new Camera(canvas.height / canvas.width);
const lines = new LineCollection(gl);
const cd = new CollisionDetection(lines, p);

renderer.addObject(p);
renderer.addObject(cube);
renderer.addObject(lines);
renderer.addShader(pointsShader, 'points');
renderer.addShader(cubeShader, 'cube');

let camera = mat4.create();

gl.viewport(0, 0, canvas.width, canvas.height);
gl.clearColor(0, 0, 0, 1);
gl.enable(gl.DEPTH_TEST);
gl.clear(gl.COLOR_BUFFER_BIT);

draw();

function draw() {
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  const pos = cameraObject.getMousePos();
  // console.log(pos);
  mat4.perspective(camera, 45, canvas.width / canvas.height, 0.01, 100);
  mat4.translate(camera, camera, [0, 0, cameraObject.getZoom()]);
  mat4.rotateY(camera, camera, cameraObject.getRotation()[1]);
  mat4.rotateX(camera, camera, cameraObject.getRotation()[0]);
  cd.checkSelect({x: pos.x / canvas.width, y: pos.y / canvas.height}, camera);

  renderer.setCamera(camera);

  renderer.render();
  requestAnimationFrame(draw);

}
