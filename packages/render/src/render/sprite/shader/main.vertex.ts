export default `
attribute vec2 g;
attribute vec2 pos;
attribute vec3 col;

varying vec3 i;

void main(void) {
    i = col;
    gl_Position = vec4(g + pos, 0, 1.0);
}
`;
