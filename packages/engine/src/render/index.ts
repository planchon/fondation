export class Render {
    canvas: HTMLCanvasElement
    gl: WebGL2RenderingContext;

    position_buffer: WebGLBuffer
    texcoords_buffer: WebGLBuffer

    constructor(canvas: HTMLCanvasElement) {
        console.log("[render] initing the engine");

        this.canvas = canvas;
        this.init_engine();
        this.clear_background();

        window.addEventListener("resize", () => {
            this.on_resize();
        })
    }

    init_engine() {
        this.on_resize();

        const ctx = this.canvas.getContext("webgl2");

        if (!ctx) {
            throw Error("Error getting the WebGL2 context")
        } else {
            this.gl = ctx as WebGL2RenderingContext;
        }
    }

    init_rect_buffers() {
        const gl = this.gl

        const positions = [
            0, 0,
            0, 1,
            1, 0,
            1, 0,
            0, 1,
            1, 1,
        ];
        this.position_buffer = this.create_buffer(gl.ARRAY_BUFFER, new Float32Array(positions)) as WebGLBuffer;

        const texcoords = [
            0, 0,
            0, 1,
            1, 0,
            1, 0,
            0, 1,
            1, 1,
        ]
        this.texcoords_buffer = this.create_buffer(gl.ARRAY_BUFFER, new Float32Array(texcoords)) as WebGLBuffer;
    }

    on_resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    clear_background() {
        const gl = this.gl;

        gl.clearColor(0, 0, 0, 1);
        gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
    }

    create_buffer(type, src) {
        const buffer_id = this.gl.createBuffer()
        this.gl.bindBuffer(type, buffer_id);
        this.gl.bufferData(type, src, this.gl.STATIC_DRAW);
        return buffer_id;
    }

    flush() {
        const gl = this.gl;
        gl.depthFunc(gl.LEQUAL);
    }
}
