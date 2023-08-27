import { Render } from ".";

export class RenderImage extends Element {
    engine: Render;
    width: number;
    height: number;
    path: string;
    image: typeof Image
    texture: WebGLTexture

    constructor(path: string, render: Render) {
        super();

        this.path = path;
        this.engine = render;

        this.load_image();
    }

    load_image() {
        const self = this;
        const gl = this.engine.gl;

        self.texture = gl.createTexture() as WebGLTexture;
        gl.bindTexture(gl.TEXTURE_2D, self.texture);

        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

        let img = new Image();
        img.addEventListener('load', function() {
            self.width = img.width;
            self.height = img.height;

            gl.bindTexture(gl.TEXTURE_2D, self.texture)
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img)
            gl.generateMipmap(gl.TEXTURE_2D);
        })

        img.src = self.path;
    }

    render() { }
}