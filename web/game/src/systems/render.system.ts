import { Engine, System, Entity } from "@fondation/ecs";
import { PositionComponent } from "../components/position.component";
import { SpriteComponent } from "../components/sprite.component";
import { SpriteRenderEngine } from "@fondation/render";

export class RenderSystem extends System {
    render: SpriteRenderEngine;

    constructor(engine: Engine, render: SpriteRenderEngine) {
        super(engine, [PositionComponent, SpriteComponent]);
        this.render = render;
    }

    update(e: Entity, dt: number) {
        const pos = e.get_component<PositionComponent>(PositionComponent.name);
        const sprite = e.get_component<SpriteComponent>(SpriteComponent.name)
    }
}
