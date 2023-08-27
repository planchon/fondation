export default `
precision mediump float;

varying vec3 i;

void main(void) {
    gl_FragColor = vec4(i, 1.0);
}
`;
