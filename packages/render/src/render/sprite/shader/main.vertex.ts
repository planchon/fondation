export default `
attribute vec2 g;
attribute vec2 pos;
attribute vec2 col;

varying vec2 uv;

void main(void) {
    uv = col + g * 0.05;
    gl_Position = vec4(g + pos, 0, 1.0);
}
`;
