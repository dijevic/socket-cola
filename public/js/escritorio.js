// Referencias del HTML
const btnAtend       = document.querySelector('button')
const deskNumber     = document.querySelector('h1')
const lblticket      = document.querySelector('small')
const divAlert       = document.querySelector('.alert')
const lblPendientes  = document.querySelector('#lblPendientes')


// busco el escritorio !

const searchParams = new URLSearchParams(window.location.search)

if(!searchParams.has('escritorio')){
    window.location = '/index.html'
    throw new Error('el escritorio es obligario')
}

const escritorio = searchParams.get('escritorio')
divAlert.style.display = 'none'

const socket = io();


socket.on('connect', () => {
btnAtend.disabled = false ; 


});

socket.on('disconnect', () => {
btnAtend.disabled = true
 
});
// verfico el numero del ultimo ticket atendido
socket.on('ultimo-ticket',(ultimo)=>{
    deskNumber.innerText = escritorio

})

// reviso la cantidad de tickets en cola 
socket.on('cola-tickets',(ticket)=>{
    if(ticket.length == 0){
        divAlert.style.display = ''
        lblPendientes.style.display = 'none'
    }else{
        lblPendientes.style.display = ''
        divAlert.style.display = 'none'
        lblPendientes.innerText = ticket.length 

    }

})






btnAtend.addEventListener( 'click', () => {

  
    // emito el evento
    // aigno un escritorio/caja a un ticket
    socket.emit( 'atender-ticket', {escritorio}, ( {ok , msg , ticket} ) => {

        if(!ok){
            lblticket.innerText = `nadie`
        }else{

            lblticket.innerText = `el ticket: ${ticket.numero}`
        }
    });

});