export default class UserInfo {
  constructor({ nameSelector, infoSelector }) {
    this._userNameElement = document.querySelector(nameSelector);
    this._userInfoElement = document.querySelector(infoSelector);
  }

  getUserInfo() {
    const userInfo = {
      userName: this._userNameElement.textContent,
      userInfo: this._userInfoElement.textContent
    };
    return userInfo;
  }

  setUserInfo(name, info) {
    this._userNameElement.textContent = name;
    this._userInfoElement.textContent = info;
  }
}
