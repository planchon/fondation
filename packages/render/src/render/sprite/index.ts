import { FragmentShader, MAX_BATCH, Render, Shader, VertexShader } from "../../engine"

import fragment_shader_source from "./shader/main.fragment";
import vertex_shader_source from "./shader/main.vertex";

export class SpriteRenderEngine {
    shader: Shader
    render: Render

    internal_array: ArrayBuffer
    elements_data: Float32Array;
    elements_buffer: WebGLBuffer;
    elements_count: number = 0;

    constructor(render: Render) {
        console.log("[render] initing the sprite engine");
        this.render = render;

        const vertex_shader: VertexShader = {
            source: vertex_shader_source,
            attribs: {
                "pos": {
                    size: 2,
                    shader_var: "pos"
                },
                "col": {
                    size: 3,
                    shader_var: "col"
                },
            }
        }

        const fragment_shader: FragmentShader = {
            source: fragment_shader_source
        }

        this.shader = new Shader(vertex_shader, fragment_shader, render)

        this.internal_array = new ArrayBuffer(this.shader.get_attrib_element_size() * 4 * MAX_BATCH);
        this.elements_data = new Float32Array(this.internal_array);

        this.init_rect_buffers();

        // we use the internal_array for storing the data
        // we use the element_data to store the data well
        const gl = this.render.gl

        this.elements_buffer = gl.createBuffer() as WebGLBuffer;
        gl.bindBuffer(gl.ARRAY_BUFFER, this.elements_buffer);
        // ref to internal_array, element_data -> internal_array
        gl.bufferData(gl.ARRAY_BUFFER, this.internal_array, gl.DYNAMIC_DRAW);

        this.shader.init_attrib();

        console.log("[render] sprite engine completed init")

        this.draw()
    }

    init_rect_buffers() {
        const gl = this.render.gl
        // we only create a rect, bc all images are only rect
        this.render.create_buffer(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array([0, 1, 2, 2, 1, 3]))

        this.render.create_buffer(gl.ARRAY_BUFFER, new Float32Array([0, 0, 0, 1, 1, 0, 1, 1]))
        this.shader.bind_attrib("g", 2, 0);
    }

    draw() {
        let i = 0;

        this.elements_data[i++] = -1;
        this.elements_data[i++] = 0;
        this.elements_data[i++] = 1;
        this.elements_data[i++] = 0;
        this.elements_data[i++] = 0;

        this.elements_data[i++] = 0;
        this.elements_data[i++] = 0;
        this.elements_data[i++] = 0;
        this.elements_data[i++] = 1;
        this.elements_data[i++] = 0;

        this.elements_data[i++] = -1;
        this.elements_data[i++] = -1;
        this.elements_data[i++] = 0;
        this.elements_data[i++] = 0;
        this.elements_data[i++] = 1;

        this.elements_count = 3;

        this.shader.use_shader();

        const gl = this.render.gl;

        const sub_array = this.elements_data.subarray(0, this.elements_count * this.shader.get_attrib_element_size())

        gl.bufferSubData(gl.ARRAY_BUFFER, 0, sub_array);
        gl.drawElementsInstanced(gl.TRIANGLES, 6, gl.UNSIGNED_BYTE, 0, this.elements_count);

        console.debug("[render] draw completed");
    }
}
