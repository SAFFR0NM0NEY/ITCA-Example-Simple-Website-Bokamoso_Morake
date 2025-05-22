fetch("data/products.json")
   .then(response => response.text())
   .then(data => {
      const parser = new DOMParser();
      const json = parser.parseFromString(data, "application/json");
      const products = json.getElementsByTagName("product");
      let output = "";
      for (let product of products) {
        const name = product.getElementsByTagName("name")[0].textContent;
        const price = product.getElementsByTagName("price")[0].textContent;
        const image = product.getElementsByTagName("image")[0].textContent;
        output += `
             <div>
                <img src="${image}" alt="${name}" width="150">
                <h3>${name}</h3>
                <p>Price: R${price}</p>
                <button onclick="addToCart('${name}', ${price})">Add to Cart</button>
             </div>`;
      }
      document.getElementById("product-list").innerHTML = output;
   });

   function addToCart (name, price) {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.push({ name, price });
      localStorage.setItem("cart", JSON.stringify(cart));
      alert(`${name} added to cart`);
   }
      