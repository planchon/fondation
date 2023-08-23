import { Component } from "./component";
import { Engine } from "./engine";
import { Entity } from "./entity";
import { Bits } from "./bits";

export class System {
    engine: Engine;
    components: Component[]
    system_bits: Bits;
    system_bits_computed: string;
    cache_entities: Entity[];

    constructor(engine: Engine, components: Component[]) {
        this.engine = engine;
        this.components = components;
        this.cache_entities = [];
        this.system_bits = new Bits();
        this.generate_system_bits()
        this.system_bits_computed = this.system_bits.to_string();
    }

    generate_system_bits() {
        let bits = new Bits();
        for (var c of this.components) {
            //@ts-ignore
            let c_bits = this.engine.component_to_bits.get(c.name) as Bits;
            bits = bits.or(c_bits)
        }

        this.system_bits = bits;
    }

    // get all the entities that have the components
    getEntities(): Entity[] {
        let picked_entities: Entity[] = [];
        for (var ent of this.engine.entities) {
            let ent_and_system = this.system_bits.and(ent.entity_bits).to_string()
            if (ent_and_system == this.system_bits_computed) {
                picked_entities.push(ent);
            }
        }

        this.cache_entities = picked_entities;

        return picked_entities;
    }

    _update(dt: number) {
        const entities = this.getEntities();

        for (var e of entities) {
            this.update(e, dt);
        }
    }

    // need to be override
    // this is where we put the logic for the entity update logic
    update(e: Entity, dt: number): void { }
}
