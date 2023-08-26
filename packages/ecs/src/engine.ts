import { Entity } from "./entity";
import { System } from "./system";
import { Bits } from "./bits";

export class Engine {
    entities: Entity[];
    render_system: System[];
    tick_system: System[];

    component_family: Set<string>;
    number_of_components: number = 0;
    component_to_bits: Map<string, Bits>;

    constructor() {
        console.log("[ecs   ] initing the engine");

        this.entities = [];
        this.render_system = [];
        this.tick_system = [];
        this.component_family = new Set()
        this.component_to_bits = new Map()
    }

    add_entity(e: Entity): void {
        this.entities.push(e)

        for (var c of e.components.keys()) {
            // registering all the components
            if (!this.component_family.has(c)) {
                this.component_family.add(c);
                const component_bits = new Bits();
                component_bits.set(this.number_of_components, true);
                this.number_of_components += 1;
                this.component_to_bits.set(c, component_bits);
            }
        }

        e.compute_bits(this);
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
