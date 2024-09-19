class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  _getUrl(endpoint) {
    return `${this.baseUrl}/${endpoint}`;
  }

  getInitialCards() {
    return fetch(this._getUrl("cards"), {
      headers: this.headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Error: ${res.status}`);
    });
  }

  // outros métodos para trabalhar com a API
}

export const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/web-ptbr-cohort-12",
  headers: {
    authorization: "aa992fe4-15de-4409-8cc8-a42b7316beae",
    "Content-Type": "application/json",
  },
});
