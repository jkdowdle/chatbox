import io from 'socket.io-client';

import { Ui } from './ui/ui';

const server = io.connect('http://localhost:8080/');

server.on('message', (response) => Ui.renderMessage(response) );

server.on('connect', () => {
  server.emit('join');
});

class Client {
  constructor() {
    let chatform = document.getElementById('chatform'),
        usernameForm = document.getElementById('userform');

    this.username = '';

    chatform.onsubmit = (event) => {
      event.preventDefault();
      this.sendMessage();
    }

    usernameForm.onsubmit = (event) => {
      event.preventDefault();
      this.setUsername();
    }
  }

  sendMessage() {
    if ( this.username === '' ) {
      window.alert('Please set a username before sending a message');
    } else {
      let input = document.getElementById('chatbox');

      let instantMessage = {
        content: input.value,
        writter: this.username
      }

      server.emit('message', instantMessage);
      input.value = '';
    }
  }

  setUsername() {
    let username = document.getElementById('username');
    this.username = username.value;
  }

}

window.onload = () => {
  new Client();
};
