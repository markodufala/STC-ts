"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Creating custom class of NumberElement used for sorting all numbers
 */
var NumberElement = /** @class */ (function () {
    function NumberElement(_element) {
        this.divisibleBy = [];
        this.primeNumber = false;
        this.element = _element;
        if (_element % 2 === 0) {
            this.parity = true;
        }
        else {
            this.parity = false;
        }
        for (var i = 1; i <= this.element; i++) {
            if (this.element % i === 0) {
                this.divisibleBy.push(i);
            }
        }
        if (this.divisibleBy.length === 2) {
            if (this.divisibleBy[0] = 1) {
                if (this.divisibleBy[1] = this.element) {
                    this.primeNumber = true;
                }
            }
        }
    }
    return NumberElement;
}());
exports.default = NumberElement;
