"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var intFace = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
});
/* Vo vyšie napísanom kóde sa readline.createInterface() a riadky po napísané pod tým.
používajú na inštanciu konfigurácie inputu a outputu */
function main() {
    /* metóda .question zobrazí náš dotaz v termináli a počká kým zadáme vstup, ktorý priradí do danej premennej.
    Následne sa presunie ku dalšej metóde ktora znova priradí input to premenej. A to celé sa opakuje ešte raz. */
    intFace.question("Zadajte prvé číslo: ", function (prveCislo) {
        intFace.question("Zadajte váš operátor: (+,-,*,/)", function (operator) {
            intFace.question("Zadajte váš operátor:", function (druheCislo) {
                /* V tomto štádiu uź máme všetky inputy, ktoré potrebujeme
                pre výpočet uložené do premenných a môžeme začať počítať. */
                if (operator === "+") { /* porovnávame našu premennú operator s matematickými znamienkami, ak sa to
                                        znamienko rovná +,-,*,/ tak sa vykonajú operácie pod tým  */
                    var vysledok = (+prveCislo) + (+druheCislo); /* Vytvorím premennú vysledok, do ktorej priradíme čislo,
                                                                    ktoré vznikne na základe vykonanej operácie, ktorú sme si vyrbali */
                    console.log("S\u00FA\u010Det t\u00FDchto \u010D\u00EDsel je " + vysledok); // vypíšeme do console, náš výsledok,
                    intFace.close(); // ukončenie programu a prijímania inputu
                }
                else if (operator === "-") {
                    var vysledok = (+prveCislo) - (+druheCislo);
                    console.log("Od\u010D\u00EDtanie t\u00FDchto \u010D\u00EDsel je " + vysledok);
                    intFace.close();
                }
                else if (operator === "*") {
                    var vysledok = (+prveCislo) * (+druheCislo);
                    console.log("N\u00E1sobenie t\u00FDchto \u010D\u00EDsel je " + vysledok);
                    intFace.close();
                }
                else if (operator === "/") {
                    var vysledok = (+prveCislo) / (+druheCislo);
                    console.log("Delenie t\u00FDchto \u010D\u00EDsel je " + vysledok);
                    intFace.close();
                }
                /* ak nebolo zadané správne znamienko na matematickú operáciu
                tak sa vypíše to terminálu,že input operátora bol neplatný*/
                else {
                    console.log("Neplatný input");
                    intFace.close();
                }
            });
        });
    });
}
main();
