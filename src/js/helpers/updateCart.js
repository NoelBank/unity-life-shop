function updateCart(cartValue, selectedItems, items) {
  document.querySelector(".price").innerHTML = `${cartValue} $`;

  selectedItems.forEach((selectedItemId) => {
    const selectedItemData = items.find(function (item) {
      return item.id === selectedItemId;
    });
    const cart = document.querySelector(".temp__cart");

    const cartItemClone = cart.content.cloneNode(true);
    const cartItem = cartItemClone.querySelector(".cart");
    const cartItemName = cartItem.querySelector(".cart-item-name");
    const cartItemPrice = cartItem.querySelector(".cart-item-price");
    const cartItemRemove = cartItem.querySelector(".cart-item-remove");

    cartItem.setAttribute("id", `cart-${selectedItemData.id}`);
    cartItemName.innerHTML = selectedItemData.name;
    cartItemPrice.innerHTML = selectedItemData.price;

    cartItemRemove.onclick = function () {
      const indexOfSelectedItem = slectedItems.indexOf(id);

      indexOfSelectedItem > -1
        ? slectedItems.splice(indexOfSelectedItem, 1)
        : false;
    };
    console.log(document.getElementById(`cart-${selectedItemData.id}`));

    if (!document.getElementById(`cart-${selectedItemData.id}`)) {
      document.querySelector(".carts").appendChild(cartItemClone);
    }
  });

  return selectedItems;
}

export default updateCart;
