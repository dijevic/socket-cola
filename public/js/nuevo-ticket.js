

// Referencias del HTML

const btnCrear       = document.querySelector('button')
const lblNuevoTicket = document.querySelector('#lblNuevoTicket')

const socket = io();


socket.on('connect', () => {
btnCrear.disabled = false

});

socket.on('disconnect', () => {
btnCrear.disabled = true
 
});
socket.on('ultimo-ticket',(ultimo)=>{
    lblNuevoTicket.innerText = `ultimo ticket : ${ultimo}`

})





btnCrear.addEventListener( 'click', () => {

  
    // emito el evento
    socket.emit( 'siguiente-ticket', null, ( ticket ) => {
        lblNuevoTicket.innerText = `su ${ticket}`
    });

});