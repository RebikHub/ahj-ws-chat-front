import Chat from './chat';
import Server from './server';

console.log('app started');

const server = new Server();
const conteiner = new Chat(server);

conteiner.events();
