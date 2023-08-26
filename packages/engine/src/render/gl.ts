import { Render } from "."

export class Shader {
    vertex_source: string
    fragment_source: string
    engine: Render
    program: WebGLProgram

    vertex_shader: WebGLShader
    fragment_shader: WebGLShader

    constructor(vertex: string, fragment: string, engine: Render) {
        this.vertex_source = vertex;
        this.fragment_source = fragment;
        this.engine = engine;
    }

    compile() {
        this.vertex_shader = this.compile_shader(this.vertex_source, "VERTEX");
        this.fragment_shader = this.compile_shader(this.fragment_source, "FRAGMENT");
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
