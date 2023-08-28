import { Component } from "@fondation/ecs";

export class SpriteComponent extends Component {
    u: number;
    v: number;

    scale: number;
    rotation: number;

    constructor(u: number, v: number, scale: number = 1, rotation: number = 0) {
        super();

        this.u = u;
        this.v = v;
        this.scale = scale;
        this.rotation = rotation;
    }
}
