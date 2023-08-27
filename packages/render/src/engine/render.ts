export class Render {
    canvas: HTMLCanvasElement
    gl: WebGL2RenderingContext;

    position_buffer: WebGLBuffer
    texcoords_buffer: WebGLBuffer

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
    }


    on_resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    clear_background() {
        const gl = this.gl;

        gl.clearColor(0, 0, 0, 1);
        gl.viewport(0, 0, this.canvas.width, this.canvas.height);
        gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
    }

    create_buffer(type, src) {
        const gl = this.gl;
        const buffer_id = gl.createBuffer() as WebGLBuffer
        gl.bindBuffer(type, buffer_id);
        gl.bufferData(type, src, gl.STATIC_DRAW);
        return buffer_id;
    }
}

