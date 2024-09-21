import { api } from "./Api";

class UserInfo {
  constructor({ nameSelector, subtitleSelector, avatarSelector }) {
    this.profileName = document.querySelector(nameSelector);
    this.profileSubtitle = document.querySelector(subtitleSelector);
    this.profileAvatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this.profileName.textContent,
      subtitle: this.profileSubtitle.textContent,
    };
  }

  setUserInfo({ name, subtitle, avatar }) {
    if (name) {
      this.profileName.textContent = name;
      this.profileAvatar.alt = `Foto de perfil de ${name}`;
    }

    if (subtitle) {
      this.profileSubtitle.textContent = subtitle;
    }

    if (avatar) {
      this.profileAvatar.src = avatar;
    }
  }
}

export const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  subtitleSelector: ".profile__subtitle",
  avatarSelector: ".profile__photo",
});

api
  .getUserInfo()
  .then(({ name, about, avatar }) =>
    userInfo.setUserInfo({
      name,
      avatar,
      subtitle: about,
    })
  )
  .catch((err) => {
    console.error(err);
    alert(err);
  });
