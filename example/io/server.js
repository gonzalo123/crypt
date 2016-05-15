var io = require('socket.io')(3000),
    Crypt = require("../../node/Crypt"),
    passphrase = 'fcf8afd67e96fa3366dd8eafec8bcace',
    crypter = Crypt(passphrase);

io.on('connection', function (socket) {
    socket.on('counter', function (data) {
        var decriptedData = crypter.decrypt(data);
        setTimeout(function () {
            console.log("counter status: " + decriptedData.id);
            decriptedData.id++;
            socket.emit('counter', crypter.encrypt(decriptedData));
        }, 1000);
    });
});