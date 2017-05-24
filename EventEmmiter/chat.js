const EventEmitter = require('events');

class ChatApp extends EventEmitter {
  /**
   * @param {String} title
   */
  constructor(title) {
    super();

    this.title = title;

    // Посылать каждую секунду сообщение
    setInterval(() => {
      this.emit('message', `${this.title}: ping-pong`);
    }, 1000);
  }

  close() {
      this.emit('close');
  }
}

let webinarChat = new ChatApp('webinar');
let facebookChat = new ChatApp('=========facebook');
let vkChat = new ChatApp('---------vk');

let chatOnMessage = (message) => {
  console.log(message);
};

let prepareToAnswerOnMessage = () => {
  console.log('Готовлюсь к ответу');
};

let vkClose = () => { console.log('Чат вконтакте закрылся :(') };

webinarChat.on('message', chatOnMessage)
  .on('message', prepareToAnswerOnMessage);
facebookChat.on('message', chatOnMessage);
vkChat.setMaxListeners(2)
  .on('close', vkClose)
  .on('message', chatOnMessage)
  .on('message', prepareToAnswerOnMessage);


// Закрыть вконтакте
setTimeout(()=> {
  console.log('Закрываю вконтакте...');
  vkChat.close();
  vkChat.removeListener('message', chatOnMessage);
}, 10000);


// Закрыть фейсбук
setTimeout(()=> {
  console.log('Закрываю фейсбук, все внимание — вебинару!');
  facebookChat.removeListener('message', chatOnMessage);
}, 15000);