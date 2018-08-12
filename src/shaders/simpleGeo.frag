precision mediump float;

uniform vec3 uColor;

varying float vW;

void main(void) {
  gl_FragColor = vec4(uColor, 1.) * vW;
  gl_FragColor.w = 1.;
}
