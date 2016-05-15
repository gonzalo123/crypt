JS crypt and decrypt with crypto-js
======
[![Build Status](https://travis-ci.org/gonzalo123/crypt.svg?branch=master)](https://travis-ci.org/gonzalo123/crypt)

crypt-js wrapper

## install node package
```
npm g-crypt
```

## install bower package

```
bower install g-crypt
```

## Example

Encrypt and decrypt socket.io comunications

The socket.io server
```js
var io = require('socket.io')(3000),
    Crypt = require("g-crypt"),
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
```

the HTTP client

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
Open console to see the messages

<script src="http://localhost:3000/socket.io/socket.io.js"></script>
<script src="assets/cryptojslib/rollups/aes.js"></script>
<script src="assets/g-crypt/src/Crypt.js"></script>
<script>
    var socket = io('http://localhost:3000/'),
        passphrase = 'fcf8afd67e96fa3366dd8eafec8bcace',
        crypter = Crypt(passphrase),
        id = 0;

    socket.on('connect', function () {
        console.log("connected! Let's start the counter with: " + id);
        socket.emit('counter', crypter.encrypt({id: id}));
    });

    socket.on('counter', function (data) {
        var decriptedData = crypter.decrypt(data);
        console.log("counter status: " + decriptedData.id);
        socket.emit('counter', crypter.encrypt({id: decriptedData.id}));
    });
</script>

</body>
</html>
```
