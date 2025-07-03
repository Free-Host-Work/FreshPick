document.addEventListener("DOMContentLoaded", () => {
  const productList = document.getElementById("product-list");
  const cartItemsContainer = document.getElementById("cart-items");
  const orderBtn = document.getElementById("orderBtn");
  const locationMethod = document.getElementById("location-method");
  const locationInput = document.getElementById("location");
  let cart = [];
  let products = [];

  // Fetch products from JSON
  fetch("data/products.json")
    .then((response) => response.json())
    .then((data) => {
      products = data;
      renderProducts(products);
    })
    .catch((err) => console.error("Error loading products:", err));

  function renderProducts(products) {
    productList.innerHTML = "";
    products.forEach((product) => {
      const productEl = document.createElement("div");
      productEl.classList.add("product-card");
      productEl.setAttribute("data-aos", "fade-up");

      productEl.innerHTML = `
        <img src="${product.image}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <input type="number" id="qty-${product.id}" min="1" value="1" />
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      `;
      productList.appendChild(productEl);
    });
    AOS.refresh();
  }

  window.addToCart = function (productId) {
    const quantity = parseInt(
      document.getElementById(`qty-${productId}`).value
    );
    const product = products.find((p) => p.id === productId);

    if (!product || quantity < 1) return;

    const existing = cart.find((item) => item.id === productId);
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }

    updateCartUI();
  };

  function updateCartUI() {
    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
      return;
    }

    cart.forEach((item) => {
      const cartItem = document.createElement("li");
      cartItem.innerHTML = `${item.name} - ${item.quantity}`;
      cartItemsContainer.appendChild(cartItem);
    });
  }

  orderBtn.addEventListener("click", () => {
    let location = "";
    if (locationMethod.value === "current") {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            location = `Lat: ${pos.coords.latitude}, Lng: ${pos.coords.longitude}`;
            sendOrder(location);
          },
          () => {
            alert("Unable to get location. Please enter it manually.");
          }
        );
      }
    } else {
      location = locationInput.value.trim();
      if (!location) {
        alert("Please enter your delivery location.");
        return;
      }
      sendOrder(location);
    }
  });

  function sendOrder(locationText) {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    let message = `Hi FreshPick, I want to order:\n\n`;
    cart.forEach((item) => {
      message += `- ${item.name}: ${item.quantity}\n`;
    });
    message += `\nDelivery Location: ${locationText}`;

    const url = `https://wa.me/919747046481?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  }
});
