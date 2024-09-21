class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  _getUrl(endpoint) {
    return `${this.baseUrl}/${endpoint}`;
  }

  _fetch(endpoint, method = "GET", body) {
    return fetch(this._getUrl(endpoint), {
      headers: this.headers,
      method,
      body,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Error: ${res.status}`);
    });
  }

  getInitialCards() {
    return this._fetch("cards");
  }

  getUserInfo() {
    return this._fetch("users/me");
  }

  editUserInfo({ name, about }) {
    const body = JSON.stringify({ name, about });
    return this._fetch("users/me", "PATCH", body);
  }

  createNewCard({ name, link }) {
    const body = JSON.stringify({ name, link });
    return this._fetch("cards", "POST", body);
  }
}

export const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/web-ptbr-cohort-12",
  headers: {
    authorization: "aa992fe4-15de-4409-8cc8-a42b7316beae",
    "Content-Type": "application/json",
  },
});
