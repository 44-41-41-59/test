'use strict';
const { io } = require('../server.js');
let clientsQueue = [];
let custmerRooms = {};
io.on('connection', (socket) => {
  // will be emit when some error happend
  socket.on('error', (payload) => {
    console.log('error', payload);
  });
  /// when the admin is connect it will make a new room in the custmerRooms with the id of the admin side and will assign the admin to this room to wait the client every time an admin join will invoke the checkFromTheQueueClients function to see if there is a clint in the queue
  socket.on('admin', (name, room) => {
    // the room will have an object with status (if there is a client with him or not) true is free and false is busy and the name of the admin
    custmerRooms[room] = { status: true, name };
    socket.join(room);
    setTimeout(() => {
      checkFromTheQueueClients();
    }, 1000);
  });

  /// will emit this lesnter when the admin is disconect and will remove the room of the admin from custmerRooms
  socket.on('admindisconecct', (room) => {
    delete custmerRooms[room];
  });

  /// will emit when the client is connect to the server and push the client to queue in clientsQueue array
  socket.on('userConnected', async (name) => {
    clientsQueue.push(socket);
    // check from the queue if there is a free room to join the client if not will send to the user to wait his line with (wait listener)
    if (!checkFromTheQueueClients()) socket.emit('wait', {});
  });

  /// will emit when the user is disconnect from the room will make leave the room and will have the room id
  socket.on('userDisconnected', (room) => {
    socket.leave(room.room);
    // will emit next listener with room
    io.in(room.room).emit('next', room.room);
  });

  /// will wait from the admin or the clinte a message with the room to send the the other in the same room and the id to know who is the sender if their the same clint or not will be compera with the socket.id from the reseved side
  socket.on('massege', (room, message, id) => {
    io.in(room).emit('masseage', { message, id });
  });

  /// will invoke when the user is disconnect
  socket.on('next', (room) => {
    // will check if the room is in the object and will make the status of it true (its free to have the next client)
    if (custmerRooms[room]) custmerRooms[room].status = true;
    setTimeout(() => {
      checkFromTheQueueClients();
    }, 1000);
  });
});

/// checkFromTheQueueClients function will invoke when we want to check if there client in the queue
function checkFromTheQueueClients() {
  // check from the queue if there a client
  if (clientsQueue.length) {
    // loop in the custmerRooms object
    for (let room in custmerRooms) {
      // check for a free room with status of true
      if (custmerRooms[room].status) {
        let name = custmerRooms[room].name;
        let socket = clientsQueue.shift();
        // let the first client join the free room with the admin
        socket.join(room);
        // notify the client that he was joined with the room id and the name of agent
        socket.emit('joinded', { room, name });
        // change the status of the room to busy (false)
        custmerRooms[room].status = false;
        return room;
      }
    }
    /// return false if there is no one in the client queue
    return false;
  }
}
