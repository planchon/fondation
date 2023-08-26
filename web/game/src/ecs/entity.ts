import { Component } from "./component";

export class Entity {
    component: Component[];

    constructor() {
        this.component = [];
    }

    add_component(c: Component) {
        this.component.push(c);
    }
}
