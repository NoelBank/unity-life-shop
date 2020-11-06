const selectedItems = [];
let boxHeadline = "";
let cartValue = 0;
let selectedCategory = "";

function updateCart(items) {
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
    // cartItemRemove.setAttribute("id", `cart-remove-${selectedItemData.id}`);
    cartItemName.innerHTML = selectedItemData.name;
    cartItemPrice.innerHTML =
      selectedItemData.price === 0
        ? "Kostenlos"
        : `${selectedItemData.price} $`;

    // cartItemRemove.onclick = function (event) {
    //   const indexOfSelectedItem = selectedItems.indexOf(event.target.id);
    //   const selectedItem = event.target.id.replace(/cart-remove-/g, "");

    //   selectedItems.splice(indexOfSelectedItem, 1);

    //   document.getElementById(selectedItem).classList.remove("item-selected");

    //   document
    //     .querySelector(".carts")
    //     .removeChild(document.getElementById(`cart-${selectedItem}`));
    // };

    if (!document.getElementById(`cart-${selectedItemData.id}`)) {
      document.querySelector(".carts").appendChild(cartItemClone);
    }
  });
}

function updateCartValue() {
  console.log("test", cartValue);
  document.querySelector(".price").innerHTML = `${cartValue} $`;
}

function setupShop() {
  const headline = document.querySelector(".box-headline");

  // get store name from server
  headline.innerHTML = "Joe's Clothings";

  // get data from server
  const items = data.items;
  const categorys = data.categorys;
  const category = document.querySelector(".temp__category");
  const categoryItems = document.querySelector(".temp__items-category");
  const tempItem = document.querySelector(".temp__item");

  const cartIcon = document.querySelector(".icon");

  cartIcon.onclick = function () {
    resetView(categorys);
    return false;
  };

  const back = document.querySelector(".back");

  back.onclick = function () {
    resetView(categorys);
    selectedCategory = "";

    return false;
  };

  // cart oben logic
  const cartButton = document.querySelector(".cart-button");

  cartButton.onclick = function () {
    //slide left
    document
      .querySelector(".categorys")
      .setAttribute(
        "style",
        "transform: translate3d(-600px, 0px, 0px); opacity: 0;"
      );

    categorys.forEach(function (category) {
      document
        .getElementById(`items-${category.id}`)
        .setAttribute(
          "style",
          "transform: translate3d(600px, 0px, 0px); opacity: 0;"
        );
    });

    openCart(selectedItems);
    return false;
  };
  const cartBar = document.querySelector(`.cart-bar`);
  const cartCard = document.querySelector(`.cart-card`);

  cartBar.onclick = function () {
    console.log("BAR");
  };

  cartCard.onclick = function () {
    console.log("Karte");
  };

  // generate stuff
  categorys.forEach(function (category) {
    const categoryItemsNode = categoryItems.content.cloneNode(true);
    const categoryItemName = categoryItemsNode.querySelector(".items-category");

    categoryItemName.setAttribute("id", `items-${category.id}`);

    document.querySelector(".items").appendChild(categoryItemsNode);
  });

  items.forEach(function (item) {
    if (categorys.some((category) => category.id === item.category)) {
      // get nice data from category
      const categoryData = categorys.filter(
        (category) => category.id === item.category
      )[0];
      const categoryItemClone = category.content.cloneNode(true);
      const itemItemClone = tempItem.content.cloneNode(true);
      const categoryItemName = categoryItemClone.querySelector(
        ".category-item-name"
      );

      const categoryItem = categoryItemClone.querySelector(".category");
      const itemElement = itemItemClone.querySelector(".item");
      const itemName = itemItemClone.querySelector(".item-name");
      const itemPrice = itemItemClone.querySelector(".item-price");
      itemElement.setAttribute("id", item.id);

      itemName.textContent = item.name;
      itemPrice.textContent =
        item.price === 0 ? "Kostenlos" : `${item.price} $`;

      categoryItemName.innerHTML = categoryData.name;
      categoryItem.setAttribute("id", categoryData.id);
      categoryItemName.setAttribute("id", categoryData.id);

      // open item
      categoryItem.onclick = function (event) {
        boxHeadline = categoryData.name;
        document
          .querySelector(".categorys")
          .setAttribute(
            "style",
            "transform: translate3d(-600px, 0px, 0px); opacity: 0;"
          );
        selectedCategory = event.target.id;
        // headline.innerHTML = ;

        openItemsView(event.target.id, boxHeadline);
        return false;
      };

      // add to cart logic
      itemElement.onclick = function () {
        const { id, price } = item;
        console.log(item);
        if (selectedItems.includes(id)) {
          // remove
          event.target.classList.remove("item-selected");
          const indexOfSelectedItem = selectedItems.indexOf(id);

          selectedItems.splice(indexOfSelectedItem, 1);
          console.log(cartValue);

          cartValue = cartValue - price;

          const cartElement = document.getElementById(`cart-${id}`);

          cartElement.parentElement.removeChild(cartElement);
        } else {
          // add
          selectedItems.push(id);
          cartValue = cartValue + price;

          event.target.classList.add("item-selected");
        }

        updateCart(items);
        updateCartValue();
      };

      document
        .getElementById(`items-${item.category}`)
        .appendChild(itemItemClone);

      // create categorys by all items
      if (!document.getElementById(categoryItem.id)) {
        document.querySelector(".categorys").appendChild(categoryItemClone);
      }
    }
  });
}

const data = {
  items: [
    {
      id: "2ff8e194-4d8a-4a39-9dba-878b4926397d",
      name: "Gangpulli",
      category: "sweater",
      price: 120,
    },
    {
      id: "0c250443-ba7e-4336-8d46-b0f6cfdb209f",
      name: "Cop Pulli",
      category: "sweater",
      price: 10,
    },
    {
      id: "0c250443-ba7e-4336-8d46-b0f6cfdb209a",
      name: "Noel Pullover 187 Gang",
      category: "sweater",
      price: 0,
    },
    {
      id: "e51202a3-a040-4070-9528-19509469f61a",
      name: "Medic Shirt",
      category: "shirts",
      price: 100,
    },
  ],
  categorys: [
    { id: "sweater", name: "Hoddies" },
    { id: "shirts", name: "T-Shirts" },
  ],
};

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

function openItemsView(id, boxHeadline) {
  const headline = document.querySelector(".box-headline");

  const categoryItems = document.getElementById(`items-${id}`);

  const icon = document.querySelector(".icon");
  const back = document.querySelector(".back");

  icon.setAttribute("style", "opacity: 0; pointer-events: none;");
  back.setAttribute("style", "opacity: 1");

  headline.innerHTML = boxHeadline;
  categoryItems.setAttribute(
    "style",
    "transform: translate3d(0, 0px, 0px); opacity: 1;"
  );
}

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

function closeShop() {
  document.querySelector(".shop-box").setAttribute("style", "");

  return true;
}

function openShop() {
  document.querySelector(".shop-box").setAttribute("style", "opacity: 1;");

  return true;
}

setupShop();
