export default `
precision mediump float;
uniform sampler2D sprite;

varying vec2 frag_uv;

void main(void) {
    vec4 c = texture2D(sprite, frag_uv);
    gl_FragColor = c;
}
`;
