export default class Chat {
  constructor(server) {
    this.server = server;
    this.container = document.querySelector('#container');
    this.nickname = document.querySelector('.nickname');
    this.chat = document.querySelector('.chat');
    this.inputNickname = document.querySelector('.input-nickname');
    this.btnNickname = document.querySelector('.btn-nickname');
    this.nicknamesInChat = document.querySelector('.nicknames-in-chat');
    this.inputMessage = document.querySelector('.input-chat-message');
    this.chatMessage = document.querySelector('.chat-message');
    this.inputNameText = null;
  }

  events() {
    this.inputName();
    this.btnNameClick();
    this.inputTextMessage();
  }

  inputName() {
    this.inputNickname.addEventListener('input', (ev) => {
      this.inputNameText = ev.target.value;
    });
  }

  inputTextMessage() {
    this.inputMessage.addEventListener('input', (ev) => {
      const span = document.createElement('span');
      span.textContent = ev.target.value;
      this.chatMessage.appendChild(span);
    });
  }

  async loadUsers(nickname) {
    if (nickname !== null) {
      const users = await this.server.load();
      if (!users.includes(nickname)) {
        this.server.add(nickname);
        users.push(nickname);
      }
      this.renderChat(users);
    }
  }

  renderChat(users) {
    this.nickname.classList.add('none');
    this.chat.classList.remove('none');
    users.forEach((elem) => {
      const span = document.createElement('span');
      const img = document.createElement('img');
      const p = document.createElement('p');
      p.textContent = elem;
      span.appendChild(img);
      span.appendChild(p);
      this.nicknamesInChat.appendChild(span);
    });
  }

  btnNameClick() {
    this.btnNickname.addEventListener('click', () => {
      this.loadUsers(this.inputNameText);
    });
  }
}
