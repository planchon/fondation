export class Bits {
    _bits: boolean[];
    length: number;

    constructor(length: number = 0) {
        this._bits = []
        this.length = length;
    }

    set(index: number, value: boolean) {
        this._bits[index] = value;
        for (var i = 0; i < this._bits.length; i++) {
            if (this._bits[i] == undefined) {
                this._bits[i] = false
            }
        }
        this.length = this._bits.length
    }

    and(right: Bits): Bits {
        const max = Math.max(this.length, right.length);
        const and_bits = new Bits(max);

        for (var i = 0; i < max; i++) {
            and_bits.set(i, this._bits[i] && right._bits[i]);
        }

        return and_bits;
    }

    or(right: Bits): Bits {
        const max = Math.max(this.length, right.length);
        const and_bits = new Bits(max);

        for (var i = 0; i < max; i++) {
            and_bits.set(i, this._bits[i] || right._bits[i]);
        }

        return and_bits;
    }

    is_zero(): boolean {
        let i = 0;

        while (i < this.length) {
            if (this._bits[i]) return false
        }

        return true;
    }

    to_string(): string {
        let res = "";

        for (var i = 0; i < this.length; i++) {
            if (this._bits[i]) {
                res += i
            }
        }

        return res
    }
}
