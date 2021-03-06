/* eslint-disable comma-dangle */
/* eslint-disable indent */
const uuid = require('uuid').v4;
const io = require('socket.io-client');
const inquirer = require('inquirer');

let room = uuid();
const socket = io.connect('http://localhost:3001');
socket.userid = uuid();
socket.on('connect', async () => {
  let masseges = [];
  let name = await getName();

  socket.on('next', async (room) => {
    console.clear();
    masseges = [];
    console.log(
      'The chat was ended. Do you want to start a new chat with the next client? y/n'
    );
    const response = await inquirer.prompt([
      {
        prefix: '',
        name: 'text',
        message: `\n`,
      },
    ]);

    const command = response.text.toLowerCase().split(' ')[0];
    switch (command) {
      case 'y':
        socket.emit('next', room);
        break;
      case 'n':
        socket.emit('admindisconecct', room);
        process.exit();
        break;
    }
  });

  socket.on('masseage', (massege) => {
    console.clear();
    masseges.push(massege);
    masseges.forEach((massege) => {
      massege.id === socket.id
        ? console.log(' ' + massege.message)
        : console.log(
            '\x1b[33m%s\x1b[0m',
            '                                  ' + massege.message
          );
    });
    console.log('');
  });
  socket.emit('admin', name, room);

  socket.on('news', (data) => {
    console.log(data);
    socket.emit('my other event', 'yazan', 'ahmed', (data) => {
      console.log(data);
    });
  });
  socket.emit('say', 'hello there');

  getInput();

  async function getInput() {
    const response = await inquirer.prompt([
      {
        prefix: '',
        name: 'text',
        message: `----------------\n`,
      },
    ]);
    const command = response.text.toLowerCase().split(' ')[0];
    switch (command) {
      case 'quit':
        socket.emit('userDisconnected', { room });
        process.exit();
        break;
      // case 'y':
      //   socket.emit('next', room);
      //   break;
      // case 'n':
      //   socket.emit('admindisconecct', room);
      //   process.exit();
      //   break;
      default:
        socket.emit('massege', room, response.text, socket.id);
        getInput();
        break;
    }
    // socket.emit('message', `${response.text}`);
    // getInput();
  }
});

/// السروات
async function getName() {
  console.clear();
  const input = await inquirer.prompt([
    { name: 'name', message: 'What is your name?' },
  ]);
  return input.name;
  // getInput();
}
