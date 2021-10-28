"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Cisla_1 = __importDefault(require("./Cisla"));
var cisla = [];
var vsetkyCisla = "";
var parneCisla = "";
var neparneCisla = "";
var delitele = ["", "", "", "", "", "", "", "", ""];
var prvoCisla = "";
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
function pridajDoStringu(hlavnyString, cislo, oddelovac) {
    if (oddelovac === void 0) { oddelovac = ","; }
    if (hlavnyString === "") {
        hlavnyString += JSON.stringify(cislo);
    }
    else {
        hlavnyString += " " + oddelovac + " " + JSON.stringify(cislo);
    }
    return hlavnyString;
}
// generujú sa náhodné čísla a vytváraju sa nové objekty Classy Cisla
for (var i = 0; i < startSettings.DLZKA_POLA; i++) {
    cisla.push(new Cisla_1.default(randomNumber(1, startSettings.MAX_SAFE_INTEGER)));
}
/**
 * Funkcia pre generovanie náhodneho čísla
 * @param minumum minimalna hodnota
 * @param maximum maximálna hodota
 * @returns
 */
function randomNumber(minumum, maximum) {
    return Math.floor(Math.random() * (maximum - minumum)) + minumum;
}
cisla.forEach(function (ciselnyElement) {
    vsetkyCisla = pridajDoStringu(vsetkyCisla, ciselnyElement.element);
    if (ciselnyElement.parnost) {
        parneCisla = pridajDoStringu(parneCisla, ciselnyElement.element);
        for (var index = 0; index < 9; index++) {
            if (ciselnyElement.delitele.indexOf(index + 1) > -1) {
                delitele[index] = pridajDoStringu(delitele[index], ciselnyElement.element);
            }
        }
    }
    else {
        neparneCisla = pridajDoStringu(neparneCisla, ciselnyElement.element);
        if (ciselnyElement.prvocislo) {
            prvoCisla = pridajDoStringu(prvoCisla, ciselnyElement.element);
        }
    }
});
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
