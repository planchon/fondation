export default `
precision mediump float;
uniform sampler2D sprite;

varying vec2 uv;

void main(void) {
    vec4 c = texture2D(sprite, uv);
    //c = vec4(uv, 0, 1);
    gl_FragColor = c;
}
`;
