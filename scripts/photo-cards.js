const likeSrc = "assets/like.svg";
const likedSrc = "assets/liked.svg";
const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional da Vanoise ",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

const cardTemplate = document.querySelector("#grid-card_template").content;
const photoGrid = document.querySelector(".photo-grid");

function createNewCard(name, link) {
  const newCard = cardTemplate.cloneNode(true);
  const img = newCard.querySelector(".photo-grid__photo");
  img.src = link;
  img.alt = name;

  newCard.querySelector(".photo-grid__name").textContent = name;

  newCard
    .querySelector(".photo-grid__like")
    .addEventListener("click", (event) => {
      if (event.target.src.includes(likeSrc)) {
        event.target.src = likedSrc;
      } else {
        event.target.src = likeSrc;
      }
    });

  newCard
    .querySelector(".photo-grid__delete")
    .addEventListener("click", (event) => {
      event.target.parentElement.remove();
    });

  photoGrid.append(newCard);
}

initialCards.forEach((initialCard) =>
  createNewCard(initialCard.name, initialCard.link)
);
