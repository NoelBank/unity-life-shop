function openCart(selectedItems) {
  const cartButton = document.querySelector(`.cart-button`);
  const cartPay = document.querySelector(`.cart-pay`);

  if (cartButton.innerHTML === "Jetzt Kaufen") {
    //process buy
    if (selectedItems.length !== 0) {
      cartButton.setAttribute("style", "opacity: 0; display: none;");
      setTimeout(function () {
        cartPay.setAttribute("style", "opacity: 1; display: block;");
      }, 250);
    }
  } else {
    const headline = document.querySelector(".box-headline");

    const cartWithItems = document.querySelector(`.carts`);

    const back = document.querySelector(".back");

    back.setAttribute("style", "opacity: 1");

    headline.innerHTML = "Warenkorb";
    cartWithItems.setAttribute(
      "style",
      "transform: translate3d(0, 0px, 0px); opacity: 1;"
    );
    cartButton.setAttribute("style", "background-color: green; color: white;");
    cartButton.innerHTML = "Jetzt Kaufen";
  }
}

export default openCart;
