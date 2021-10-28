import { type } from 'os';
import Nastavenia from './Nastavenia';
import Cisla from './Cisla';

let cisla: Cisla[] = []
let vsetkyCisla: string = "";
let prvoCisla: string = "";
let parneCisla: string = "";
let neparneCisla: string = "";
let delitele: string[] = ["", "", "", "", "", "", "", "", ""];


/**
 * Pred definované nastavenia type
 */
 let startSettings: Nastavenia = {
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
let pridajDoStringu = (hlavnyString: string, cislo: number, oddelovac: string = ","): string => {
    if(hlavnyString === "") {
        hlavnyString += JSON.stringify(cislo);
        } else {
        hlavnyString += ` ${oddelovac} ${JSON.stringify(cislo)}`;
        }
    return hlavnyString
}


// Generating random numbers, and creating objects with our pre-defined class NumberElement
for(let i = 0; i < startSettings.DLZKA_POLA; i++) {
    cisla.push(new Cisla(Math.floor(Math.random() * (startSettings.MAX_SAFE_INTEGER - 1))))
}

cisla.forEach((ciselnyElement) => {
    vsetkyCisla = pridajDoStringu(vsetkyCisla, ciselnyElement.element);

   
    if(ciselnyElement.parnost) {
        parneCisla = pridajDoStringu(parneCisla, ciselnyElement.element);
        
        delitele.forEach((element, index) => {
            if(ciselnyElement.delitele.indexOf(index + 1) > - 1) {
                delitele[index] = pridajDoStringu(delitele[index], ciselnyElement.element);
            }
        });
    } else {
        neparneCisla = pridajDoStringu(neparneCisla, ciselnyElement.element);

        if(ciselnyElement.prvocislo) {  
            prvoCisla = pridajDoStringu(prvoCisla, ciselnyElement.element);
        }
    }

});

// for(let i = 0; i < startSettings.DLZKA_POLA; i++) {

// }

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

