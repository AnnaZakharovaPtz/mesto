export default class UserInfo {
  constructor({ nameSelector, infoSelector, imageSelector }) {
    this._userNameElement = document.querySelector(nameSelector);
    this._userInfoElement = document.querySelector(infoSelector);
    this._userImageElement = document.querySelector(imageSelector);
  }

  getUserInfo() {
    const userInfo = {
      name: this._userNameElement.textContent,
      job: this._userInfoElement.textContent,
      image: this._userImageElement.src
    };
    return userInfo;
  }

  setUserInfo(name, info, image) {
    this._userNameElement.textContent = name;
    this._userInfoElement.textContent = info;
    this._userImageElement.src = image;
  }
}
