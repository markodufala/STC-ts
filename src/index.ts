import { type } from 'os';
import Nastavenia from './Nastavenia';
import Cisla from './Cisla';
import { count } from 'console';

let cisla: Cisla[] = []
let vsetkyCisla: string = "";
let parneCisla: string = "";
let neparneCisla: string = "";
let delitele: string[] = ["", "", "", "", "", "", "", "", ""];
let prvoCisla: string = "";


/**
 * Pred definované nastavenia type
 */
 let startSettings: Nastavenia = {
    MAX_SAFE_INTEGER: 100000, // toto je horná hranica intervali pre náhodné čislo, malo by tam fungovať aj 9007199254740991 
    DLZKA_POLA: 100
};

/**
 * funkcia automaticky prida cislo do hlavneho stringu s oddelovacom, kotry sluzi na prehladnost
 * @param hlavnyString do tohto hlavneho stringy pridavame Cislo
 * @param cislo cislo ktore pridavame do hlavneho stringu
 * @param oddelovac oddelovac zprehladnuje string
 * @returns 
 */
function pridajDoStringu(hlavnyString: string, cislo: number, oddelovac: string = ","){
    if(hlavnyString === "") {
        hlavnyString += JSON.stringify(cislo);
        } else {
        hlavnyString += ` ${oddelovac} ${JSON.stringify(cislo)}`;
        }
    return hlavnyString
}

// generujú sa náhodné čísla a vytváraju sa nové objekty Classy Cisla
for(let i = 0; i < startSettings.DLZKA_POLA; i++) {
    cisla.push(new Cisla(randomNumber(1 , startSettings.MAX_SAFE_INTEGER)));
}

/**
 * Funkcia pre generovanie náhodneho čísla
 * @param minumum minimalna hodnota
 * @param maximum maximálna hodota
 * @returns 
 */
function randomNumber(minumum : number, maximum : number){
    return Math.floor(Math.random() * (maximum - minumum)) + minumum;
}

cisla.forEach((ciselnyElement) => {
    vsetkyCisla = pridajDoStringu(vsetkyCisla, ciselnyElement.element)
    if(ciselnyElement.parnost == true) {
        parneCisla = pridajDoStringu(parneCisla, ciselnyElement.element)
        for(let index = 0; index < 9; index++) {
            if(ciselnyElement.delitele.indexOf(index + 1) > 0) {
                delitele[index] = pridajDoStringu(delitele[index], ciselnyElement.element)
            }
        }
    } else {
        neparneCisla = pridajDoStringu(neparneCisla, ciselnyElement.element)
        if(ciselnyElement.prvocislo) {  
            prvoCisla = pridajDoStringu(prvoCisla, ciselnyElement.element)
        }
    }
});

console.log("Náhodne vybranné čísla")
console.log(vsetkyCisla)
console.log("Párne čísla")
console.log(parneCisla)
console.log("Nepárne čísla")
console.log(neparneCisla)
delitele.forEach((element, delitel) => {
    console.log("Čísla delitelné číslom");
    console.log(delitel+1)
    console.log(element)
});
console.log("Prvočísla");
console.log(prvoCisla)



