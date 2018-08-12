precision mediump float;

varying float vW;

void main(void) {
  gl_FragColor = vec4(1., 1., 1., 1.) * vW;
  gl_FragColor.w = 1.;
}
