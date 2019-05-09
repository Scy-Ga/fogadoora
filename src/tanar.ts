// Megjegyzések stílusa: JSDoc 3 -> http://usejsdoc.org/

/** Egy telket leíró osztály */
export default class Tanar {

    private nev: string;
    private foglalasok: Map<number, string>;

    public constructor(nev: string) {
        this.nev = nev;
        this.foglalasok = new Map<number, string>();
    }

    public foglalastHozzaad(foglalas: string): boolean {
        // 16:30 2017.10.28-18:48

        const m: string[] = foglalas.split(" ");
        const m2: string[] = m[0].split(":");

        let foglaltIdopontPercekben: number = parseInt(m2[0], 10) * 60 + parseInt(m2[1], 10);

        if (this.foglalasok.has(foglaltIdopontPercekben)) {
           return false;
        } else {
            this.foglalasok.set(foglaltIdopontPercekben, m[1]);
            return true;
        }

    }


    public get legelsoFoglalas(): string {

        const foglalasokRendezve = new Map([...this.foglalasok].sort());
        const test: string = foglalasokRendezve.values().next().value;
        return test;
    }

}

