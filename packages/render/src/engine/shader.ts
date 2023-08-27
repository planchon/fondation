import { Render } from "."

export type VertexShader = {
    source: string,
    attribs: {
        [key: string]: {
            size: number
            shader_var: string;
        }
    },
}

export type FragmentShader = {
    source: string,
}

export const MAX_BATCH = 65535;

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
        this.compile();
        this.create_program();
    }

    get_attrib_element_size(): number {
        let attrib_size = 0;
        for (var k of Object.values(this.vertex.attribs)) {
            attrib_size += k.size
        }

        return attrib_size;
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

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            const error = gl.getShaderInfoLog(shader);
            throw new Error(`Error while compiling the shader ${type}\n\n${error}`)
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

    bind_attrib(name: string, size: number, offset: number) {
        const gl = this.engine.gl;
        const location = gl.getAttribLocation(this.program, name);
        gl.enableVertexAttribArray(location);
        gl.vertexAttribPointer(location, size, gl.FLOAT, false, this.get_attrib_element_size() * 4, offset);
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

        if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
            throw new Error("program failed to link" + gl.getProgramInfoLog(this.program))
        }
    }

    use_shader() {
        const gl = this.engine.gl;
        gl.useProgram(this.program);
    }
}
