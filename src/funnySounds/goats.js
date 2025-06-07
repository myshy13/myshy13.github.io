var images = ["../goat1.webp", "../goat2.webp", "../goat3.webp", "../goat4.webp",];

document.getElementById("goat").addEventListener("click", (e) => {
  var audio = new Audio("../goat.mp3");
  audio.play();
  effect();
});

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function effect() {
  const fartEffect = document.createElement("img");
  fartEffect.className = "effect";
  fartEffect.src = images[Math.floor(Math.random() * images.length)];

  fartEffect.style.left = getRandomInt(0, window.innerWidth - 50) + 25 + "px";
  fartEffect.style.top = getRandomInt(0, window.innerHeight - 50) + 25 + "px";

  document.body.appendChild(fartEffect);
  setTimeout(() => {
    fartEffect.remove();
  }, 500);
}