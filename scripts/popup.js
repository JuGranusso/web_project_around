const popupElement = document.querySelector(".popup");
const popupExit = document.querySelector(".popup__exit");

function openPopup(name, link) {
  const popupPhoto = document.querySelector(".popup__photo");
  popupPhoto.src = link;
  popupPhoto.alt = name;

  document.querySelector(".popup__caption").textContent = name;

  popupElement.classList.add("popup_visible");
}

popupElement.addEventListener("click", (event) => {
  if (event.target === popupElement) {
    popupElement.classList.remove("popup_visible");
  }
});

popupExit.addEventListener("click", () => {
  popupElement.classList.remove("popup_visible");
});
