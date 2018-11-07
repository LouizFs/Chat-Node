var app = require('./config/server');

var server = app.listen(80, function (req, res) {
    console.log('server running at port 80')
})

var io = require('socket.io').listen(server); // na porta 80 tanto req http como websockets serao recebidas e interpretadas
app.set('io', io)

/* criar conexao para o websocket */
io.on('connection', function (socket) {
    console.log('O usuario conectou');

    socket.on('disconnect', function () {
        console.log('usuario desconectado')
    });



    socket.on('msgParaServidor', function (data) {
        socket.emit('msgParaCliente',
            { apelido: data.apelido, mensagem: data.mensagem })

        socket.broadcast.emit('msgParaCliente',
            { apelido: data.apelido, mensagem: data.mensagem }
        )
        if (parseInt(data.apelido_atualizado_nos_clientes) == 0) {
            socket.emit('participantesParaCliente',
                { apelido: data.apelido }
            )
            socket.broadcast.emit('participantesParaCliente',
                { apelido: data.apelido }
            )
        }
    })
});


