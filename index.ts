import readline from 'readline';

/* .createInterface() a riadky po napísané pod tým sa
používajú na inštanciu konfigurácie inputu a outputu */

const intFace = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
});

function sucet(a: number, b: number): number {  // funkcia zoberie cislo A a cislo B a vráti nám výsledok ako číslo
    var vysledok = (+a) + (+b); /* Vytvorím premennú vysledok, do ktorej priradíme čislo, ktoré vznikne na základe vykonanej operácie, ktorú sme si vyrbali a na základe inputu  */

    // taktiež môžeme namiesto priradenia do premennej rovno vrátiť výsledok operácie, čiže: return (+a) + (+b);
    return vysledok // vraciame výsledok po operácii
}

function odcitanie(a: number, b: number): number {
    var vysledok = (+a) - (+b); 
    return vysledok
}

function nasobenie(a: number, b: number): number {
    var vysledok = (+a) * (+b); 
    return vysledok
}

function delenie(a: number, b: number): number {
    var vysledok = (+a) / (+b); 
    return vysledok
}

function main(): void{ /* Aby sme povedali že táto hlavná funkcia nebude nič vraciať
                     ako výsledok, tak za názovFunkcie(): napíšeme void, čo znači že nám nič nevráti */

    /* metóda .question zobrazí náš dotaz v termináli a počká kým zadáme vstup, ktorý priradí do danej premennej.
    Následne sa presunie ku dalšej metóde ktora znova priradí input to premenej. A to celé sa opakuje ešte raz. */
    intFace.question("Zadajte prvé číslo: ", (prveCislo: number) => { 
        intFace.question("Zadajte váš operátor: (+,-,*,/)", (operator: string)=> {
            intFace.question("Zadajte váš operátor:", (druheCislo: number)=> {  
                /* V tomto štádiu uź máme všetky inputy, ktoré potrebujeme 
                pre výpočet uložené do premenných a môžeme začať počítať. */

            if (operator ==="+"){  /* porovnávame našu premennú operator s matematickými znamienkami, ak sa to znamienko rovná +,-,*,/ tak sa vykonajú operácie pod tým  */
                // vypíšeme do console, náš výsledok,
                console.log(`Súčet týchto čísel je:`, sucet(prveCislo,druheCislo));
                intFace.close(); // ukončenie programu a prijímania inputu
            }
            else if (operator ==="-"){
                console.log(`Odčítanie týchto čísel je:`, odcitanie(prveCislo,druheCislo));
                intFace.close();
            }
            else if (operator ==="*"){
                console.log(`Násobenie týchto čísel je:`, nasobenie(prveCislo,druheCislo));
                intFace.close();
            }
            else if (operator ==="/"){
                console.log(`Delenie týchto čísel je:`, delenie(prveCislo,druheCislo));
                intFace.close();
            }
            /* ak nebolo zadané správne znamienko na matematickú operáciu 
            tak sa vypíše to terminálu,že input operátora bol neplatný*/ 
            else{ 
                console.log("Neplatný input")
                intFace.close();
            }
            });
        });
    });
}
main();