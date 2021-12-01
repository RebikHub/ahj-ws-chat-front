export default class Server {
  constructor() {
    this.url = 'http://localhost:3333/users';
    this.contentTypeHeader = { 'Content-Type': 'application/json' };
  }

  async add(nickname) {
    const response = await fetch(this.url, {
      body: JSON.stringify(nickname),
      method: 'POST',
      headers: this.contentTypeHeader,
    });
    const result = await response.json();
    return console.log(`Response server: ${result}`);
  }

  async load() {
    const response = await fetch(this.url);
    const result = await response.json();
    console.log(`Response server: ${result}`);
    return result;
  }

  remove(id) {
    return fetch(`${this.url}/${id}`, { method: 'DELETE' });
  }
}
