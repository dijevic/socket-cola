const TicketControl = require('../models/ticket_control')

const ticketControl = new TicketControl()

const sockecControllers =  (socket) => {

  // mando mi ultimo ticket
  socket.emit('ultimo-ticket',ticketControl.lastTicket)
  // le mando mi lista de ultimos 4 a mi pantalla
  socket.emit('estado-actual',ticketControl.last4Tickets)
  // le mando a mis escritorios mi lista en cola de tickets
  socket.emit('cola-tickets',ticketControl.tickets)


    // evento que recibe del cliente
    socket.on('siguiente-ticket',(payload,callback)=>{
        // activo mi proceso y agrego un ticket
        const siguiente =  ticketControl.nextTicket()
        // mando my ticket al cliente
       callback(siguiente)
       socket.broadcast.emit('cola-tickets',ticketControl.tickets)

     
    })


    socket.on('atender-ticket',({escritorio} , callback)=>{

        if(!escritorio){
          return {
            ok: false , 
            msg: `error en el lado del front end, falta el escritorio`
          }
        }

        const ticket = ticketControl.attendTicket(escritorio)
        socket.broadcast.emit('estado-actual',ticketControl.last4Tickets)
        socket.emit('cola-tickets',ticketControl.tickets)

        if(!ticket){
          callback({
            ok: false ,
            msg: ` ya no hay mas tickets por atender`
          })
        }else{
          callback({ticket, ok : true})

        }

    })

  }

 module.exports = {sockecControllers}
