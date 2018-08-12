attribute vec3 aPosition;

uniform mat4 uMvp;

varying float vW;

void main() {
  gl_Position = uMvp * vec4(aPosition, 1.);
  vW = gl_Position.z / 100.;
}
