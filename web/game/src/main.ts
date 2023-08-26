import { Render } from "@fondation/engine";
import { Engine } from "@fondation/ecs";

function main() {
    console.log("[game  ] launching the game");

    const canvas: HTMLCanvasElement = document.getElementById("game") as HTMLCanvasElement;

    const engine = new Engine();
    const render = new Render(canvas);
}
main();
