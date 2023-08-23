import { Component } from "./component";
import { Engine } from "./engine";
import { Entity } from "./entity";

export class System {
    engine: Engine;

    constructor(engine: Engine, components: Component[]) {
        this.engine = engine;
    }

    // get all the entities that have the components
    getEntities(): Entity[] {
        return []
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
