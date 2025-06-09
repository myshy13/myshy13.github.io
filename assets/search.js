const games = [
  "jelly truck",
  "slope",
  "minecraft",
  "run 3",
  "mr mine",
  "moto x3m",
  "opposite day",
  "2048",
  "cookie clicker",
  "tiny fishing",
  "hexanaut.io",
  "a small world cup",
  "asmallworldcup",
  "bitlife",
  "bitlife simulator",
  "slope 3",
  "subway surfers",
  "papa's freezeria",
  "papas freezeria",
  "papa's pizzeria",
  "papas pizzeria",
  "angry gran 2",
  "the impossible quiz",
  "mini putt",
  "mini golf",
  "fireboy and watergirl",
  "fire boy and water girl",
  "fireboy and watergirl 2",
  "fireboy and watergirl and the light temple",
  "tetris",
];

let params = new URLSearchParams(new URL(window.location.href).search);
let searchQuery = params.get("search");

function filterArray(array, searchString) {
  return array.filter((str) => str.includes(searchString));
}

if (searchQuery != "" && searchQuery != null) {
  console.log("seaching...");
  console.log("result: " + searchQuery);

  const results = filterArray(games, searchQuery);

  console.log(results);

  if ((results.length = 1)) {
    switch (results[0]) {
      case "jelly truck":
        window.location.assign(
          `${document.location.protocol}//${document.location.hostname}:${
            document.location.port
          }${"/src/jellytruck/index.html"}`
        );
        break;
      case "pacman":
        window.location.assign(
          `${document.location.protocol}//${document.location.hostname}:${
            document.location.port
          }${"/src/pacman/index.html"}`
        );
        break;
      case "mariokart":
        window.location.assign(
          `${document.location.protocol}//${document.location.hostname}:${
            document.location.port
          }${"/src/mariokart/index.html"}`
        );
        break;
      case "tetris":
        window.location.assign(
          `${document.location.protocol}//${document.location.hostname}:${
            document.location.port
          }${"/src/tetris/index.html"}`
        );
        break;
      case "fireboy and watergirl":
        window.location.assign(
          `${document.location.protocol}//${document.location.hostname}:${
            document.location.port
          }${"/src/fireboyandwatergirllighttemple/index.html"}`
        );
        break;
      case "fire boy and water girl":
        window.location.assign(
          `${document.location.protocol}//${document.location.hostname}:${
            document.location.port
          }${"/src/fireboyandwatergirllighttemple/index.html"}`
        );
        break;
      case "fire boy and water girl 2":
        window.location.assign(
          `${document.location.protocol}//${document.location.hostname}:${
            document.location.port
          }${"/src/fireboyandwatergirllighttemple/index.html"}`
        );
        break;
      case "fire boy and water girl and the light temple":
        window.location.assign(
          `${document.location.protocol}//${document.location.hostname}:${
            document.location.port
          }${"/src/fireboyandwatergirllighttemple/index.html"}`
        );
        break;
      case "mini putt":
        window.location.assign(
          `${document.location.protocol}//${document.location.hostname}:${
            document.location.port
          }${"/src/miniputt/index.html"}`
        );
        break;
      case "mini golf":
        window.location.assign(
          `${document.location.protocol}//${document.location.hostname}:${
            document.location.port
          }${"/src/miniputt/index.html"}`
        );
        break;
      case "papa's freezeria":
        window.location.assign(
          `${document.location.protocol}//${document.location.hostname}:${
            document.location.port
          }${"/src/papasfreezieria/index.html"}`
        );
        break;
      case "papas freezeria":
        window.location.assign(
          `${document.location.protocol}//${document.location.hostname}:${
            document.location.port
          }${"/src/papasfreezieria/index.html"}`
        );
        break;
      case "the impossible quiz":
        window.location.assign(
          `${document.location.protocol}//${document.location.hostname}:${
            document.location.port
          }${"/src/impossiblequiz/index.html"}`
        );
        break;
      case "papa's pizzeria":
        window.location.assign(
          `${document.location.protocol}//${document.location.hostname}:${
            document.location.port
          }${"/src/papaspizzeria/index.html"}`
        );
        break;
      case "angry gran 2":
        window.location.assign(
          `${document.location.protocol}//${document.location.hostname}:${
            document.location.port
          }${"/src/angrygran2/index.html"}`
        );
        break;
      case "papas pizzeria":
        window.location.assign(
          `${document.location.protocol}//${document.location.hostname}:${
            document.location.port
          }${"/src/papaspizzeria/index.html"}`
        );
        break;
      case "minecraft":
        window.location.assign(
          `${document.location.protocol}//${document.location.hostname}:${
            document.location.port
          }${"/src/minecraft/index.html"}`
        );
        break;
      case "moto x3m":
        window.location.assign(
          `${document.location.protocol}//${document.location.hostname}:${
            document.location.port
          }${"/src/moto/x3m/index.html"}`
        );
        break;
      case "mr mine":
        window.location.assign(
          `${document.location.protocol}//${document.location.hostname}:${
            document.location.port
          }${"/src/mrmine/index.html"}`
        );
        break;
      case "slope":
        window.location.assign(
          `${document.location.protocol}//${document.location.hostname}:${
            document.location.port
          }${"/src/slope/index.html"}`
        );
        break;
      case "slope 3":
        window.location.assign(
          `${document.location.protocol}//${document.location.hostname}:${
            document.location.port
          }${"/src/slope3/index.html"}`
        );
        break;
      case "run 3":
        window.location.assign(
          `${document.location.protocol}//${document.location.hostname}:${
            document.location.port
          }${"/src/run3/index.html"}`
        );
        break;
      case "opposite day":
        window.location.assign(
          `${document.location.protocol}//${document.location.hostname}:${
            document.location.port
          }${"/src/oppositeday/index.html"}`
        );
        break;
      case "2048":
        window.location.assign(
          `${document.location.protocol}//${document.location.hostname}:${
            document.location.port
          }${"/src/2048/index.html"}`
        );
        break;
      case "cookie clicker":
        window.location.assign(
          `${document.location.protocol}//${document.location.hostname}:${
            document.location.port
          }${"/src/cookieclicker/index.html"}`
        );
        break;
      case "tiny fishing":
        window.location.assign(
          `${document.location.protocol}//${document.location.hostname}:${
            document.location.port
          }${"/src/tinyFishing/index.html"}`
        );
        break;
      case "hexanaut.io":
        window.location.assign(
          `${document.location.protocol}//${document.location.hostname}:${
            document.location.port
          }${"/src/hexanautIO/index.html"}`
        );
        break;
      case "a small world cup":
        window.location.assign(
          `${document.location.protocol}//${document.location.hostname}:${
            document.location.port
          }${"/src/asmallworldcup/index.html"}`
        );
        break;
      case "asmallworldcup":
        window.location.assign(
          `${document.location.protocol}//${document.location.hostname}:${
            document.location.port
          }${"/src/asmallworldcup/index.html"}`
        );
        break;
      case "bitlife":
        window.location.assign(
          `${document.location.protocol}//${document.location.hostname}:${
            document.location.port
          }${"/src/bitlife/index.html"}`
        );
        break;
      case "bitlife simulator":
        window.location.assign(
          `${document.location.protocol}//${document.location.hostname}:${
            document.location.port
          }${"/src/bitlife/index.html"}`
        );
        break;
      case "subway surfers":
        window.location.assign(
          `${document.location.protocol}//${document.location.hostname}:${
            document.location.port
          }${"/src/subwaysurfers/index.html"}`
        );
        break;
      default:
        const prev = document.getElementsByClassName("content")[0].innerHTML;
        document.getElementsByClassName("content")[0].innerHTML = "";
        document.getElementsByClassName(
          "content"
        )[0].innerHTML = `<h1 style="color:white;display:block;">no results</h1><div class="content">${prev}<div>`;
        break;
    }
  }
}
