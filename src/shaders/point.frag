precision mediump float;

uniform vec3 uSelected;

varying vec3 vPos;

void main() {
  vec2 cxy = 2.0 * gl_PointCoord - 1.0;
  float r = dot(cxy, cxy);
  if (r > 1.0) { discard; }
  gl_FragColor = (vPos == uSelected) ? vec4(0, 1, 0, 1) : vec4(1, 1, 1, 1);

}
