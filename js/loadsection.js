// loadsections.js

document.addEventListener("DOMContentLoaded", () => {
  const sections = ["home", "about", "products", "offers", "delivery", "contact"];

  sections.forEach(section => {
    fetch(`${section}.html`)
      .then(res => res.text())
      .then(data => {
        document.getElementById(section).innerHTML = data;
      })
      .catch(err => {
        console.error(`❌ Failed to load ${section}.html`, err);
      });
  });
});
