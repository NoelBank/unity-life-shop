import data from "../data/data.js";
import resetView from "./helpers/resetView.js";
import updateCart from "./helpers/updateCart.js";
import openItemsView from "./helpers/openItemsView.js";

let slectedItems = [];
let boxHeadline = "";
let cartValue = 0;
let selectedCategory = "";

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
            "transform: translate3d(-500px, 0px, 0px); opacity: 0;"
          );
        selectedCategory = event.target.id;
        // headline.innerHTML = ;

        openItemsView(event.target.id, boxHeadline);
        return false;
      };

      // add to cart logic
      itemElement.onclick = function () {
        const { id, price } = item;
        if (slectedItems.includes(id)) {
          // remove
          event.target.classList.remove("item-selected");
          const indexOfSelectedItem = slectedItems.indexOf(id);

          indexOfSelectedItem > -1
            ? slectedItems.splice(indexOfSelectedItem, 1)
            : false;
          cartValue = cartValue - price;

          const cartElement = document.getElementById(`cart-${id}`);

          cartElement.parentElement.removeChild(cartElement);
        } else {
          // add
          slectedItems.push(id);
          cartValue = cartValue + price;

          event.target.classList.add("item-selected");
        }

        slectedItems = updateCart(cartValue, slectedItems, items);
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

setupShop();
