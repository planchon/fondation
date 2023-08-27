export default `
attribute vec2 g;
attribute vec2 pos;
attribute vec2 uv;

void main(void) {
    gl_Position = vec4(g + pos + uv, 0, 1.0);
}
`;
