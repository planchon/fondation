import { Entity } from "./entity.ts";
import { System } from "./system.ts";

export class Engine {
    entities: Entity[];

    tick_system: System[];
    render_system: System[];

    constructor() {
        this.entities = []
        this.tick_system = []
        this.render_system = []
    }

    add_render_system(system: System) {
        this.render_system.push(system);
    }

    add_tick_system(system: System) {
        this.tick_system.push(system);
    }

    render(dt: number) {
        for (var i = 0; i < this.render_system.length; i++) {
            this.render_system[i].update(dt)
        }
    }

    tick(dt: number) {
        for (var i = 0; i < this.tick_system.length; i++) {
            this.tick_system[i].update(dt)
        }
    }
}
