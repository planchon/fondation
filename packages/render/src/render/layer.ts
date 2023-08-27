export class Layer {
    data: Element[];
    z_index: number;
    should_render: boolean = true;

    constructor(z: number) {
        this.z_index = z;
        this.data = [];
    }

    add_element(el: Element) {
        this.data.push(el);
    }

    render() {
        if (!this.should_render) return;
    }
}
