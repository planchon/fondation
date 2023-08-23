import { Entity } from "./entity";
import { System } from "./system";

export class Engine {
    entities: Entity[];
    render_system: System[];
    tick_system: System[];

    constructor() {
        this.entities = [];
        this.render_system = [];
        this.tick_system = [];
    }

    add_entity(e: Entity): void {
        this.entities.push(e)
    }

    add_entity_batch(ee: Entity[]): void {
        for (var e of ee) {
            this.add_entity(e)
        }
    }

    add_render_system(s: System): void {
        this.render_system.push(s);
    }

    add_tick_system(s: System): void {
        this.tick_system.push(s)
    }

    render(dt: number) {
        for (var s of this.render_system) {
            s._update(dt)
        }
    }

    update(dt: number) {
        for (var s of this.tick_system) {
            s._update(dt);
        }
    }
}
