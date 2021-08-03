const express = require('express');
const cors    = require('cors');
const {sockecControllers} = require('../sockets/controllers')
class Server{

    constructor(){
       this.port = process.env.PORT 
        this.app = express();

        // creoun servidor con express
        this.server = require('http').createServer(this.app)
        this.io =   require('socket.io')(this.server)
        // middlewares
        this.middlewares()
        // rutas de mi aplicacion
        this.routes()

        // eventos de los sockets
        this.sockets()
    }
    middlewares(){
        this.app.use( cors() )
        this.app.use(express.static('public'))
        // lectura y parseo de body
        
        // middleware para subida de archivos

    }

        
    routes(){
       

    }


    sockets(){

    this.io.on('connection',sockecControllers);

    }
    listen(){
        this.server.listen(this.port,()=>{
            console.log(`servidor corriendo en el puerto ${this.port}`)
        })
    }

}

module.exports = {
    Server
}