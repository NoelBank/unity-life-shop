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

export default openItemsView;
