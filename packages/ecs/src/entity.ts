import { Component } from "./component";

export class Entity {
    components: Map<string, Component>;

    constructor() {
        this.components = new Map();
    }

    add_component(c: Component): void {
        this.components.set(
            c.constructor.name,
            c
        )
    }

    get_component<T extends Component>(c: string): T {
        return this.components.get(c) as T
    }
}
