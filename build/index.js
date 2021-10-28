"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Cisla_1 = __importDefault(require("./Cisla"));
var cisla = [];
var vsetkyCisla = "";
var prvoCisla = "";
var parneCisla = "";
var neparneCisla = "";
var delitele = [""];
/**
 * Pred definované nastavenia type
 */
var startSettings = {
    MAX_SAFE_INTEGER: 100000,
    DLZKA_POLA: 100
};
/**
 * funkcia automaticky prida cislo do hlavneho stringu s oddelovacom, kotry sluzi na prehladnost
 * @param hlavnyString do tohto hlavneho stringy pridavame Cislo
 * @param cislo cislo ktore pridavame do hlavneho stringu
 * @param oddelovac oddelovac zprehladnuje string
 * @returns
 */
var pridajDoStringu = function (hlavnyString, cislo, oddelovac) {
    if (oddelovac === void 0) { oddelovac = ","; }
    if (hlavnyString === "") {
        hlavnyString += JSON.stringify(cislo);
    }
    else {
        hlavnyString += " " + oddelovac + " " + JSON.stringify(cislo);
    }
    return hlavnyString;
};
// Generating random numbers, and creating objects with our pre-defined class NumberElement
for (var i = 0; i < startSettings.DLZKA_POLA; i++) {
    cisla.push(new Cisla_1.default(Math.floor(Math.random() * (startSettings.MAX_SAFE_INTEGER - 1))));
}
cisla.forEach(function (ciselnyElement) {
    vsetkyCisla = pridajDoStringu(vsetkyCisla, ciselnyElement.element);
    if (ciselnyElement.parnost) {
        parneCisla = pridajDoStringu(parneCisla, ciselnyElement.element);
        delitele.forEach(function (element, index) {
            if (ciselnyElement.delitele.indexOf(index + 1) > -1) {
                delitele[index] = pridajDoStringu(delitele[index], ciselnyElement.element);
            }
        });
    }
    else {
        neparneCisla = pridajDoStringu(neparneCisla, ciselnyElement.element);
        if (ciselnyElement.prvocislo) {
            prvoCisla = pridajDoStringu(prvoCisla, ciselnyElement.element);
        }
    }
});
// for(let i = 0; i < startSettings.DLZKA_POLA; i++) {
// }
console.log("Náhodne vybranné čísla");
console.log(vsetkyCisla);
console.log("Párne čísla");
console.log(parneCisla);
console.log("Nepárne čísla");
console.log(neparneCisla);
delitele.forEach(function (element, delitel) {
    console.log("Čísla delitelné číslom");
    console.log(delitel + 1);
    console.log(element);
});
console.log("Prvočísla");
console.log(prvoCisla);
