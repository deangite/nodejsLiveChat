module.exports = function(io, Users){

    const users = new Users

    io.on('connection', (socket) => {
        console.log('User Connected')

        socket.on('join', (params, callback) => {
            const {name, room} = params
            socket.join(params.room)
            users.addUserData(socket.id, name, room)
            io.to(room).emit('usersList', users.getUsersList(room))
            callback()
        })

        socket.on('createMessage', (message, callback) => {
            console.log(message)
            io.to(message.room).emit('newMessage', {
                text: message.text,
                room: message.room,
                from: message.from
            })
            callback()
        })
    })


}