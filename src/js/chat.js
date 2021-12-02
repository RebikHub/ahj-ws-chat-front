export default class Chat {
  constructor(server, ws) {
    this.server = server;
    this.ws = ws;
    this.container = document.querySelector('#container');
    this.nickname = document.querySelector('.nickname');
    this.chat = document.querySelector('.chat');
    this.inputNickname = document.querySelector('.input-nickname');
    this.btnNickname = document.querySelector('.btn-nickname');
    this.nicknamesInChat = document.querySelector('.nicknames-in-chat');
    this.inputMessage = document.querySelector('.input-chat-message');
    this.chatMessage = document.querySelector('.chat-message');
    this.usedNickname = document.querySelector('.used-nickname');
    this.btnUsedNickname = document.querySelector('.btn-used-nickname');
    this.users = null;
    this.inputNameText = null;
    this.inputTextMessage = null;
    this.messageTime = null;
  }

  events() {
    this.inputName();
    this.btnNameClick();
    this.inputText();
    this.btnUsedNameCloseClick();
    this.inputMessageToChat();
    this.webSocket();
  }

  webSocket() {
    this.ws.addEventListener('open', () => {
      console.log('connected');
      const data = JSON.stringify('hello');
      this.ws.send(data);
    });

    this.ws.addEventListener('message', (evt) => {
      console.log(evt.data);
    });

    this.ws.addEventListener('close', (evt) => {
      console.log('connection closed', evt);
    });

    this.ws.addEventListener('error', () => {
      console.log('error');
    });
  }

  inputName() {
    this.inputNickname.addEventListener('input', (ev) => {
      this.inputNameText = ev.target.value;
    });
  }

  inputText() {
    this.inputMessage.addEventListener('input', (ev) => {
      this.inputTextMessage = ev.target.value;
    });
  }

  inputMessageToChat() {
    this.inputMessage.addEventListener('keyup', (ev) => {
      if (ev.key === 'Enter') {
        this.addMessages(this.inputTextMessage);
        this.inputTextMessage = null;
        this.inputMessage.value = null;
        this.inputMessage.blur();
      }
    });
  }

  addMessages(message, nick = 'You') {
    const span = document.createElement('span');
    const titleDate = document.createElement('h6');
    const text = document.createElement('p');
    titleDate.textContent = `${nick}, ${Chat.messageDate()}`;
    text.textContent = message;
    span.appendChild(titleDate);
    span.appendChild(text);
    if (nick === 'You') {
      titleDate.style.color = 'red';
      span.classList.add('message');
    }
    this.chatMessage.appendChild(span);
  }

  static messageDate() {
    const year = new Date().getFullYear();
    let month = new Date().getMonth() + 1;
    let day = new Date().getDate();
    let hours = new Date().getHours();
    let minute = new Date().getMinutes();

    if (String(month).length === 1) {
      month = `0${month}`;
    }
    if (String(day).length === 1) {
      day = `0${day}`;
    }
    if (String(minute).length === 1) {
      minute = `0${minute}`;
    }
    if (String(hours).length === 1) {
      hours = `0${hours}`;
    }
    return `${hours}:${minute} ${day}.${month}.${String(year).slice(2)}`;
  }

  async connectToChat(nickname) {
    if (nickname !== null) {
      const user = await this.server.add(nickname);
      if (user !== 'ошибка') {
        this.users = await this.server.load();
        this.renderChat(this.users);
      } else {
        this.nickname.classList.add('none');
        this.usedNickname.classList.remove('none');
        this.inputNameText = null;
        this.inputNickname.value = null;
      }
    }
  }

  renderChat(users) {
    this.nickname.classList.add('none');
    this.chat.classList.remove('none');
    users.forEach((elem) => {
      const span = document.createElement('span');
      const img = document.createElement('img');
      const p = document.createElement('p');
      if (elem.nickname === this.inputNameText) {
        p.textContent = 'You';
        p.style.color = 'red';
        this.inputNameText = null;
      } else {
        p.textContent = elem.nickname;
      }
      span.appendChild(img);
      span.appendChild(p);
      this.nicknamesInChat.appendChild(span);
    });
  }

  btnNameClick() {
    this.btnNickname.addEventListener('click', () => {
      this.connectToChat(this.inputNameText);
    });
  }

  btnUsedNameCloseClick() {
    this.btnUsedNickname.addEventListener('click', () => {
      this.nickname.classList.remove('none');
      this.usedNickname.classList.add('none');
    });
  }
}
