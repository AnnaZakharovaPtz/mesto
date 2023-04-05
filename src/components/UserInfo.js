export default class UserInfo {
  constructor({ nameSelector, infoSelector }) {
    this._userNameElement = document.querySelector(nameSelector);
    this._userInfoElement = document.querySelector(infoSelector);
  }

  getUserInfo() {
    const userInfo = {
      name: this._userNameElement.textContent,
      job: this._userInfoElement.textContent
    };
    return userInfo;
  }

  setUserInfo(name, info) {
    this._userNameElement.textContent = name;
    this._userInfoElement.textContent = info;
  }
}
