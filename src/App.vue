<template>
  <div id="app">
    <p>
      Linkek:
      <a href="fogado.txt" download>fogado.txt</a>
      <a href="Kerítés_fel.pdf" target="_blank">Feladat</a>
      <a href="Kerítés_jav.pdf" target="_blank">Javítási</a>
      <a href="https://github.com/Scy-Ga/fogadoora" target="_blank">Forrás</a>
      <a href="https://github.com/Scy-Ga/fogadoora" target="_blank">SDK</a>
    </p>
    <txt-reader
      title="Kérem töltse fel a forrás (fogado.txt) állományt!"
      @load="txtSorai = $event"
    />
    <div v-if="mutat" id="megoldas">
      <p>
        2. feladat:
        <br>
        Az eladott telkek száma {{ telkek.length }}
      </p>
      <p>
        3. feladat:
        <br>
        A {{ utolsoTelek.oldal }} oldalon adták el az utolsó telket
        <br>
        Az utolsó telek házszáma: {{ utolsoTelek.hazSzama }}
      </p>
      <p>
        4. feladat:
        <br>
        A szomszédossal egyezik a kerítés színe: {{ ugyanOlyanSzinuKerites }}
      </p>
      <p>
        5. feladat:
        <br>Adjon meg egy házszámot!
        <input v-model="hazszamInputStr" type="number" min="1" max="117">
        <br>
        A kerírés színe / állapota: {{ 0 }}
        <br>
        Egy lehetséges festési szín: {{ 0 }}
      </p>
    </div>
    <p v-if="mutat"><txt-writer title="utcakep.txt állomány mentése" :content="utcakep" filename="utcakep.txt"/></p>
    <!-- Megoldás DIV -->

    <!-- Nem a feladat része : -->
    <div id="egyebek" v-if="mutat">
      <p><pre><b>fogado.txt fájl:</b><br>{{ 0 }}</pre></p>
      <p><pre><b>ido.txt fájl:</b><br>{{ 0 }}</pre></p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import Tanar from "./tanar";
import TxtReader from "./components/TxtReader.vue";
import TxtWriter from "./components/TxtWriter.vue";

// eslint-disable-next-line
@Component({ components: { TxtReader, TxtWriter } })
export default class App extends Vue {
  private tanarok: Map<string, Tanar> = new Map<string, Tanar>();
  private txtSorai: string = ""; // Watch végett nem lehet ékezetes azonosító! (pl.: forrás)!
  private mutat: boolean = false;
  
  @Watch("txtSorai", { immediate: true, deep: true })
  private haForrásVáltozik(val: string, oldVal: string) {
    if (val !== "") this.feldolgoz();
  }

  private feldolgoz(): void {
    this.txtSorai.split("\n").forEach(i => {
        const aktSor: string = i.trim();
        if (aktSor.length > 0) {
          const m: string[] = aktSor.split(" ");
          const tanarNeve: string = m[0] + " " + m[1];
          if (!this.tanarok.has(tanarNeve)) {
            this.tanarok.set(tanarNeve, new Tanar(tanarNeve));
          }
          this.tanarok.get(tanarNeve)!.foglalastHozzaad(m[2] + " " + m[3]);

        };
    });
  }
} 
</script>

<style>
#app {
  font-family: Courier;
}
#megoldas {
  background-color: lightgrey;
  padding:0px 10px;
  border-radius: 10px;
  max-width: 490px;
}
a {
  text-decoration: none;
  padding-left: 10px;
}
</style>
