const path = require('path');
const fs = require('fs');
const { error } = require('console');


class Ticket{
    constructor(numero , escritorio ){
        this.numero = numero ;
        this.escritorio = escritorio ;
    }
}

class TicketControl {


    // hago mi constructor de propiedades de mi clase 
    // no olvidar mi porpiedad del init

    constructor(){

        this.lastTicket   = 0;
        this.today        = new Date().getDate();
        this.tickets      = [];
        this.last4Tickets = [];

        this.init()
    }

        // inicia el sistema
    init(){
        let {lastTicket, today,     tickets,   last4Tickets} = require('../db/data.json')
        if(today == this.today){
            this.lastTicket   = lastTicket,
            this.tickets      = tickets ,  
            this.last4Tickets = last4Tickets
        }else{
            this.guardarDb()
        }
        
    }

    // retorna un objeto literal de propiedades del sistema
    // es un getter
    get toJson(){
        return {
            lastTicket    : this.lastTicket,
            today         : this.today ,      
            tickets       : this.tickets,    
            last4Tickets  : this.last4Tickets,
        }
    }

    // guardo en el Json(db)
    guardarDb(){
        // busco mi path en mi servidor
        const dbPath = path.join(__dirname , '../db/data.json')

        // guardo con el paquete fs en el data.json
        fs.writeFileSync(dbPath , JSON.stringify(this.toJson) )
               
        
    }
    // retorna un objeto con el numero del tickect y el escritorio(null)
    // introduce al sistema un nuevo ticket
    nextTicket(){
        // aumento mi contador de tickets
        this.lastTicket++
        // creo una nueva instancia de un ticket
        const ticket = new Ticket(  this.lastTicket , null)
        // agrego a  mi arreglo total de tickets
        this.tickets.push(ticket)
        // guardo en mi db
        this.guardarDb()

        return `ticket : ${ticket.numero} `
    }


    attendTicket(escritorio){

        // no hay ticket
        if(this.tickets.length == 0){
            return null
        }

        // remuevo el primer ticket del arreglo(atiendo al ultimo ticket)
        const ticket = this.tickets.shift()
        ticket.escritorio = escritorio
        // agrego a mi lista de ultimos 4
        this.last4Tickets.unshift(ticket)
        if(this.last4Tickets.length > 4){
            this.last4Tickets.splice(-1,1)
        }

        // guardar en db
        this.guardarDb()

        // returno el ticket atendido
        return  ticket


    }
  
}


module.exports = TicketControl