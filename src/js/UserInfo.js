export class UserInfo {
  constructor({ nameSelector, subtitleSelector }) {
    this.profileName = document.querySelector(nameSelector);
    this.profileSubtitle = document.querySelector(subtitleSelector);
  }

  getUserInfo() {
    return {
      name: this.profileName.textContent,
      subtitle: this.profileSubtitle.textContent,
    };
  }

  setUserInfo({ name, subtitle }) {
    if (name) {
      this.profileName.textContent = name;
    }

    if (subtitle) {
      this.profileSubtitle.textContent = subtitle;
    }
  }
}
