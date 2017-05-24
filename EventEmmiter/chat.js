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
        return this;
    }
}

let chatOnMessage = (message) => {
  console.log(message);
};

let prepareToAnswerOnMessage = () => {
  console.log('Готовлюсь к ответу');
};

let vkClose = () => {
    console.log('Чат вконтакте закрылся :(')
};

module.exports = {
    app: ChatApp,
    chatOnMessage: chatOnMessage,
    prepareToAnswerOnMessage: prepareToAnswerOnMessage,
    vkClose: vkClose
};