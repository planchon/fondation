import { SpriteRenderEngine, Render } from "@fondation/render";
import { Engine } from "@fondation/ecs";

function main() {
    console.log("[game  ] launching the game");

    const canvas: HTMLCanvasElement = document.getElementById("game") as HTMLCanvasElement;

    // ecs engine
    const engine = new Engine();

    // rendering engine
    const main_render = new Render(canvas);
    const render = new SpriteRenderEngine(main_render);
}

main();
