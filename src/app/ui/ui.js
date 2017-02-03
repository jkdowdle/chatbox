let Ui = {
  renderMessage( message ) {
    let target = document.querySelector('.chat-window'),
        element = document.createElement('div');
    element.className = 'chat-message';
    element.innerHTML = newMessageTempalte( message );
    target.appendChild( element );
  }
};

function newMessageTempalte( message ) {
  console.log(message);
  let template = `
    <p>
      <span class="chat-author">${ message.writter }:</span>
      <span>${ message.content }</span>
    </p>
  `;

  return template;
};

export { Ui };
