export default class Server {
  constructor() {
    this.url = 'http://10.4.4.10:3333/users';
  }

  async add(nickname) {
    const response = await fetch(this.url, {
      body: nickname,
      method: 'POST',
    });
    const result = await response.text();
    return result;
  }

  async load() {
    const response = await fetch(this.url);
    const result = await response.json();
    return result;
  }

  async remove(id) {
    const response = await fetch(`${this.url}/${id}`, {
      method: 'DELETE',
    });
    const result = await response.text();
    return result;
  }
}
