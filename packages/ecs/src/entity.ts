import { Bits } from "./bits";
import { Component } from "./component";
import { Engine } from "./engine";

export class Entity {
    components: Map<string, Component>;
    entity_bits: Bits;

    constructor() {
        this.components = new Map();
        this.entity_bits = new Bits();
    }

    compute_bits(engine: Engine) {
        let entity_bit = new Bits();

        for (var c of this.components.keys()) {
            entity_bit = entity_bit.or(engine.component_to_bits.get(c) as Bits)
        }

        this.entity_bits = entity_bit;
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
