const handleChat = (server) => {
    const io = require('socket.io')(server, {
        cors: {
            origin: '*',
        },
    }); // you can change the cors to your own domain.
    io.on('connection', (socket) => {
        ///Handle khi có connect từ client tới
        console.log('Client Kết nối mới:' + socket.id);

        socket.on('sendDataClient', function (data) {
            // Handle khi có sự kiện tên là sendDataClient từ phía client
            io.emit('sendDataServer', data); // phát sự kiện  có tên sendDataServer cùng với dữ liệu tin nhắn từ phía server
        });
        socket.on('disconnect', () => {
            console.log('Client ngắt kết nối'); // Khi client disconnect thì log ra terminal.
        });
    });
};

module.exports = handleChat;
