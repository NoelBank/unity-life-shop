function resetView(categorys) {
  const headline = document.querySelector(".box-headline");
  headline.innerHTML = "Joe's Clothings";
  //restet warenkorb button
  const cartButton = document.querySelector(`.cart-button`);
  const cartPay = document.querySelector(`.cart-pay`);
  cartButton.setAttribute("style", "");
  cartButton.innerHTML = "Warenkorb";

  cartPay.setAttribute("style", "");

  document
    .querySelector(".categorys")
    .setAttribute("style", "transform: translate3d(0, 0px, 0px); opacity: 1;");

  // reset all category views

  categorys.forEach(function (category) {
    document
      .getElementById(`items-${category.id}`)
      .setAttribute(
        "style",
        "transform: translate3d(600px, 0px, 0px); opacity: 0;"
      );
  });

  document
    .querySelector(".carts")
    .setAttribute(
      "style",
      "transform: translate3d(600px, 0px, 0px); opacity: 0;"
    );

  const icon = document.querySelector(".icon");
  const back = document.querySelector(".back");

  icon.setAttribute("style", "opacity: 0");
  back.setAttribute("style", "opacity: 0; pointer-events: none;");
}

export default resetView;
