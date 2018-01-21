$(document).ready(function(){
    var socket = io()
    var room = $('#groupName').val()
    var sender = $('#sender').val()
    var scrollToheight = $("#messages").height();
    $('#messages').scrollTop(scrollToheight);

    socket.on('connect', function(){
        console.log('Yea! User connected')

        var params = {
            room: room,
            name: sender
        }

        socket.emit('join', params, function(){
            console.log('user has joined this channel')
        })
    })

    socket.on('usersList', function(users){
        var listTemplate = $('#users')
        var usersList = users.map(function(user){
            return `<p>${user}</p>`
        })
        listTemplate.append(usersList.join(' '))
    })

    socket.on('newMessage', function(data){
        var template = $('#message-template').html()
        var message = Mustache.render(template, {
            text: data.text,
            sender: data.from,
        })
        
        $('#messages').append(message)
    })

    $('#message-form').on('submit', function(e){
        e.preventDefault();
        var msg = $('#msg').val()

        socket.emit('createMessage', {
            text: msg,
            room: room,
            from: sender
        }, function(){
            $('#msg').val('')
        })
    })
})