import { Render } from "."

type VertexShader = {
    source: string,
    attribs: {
        [key: string]: {
            type: string,
            size: number
            shader_var: string;
        }
    },
    uniforms: {
        [key: string]: {
            type: string,
            size: number
            shader_var: string;
        }
    }
}

type FragmentShader = {
    source: string,
    uniforms: {
        [key: string]: {
            type: string,
            size: number
            shader_var: string;
        }
    }
}

const MAX_BATCH = 65535;

export class Shader {
    fragment: FragmentShader
    vertex: VertexShader
    engine: Render

    program: WebGLProgram
    vertex_shader: WebGLShader
    fragment_shader: WebGLShader

    shader_render_data: ArrayBuffer;

    constructor(vertex: VertexShader, fragment: FragmentShader, engine: Render) {
        this.vertex = vertex;
        this.fragment = fragment;
        this.engine = engine;

        console.debug("[render] initing a shader")
        this.init_buffer();
        this.compile();
        this.create_program();
    }

    init_buffer() {
        let attrib_size = 0;
        for (var k of Object.values(this.vertex.attribs)) {
            attrib_size += k.size
        }

        // MAX_BATCH is the max number of el per layer (ie per draw call also)
        this.shader_render_data = new Float32Array(attrib_size * MAX_BATCH);
    }

    compile() {
        this.vertex_shader = this.compile_shader(this.vertex.source, "VERTEX");
        this.fragment_shader = this.compile_shader(this.fragment.source, "FRAGMENT");
    }

    compile_shader(source_code: string, type: 'VERTEX' | 'FRAGMENT'): WebGLShader {
        const gl = this.engine.gl;

        let shader: WebGLShader;
        if (type == "VERTEX") {
            shader = gl.createShader(gl.VERTEX_SHADER) as WebGLShader;
        } else {
            shader = gl.createShader(gl.FRAGMENT_SHADER) as WebGLShader;
        }

        gl.shaderSource(shader, source_code);
        gl.compileShader(shader);

        if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            const error = gl.getShaderInfoLog(shader);
            gl.deleteShader(shader);
            const msg = `
                Error while compiling a shader : 
                ${error}
            `;
            throw new Error(msg)
        }

        return shader;
    }

    init_attrib() {
        let offset = 0;
        for (var attrib of Object.values(this.vertex.attribs)) {
            this.bind_attrib(attrib.shader_var, attrib.size, offset);
            // everything is float for the moment (4 bytes)
            offset += 4 * attrib.size
        }
    }

    bind_attrib(name: string, size: number, stride: number) {
        const gl = this.engine.gl;
        const location = gl.getAttribLocation(this.program, name);
        gl.enableVertexAttribArray(location);
        gl.vertexAttribPointer(location, size, gl.FLOAT, true, stride, 0);
        this.engine.angle_array_ext.vertexAttribDivisorANGLE(location, 1);
    }

    get_uniform(name: string) {
        return this.engine.gl.getUniformLocation(this.program, name);
    }

    create_program() {
        const gl = this.engine.gl;
        this.program = gl.createProgram() as WebGLProgram;
        gl.attachShader(this.program, this.vertex_shader);
        gl.attachShader(this.program, this.fragment_shader);
        gl.linkProgram(this.program);
    }

    use_shader() {
        const gl = this.engine.gl;
        gl.useProgram(this.program);
    }
}
