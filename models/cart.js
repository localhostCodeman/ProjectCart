const path = require("path");
const fs = require("fs");
const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "cart.json"
);
class Cart {
  static newProduct(prodId, prodPrice) {
    this.productId = prodId;
    this.productPrice = prodPrice;
    fs.readFile(p, (err, fileContent) => {
      let cart = [];
      let totalPrice = 0;
      if (!err) {
        cart = JSON.parse(fileContent);
        totalPrice = cart[0].totalPrice;
        let found = false;
        for (let i = 0; i < cart.length; i++) {
          if (cart[i].id === prodId) {
            cart[i].qty = Number(cart[i].qty) + 1;
            cart[0].totalPrice = Number(totalPrice) + Number(prodPrice);
            found = true;
          }
        }
        if (!found) {
          cart[0].totalPrice = Number(cart[0].totalPrice) + Number(prodPrice);
          cart.push({ id: prodId, qty: 1 });
        }
      } else {
        cart[0].totalPrice = Number(cart[0].totalPrice) + Number(prodPrice);
        cart.push({ noid: prodId, qty: 1 });
      }

      console.log("Value of Cart is", cart);
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }
}
module.exports = Cart;
