import { Component } from "../src/component"
import { Engine } from "../src/engine";
import { Entity } from "../src/entity"
import { System } from "../src/system";

class PositionComponent extends Component {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        super();
        this.x = x;
        this.y = y;
    }
}

class SpeedComponent extends Component {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        super();
        this.x = x;
        this.y = y;
    }
}

class ColorComponent extends Component {
    color: string;

    constructor(color: string) {
        super();
        this.color = color;
    }
}

class MovementSystem extends System {
    constructor(engine: Engine) {
        super(engine, [PositionComponent, SpeedComponent]);
    }

    update(e: Entity, dt: number) {
        const pos = e.get_component<PositionComponent>(PositionComponent.name);
        const speed = e.get_component<SpeedComponent>(SpeedComponent.name)
        pos.x = pos.x + speed.x * dt
        pos.y = pos.y + speed.y * dt
    }
}

class PrinterSystem extends System {
    constructor(engine: Engine) {
        super(engine, [ColorComponent])
    }

    update(e: Entity, dt: number) {
        const color = e.get_component<ColorComponent>(ColorComponent.name);
        console.log("color ", color);
    }
}


function main() {
    const entity_a = new Entity()
    entity_a.add_component(new PositionComponent(10, 10));
    entity_a.add_component(new SpeedComponent(10, 10));

    const entity_b = new Entity()
    entity_b.add_component(new PositionComponent(5, 5));
    entity_b.add_component(new ColorComponent("red"));

    const entity_c = new Entity()
    entity_c.add_component(new PositionComponent(20, 20));

    const engine = new Engine();
    engine.add_entity_batch([entity_a, entity_b, entity_c])

    engine.add_tick_system(new MovementSystem(engine));
    engine.add_render_system(new PrinterSystem(engine));

    engine.render(0.1);
    engine.update(0.1);
}

main()
