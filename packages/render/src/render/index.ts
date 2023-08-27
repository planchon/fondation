export class Render {
    canvas: HTMLCanvasElement
    gl: WebGL2RenderingContext;

    position_buffer: WebGLBuffer
    texcoords_buffer: WebGLBuffer
    angle_array_ext: ANGLE_instanced_arrays

    constructor(canvas: HTMLCanvasElement) {
        console.log("[render] initing the engine");

        this.canvas = canvas;

        window.addEventListener("resize", () => {
            this.on_resize();
        })

        this.init_engine();
        this.clear_background();
    }

    init_engine() {
        this.on_resize();

        const ctx = this.canvas.getContext("webgl2");

        if (!ctx) {
            throw Error("Error getting the WebGL2 context")
        } else {
            this.gl = ctx as WebGL2RenderingContext;
        }

        this.angle_array_ext = ctx.getExtension("ANGLE_instanced_arrays") as ANGLE_instanced_arrays
        this.init_rect_buffers();
    }

    init_rect_buffers() {
        const gl = this.gl

        // we only create a rect, bc all images are only rect
        this.create_buffer(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array([0, 1, 2, 2, 1, 3]))
        this.create_buffer(gl.ARRAY_BUFFER, new Uint8Array([0, 0, 0, 1, 1, 0, 1, 1]))

        console.debug("[render] buffers inited")
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
        const buffer_id = this.gl.createBuffer() as WebGLBuffer
        this.gl.bindBuffer(type, buffer_id);
        this.gl.bufferData(type, src, this.gl.STATIC_DRAW);
        return buffer_id;
    }

    // flush the render buffer into GPU
    flush() {
        const gl = this.gl;
        gl.depthFunc(gl.LEQUAL);
    }
}
