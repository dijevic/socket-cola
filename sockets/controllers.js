const sockecControllers =  (socket) => {
    console.log('conectado',socket.id)
    socket.on('disconnect',()=>{
        console.log('desconectado')
    })

    // evento que recibe
    socket.on('mensaje-enviar',(payload,callback)=>{

        let id = 123654;
        callback(id)

        socket.broadcast.emit('mensaje',payload)
        // evento de salida usar para servicios rest(recomendacion)
        // this.io.emit('mensaje',payload)
    })
  }

 module.exports = {sockecControllers}
