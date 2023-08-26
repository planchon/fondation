import { Entity } from "./entity";
import { Engine } from "./engine.ts";

export class System {
    entities: Entity[];
    engine: Engine;

    constructor(engine: Engine) {
        this.entities = [];
        this.engine = engine;
    }

    update(dt: number) { }
}
