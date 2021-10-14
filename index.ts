import readline from 'readline';

const intFace = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
});

/* Vo vyšie napísanom kóde sa readline.createInterface() a riadky po napísané pod tým.
používajú na inštanciu konfigurácie inputu a outputu */



function main(): void{ /* Aby sme povedali že táto hlavná funkcia nebude nič vraciať
                     ako výsledok, tak za názovFunkcie(): napíšeme void, čo znači že nám nič nevráti */

    /* metóda .question zobrazí náš dotaz v termináli a počká kým zadáme vstup, ktorý priradí do danej premennej.
    Následne sa presunie ku dalšej metóde ktora znova priradí input to premenej. A to celé sa opakuje ešte raz. */
    intFace.question("Zadajte prvé číslo: ", (prveCislo: number) => { 
        intFace.question("Zadajte váš operátor: (+,-,*,/)", (operator: string)=> {
            intFace.question("Zadajte váš operátor:", (druheCislo: number)=> {
            
                /* V tomto štádiu uź máme všetky inputy, ktoré potrebujeme 
                pre výpočet uložené do premenných a môžeme začať počítať. */

            if (operator ==="+"){  /* porovnávame našu premennú operator s matematickými znamienkami, ak sa to 
                                    znamienko rovná +,-,*,/ tak sa vykonajú operácie pod tým  */
                var vysledok = (+prveCislo) + (+druheCislo); /* Vytvorím premennú vysledok, do ktorej priradíme čislo, 
                                                                ktoré vznikne na základe vykonanej operácie, ktorú sme si vyrbali */
                console.log(`Súčet týchto čísel je ${vysledok}`); // vypíšeme do console, náš výsledok,
                intFace.close(); // ukončenie programu a prijímania inputu
            }
            else if (operator ==="-"){
                var vysledok = (+prveCislo) - (+druheCislo);
                console.log(`Odčítanie týchto čísel je ${vysledok}`);
                intFace.close();
            }
            else if (operator ==="*"){
                var vysledok = (+prveCislo) * (+druheCislo);
                console.log(`Násobenie týchto čísel je ${vysledok}`);
                intFace.close();
            }
            else if (operator ==="/"){
                var vysledok = (+prveCislo) / (+druheCislo);
                console.log(`Delenie týchto čísel je ${vysledok}`);
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