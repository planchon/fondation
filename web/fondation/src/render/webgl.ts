class WebGLRender {
    gl: WebGL2RenderingContext

    constructor(canvas: HTMLCanvasElement) {
        this.gl = canvas.getContext("webgl2") as WebGL2RenderingContext
    }
}
