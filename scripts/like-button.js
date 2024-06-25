const likeButtons = document.querySelectorAll(".photo-grid__like");
const likeSrc = "assets/like.svg";
const likedSrc = "assets/liked.svg";

likeButtons.forEach((likeButton) => {
  likeButton.addEventListener("click", (event) => {
    if (event.target.src.includes(likeSrc)) {
      event.target.src = likedSrc;
    } else {
      event.target.src = likeSrc;
    }
  });
});
