"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * classa Cisla, na roztriedenie vygenerovanych cisel
 */
var Cisla = /** @class */ (function () {
    function Cisla(_element) {
        this.delitele = [];
        this.prvocislo = false;
        this.element = _element;
        // parnost
        if (_element % 2 === 0) {
            this.parnost = true;
        }
        else {
            this.parnost = false;
        }
        //delitele
        for (var i = 1; i <= this.element; i++) {
            if (this.element % i === 0) {
                this.delitele.push(i);
            }
        }
        //prvocislo kontrola
        if (this.delitele.length === 2) {
            if (this.delitele[0] = 1) {
                if (this.delitele[1] = this.element) {
                    this.prvocislo = true;
                }
            }
        }
    }
    return Cisla;
}());
exports.default = Cisla;
