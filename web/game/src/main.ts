import { SpriteRenderEngine, Render } from "@fondation/render";
import { Engine } from "@fondation/ecs";
//@ts-ignore
import Stats from "stats-js";

function main() {
    console.log("[game  ] launching the game");
    var stats = new Stats();
    stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild(stats.dom);

    const canvas: HTMLCanvasElement = document.getElementById("game") as HTMLCanvasElement;

    // ecs engine
    const engine = new Engine();

    // rendering engine
    const main_render = new Render(canvas);

    const render = new SpriteRenderEngine(main_render, "/tiles.png");

    const loop = () => {
        stats.begin();

        render.draw();

        stats.end();
        requestAnimationFrame(loop);
    }

    loop();
}

main();
