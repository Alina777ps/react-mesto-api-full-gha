class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  _handleResponse(res) {
    if (res.ok) {
      return Promise.resolve(res.json());
    }
    return Promise.reject(`Произошла шибка: ${res.status}`);
  }

  //получение карточек с сервера
  async getInitialCards() {
    const res = await fetch(`${this._url}/cards`, {
      headers: this._headers,
    });
    return this._handleResponse(res);
  }

  //создание новой карточки
  async addNewCard(data) {
    const res = await fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    });
    return this._handleResponse(res);
  }

  //удаление карточки
  async deleteCard(cardId) {
    const res = await fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    });
    return this._handleResponse(res);
  }

  //загрузкa информации о пользователе с сервера
  async getUserInfo() {
    const res = await fetch(`${this._url}/users/me`, {
      headers: this._headers,
    });
    return this._handleResponse(res);
  }

  //редактирование профиля
  async setUserInfo(data) {
    const res = await fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    });
    return this._handleResponse(res);
  }

  // обновления аватара
  async setUserAvatar(data) {
    const res = await fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    });
    return this._handleResponse(res);
  }

  //добавление лайка
  async addLike(cardId) {
    const res = await fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    });
    return this._handleResponse(res);
  }

  // постановка и снятие лайка
  async removeLike(cardId) {
    const res = await fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    });
    return this._handleResponse(res);
  }
}

const config = {
  url: "https://mesto.nomoreparties.co/v1/cohort-60",
  headers: {
    authorization: "e0bed1d8-4343-452c-a8c4-4d68365fbfac",
    "Content-Type": "application/json",
  },
};

const api = new Api(config);

export default api;
