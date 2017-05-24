
const ChatApp = require('./chat');

let webinarChat = new ChatApp.app('webinar');
let facebookChat = new ChatApp.app('=========facebook');
let vkChat = new ChatApp.app('---------vk');

// Запускаем все три чата
webinarChat
  .on('message', ChatApp.chatOnMessage)
  .on('message', ChatApp.prepareToAnswerOnMessage);
facebookChat.on('message', ChatApp.chatOnMessage);
vkChat
  .setMaxListeners(2)
  .on('message', ChatApp.chatOnMessage)
  .on('message', ChatApp.prepareToAnswerOnMessage)
  .on('close', ChatApp.vkClose);


// Закрыть вконтакте
setTimeout(()=> {
  console.log('Закрываю вконтакте...');
  vkChat
    .close()
    .removeListener('message', ChatApp.prepareToAnswerOnMessage)
    .removeListener('message', ChatApp.chatOnMessage);
}, 10000);


// Закрыть фейсбук
setTimeout(()=> {
  console.log('Закрываю фейсбук, все внимание — вебинару!');
  facebookChat.removeListener('message', ChatApp.chatOnMessage);
}, 15000);


// Отписываемся от message у webinarChat
setTimeout(()=> {
  console.log('Закрываем и webinar');
  webinarChat
    .removeListener('message', ChatApp.prepareToAnswerOnMessage)
    .removeListener('message', ChatApp.chatOnMessage);
}, 30000);