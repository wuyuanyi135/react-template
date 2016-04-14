var net = require('net');

// // prepare remote connection
// socket = net.connect(10000, "wuyuanyi135.eicp.net", function() {
//   console.log("Connected")
// });


//prepare ftp server
var ftpd = require('ftpd');
server = new ftpd.FtpServer("127.0.0.1", {
  getInitialCwd: function() {
    return '/';
  },
  getRoot: function() {
    return process.cwd();
  },
  pasvPortRangeStart: 1025,
  pasvPortRangeEnd: 1050,
  allowUnauthorizedTls: true,
  useWriteFile: false,
  useReadFile: false,
  uploadMaxSlurpSize: 7000, // N/A unless 'useWriteFile' is true.

});

server.on('error', function(error) {
  console.log('FTP Server error:', error);
});
server.on('client:connected', function(connection) {
  var username = null;
  console.log('client connected: ' + connection.remoteAddress);
  connection.on('command:user', function(user, success, failure) {
    if (user) {
      username = user;
      success();
    }
    else {
      failure();
    }
  });

  connection.on('command:pass', function(pass, success, failure) {
    if (pass) {
      success(username);
    }
    else {
      failure();
    }
  });
});

server.listen(2121);

//prepare internal socket
// ftpsocket = net.connect(2121, "127.0.0.1", function() {
//   console.log("Internal socket connected")
// });

// socket.pipe(ftpsocket);
// ftpsocket.pipe(socket);

// socket.on('data', function(buf) {
//   console.log('< ' + buf.toString())
// });
// var dataSocket;
// ftpsocket.on('data', function(buf) {
//   console.log('> ' + buf.toString())
//   if (buf.toString().substring(0,3) == "227") {
//     // get port
//     var group = /\(.*,(\d*),(\d*)\)/.exec(buf.toString());
//     var port = group[1] * 256 + group[2];
//     dataSocket = net.connect(port, "127.0.0.1", function(){
//       console.log("Data socket connected");
      
//     })
//   }
// });