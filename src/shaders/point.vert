attribute vec3 aPosition;

uniform mat4 uMvp;

varying vec3 vPos;

void main() {
  gl_Position = uMvp * vec4(aPosition, 1.);
  gl_PointSize = 10. * (1. - gl_Position.z / 100.);
  vPos = aPosition;
}
