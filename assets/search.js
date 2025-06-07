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
