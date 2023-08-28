export default `
attribute vec2 g;

attribute vec2 pos;
attribute vec2 uv;
attribute vec2 scale;
attribute float rotation;

uniform vec2 screen;
uniform mat4 projection;

varying vec2 frag_uv;

void main(void) {
    frag_uv = vec2((g.x + uv.x) / 23.0,(g.y + uv.y) / 21.0);

    //gl_Position = vec4((g + pos) * scale, 0, 1.0);
    gl_Position = projection * vec4(g, 0, 1.0);
}
`;
