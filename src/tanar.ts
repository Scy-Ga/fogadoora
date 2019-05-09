// Megjegyzések stílusa: JSDoc 3 -> http://usejsdoc.org/

/** Egy telket leíró osztály */
export default class Tanar {

    private nev: string;
    private foglalasok: Map<number, string>;

    public constructor(nev: string) {
        this.nev = nev;
        this.foglalasok = new Map<number, string>();
    }

    public foglalastHozzaad(foglalas: string):boolean {
        return true;
    }
}

