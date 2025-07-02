const bgImages = [
  "images/godown1.png",
  "images/vegstack7.png",
  "images/farm5.png",
  "images/vegstack3.png"
];

let currentImage = 0;
const bgOverlay = document.querySelector('.services-bg-overlay');

function rotateBackground() {
  if (!bgOverlay) return;
  bgOverlay.style.backgroundImage = `linear-gradient(to right, rgba(0, 100, 0, 0.15), rgba(255,255,255,0.9)), url('${bgImages[currentImage]}')`;
  bgOverlay.style.transition = 'background-image 1s ease-in-out';
  currentImage = (currentImage + 1) % bgImages.length;
}

rotateBackground();
setInterval(rotateBackground, 5000);
