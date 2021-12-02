import Chat from './chat';
import Server from './server';

console.log('app started');

const ws = new WebSocket('ws://localhost:3333/ws');
const server = new Server();
const conteiner = new Chat(server, ws);

conteiner.events();
