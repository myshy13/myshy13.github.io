var farts = ["../fart1.wav", "../fart2.wav", "../fart3.wav", "../fart4.wav"];
var images = ["../fart.webp", "../fart1.webp", "../fart2.webp", "../fart3.png", "../fart4.png"];

document.getElementById("fart").addEventListener("click", (e) => {
  var audio = new Audio(farts[Math.floor(Math.random() * farts.length)]);
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