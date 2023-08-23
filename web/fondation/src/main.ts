class Game {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;

    constructor() {
        console.log("[ENGINE] init the canvas")
        this.canvas = document.getElementById("game") as HTMLCanvasElement;
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight
        this.context = this.canvas.getContext("2d") as CanvasRenderingContext2D;

        this.run();
    }

    _run(callback: (now: DOMHighResTimeStamp) => void) {
        let then = performance.now();
        const animateLoop = (now: DOMHighResTimeStamp) => {
            requestAnimationFrame(animateLoop);
            const delta = now - then;
            const tolerance = 0.1;
            const interval = 1000 / 60;
            if (delta >= interval - tolerance) {
                then = now - (delta % interval);
                callback(now);
            }
        }
        requestAnimationFrame(animateLoop);
    }

    run() {
        this._run(() => {
        })
    }
}

new Engine();
