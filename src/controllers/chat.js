const handleChat = (io) => {
    io.on('connection', (socket) => {
        ///Handle khi có connect từ client tới
        // console.log('Client Kết nối mới:' + socket.id);

        socket.on('myRoom', (conversationId) => {
            console.log('Phòng:', conversationId);
            socket.join(conversationId); //tạo room

            socket.on('sendDataClient', function (data) {
                // Handle khi có sự kiện tên là sendDataClient từ phía client
                io.to(conversationId).emit('sendDataServer', data); // phát sự kiện  có tên sendDataServer cùng với dữ liệu tin nhắn từ phía server
            });

            // Khi ai đó đang nhập
            socket.on('entering', (data) => {
                socket.to(conversationId).emit('notificationEntering', data);
            });
            socket.on('mouseout', (data) => {
                socket.to(conversationId).emit('notificationMouseout', data);
            });

            // Khi client disconnect thì log ra terminal.
            socket.on('disconnect', () => {
                console.log('Client ngắt kết nối');
            });
        });
    });
};

module.exports = handleChat;
