
const online  = document.getElementById('online');
const offline = document.getElementById('offline');

const mensajeTxt = document.getElementById('mensajeTxt')
const btnEnviar = document.getElementById('btn-enviar')
const socket = io()

// evnto para escuchar la desconecion del servidor
socket.on('connect',()=>{

    offline.style.display = 'none'
    online.style.display  = 'inline'
})
// evento para escuchar la desconeccion de servidor
socket.on('disconnect',()=>{
    console.log('desconectado !')
    online.style.display  = 'none'
    offline.style.display = 'inline'

})

// con etse evento recibo la retroalimentacion del servidor
socket.on('mensaje',(payload)=>{
    console.log(payload)
})

// evento comun de front-end
btnEnviar.addEventListener('click',()=>{
    socket.emit('mensaje-enviar',{  message : mensajeTxt.value,
        fecha : new Date().getTime(),
        id: 1522554},(id)=>{
            console.log(`desde el server ${id}`)
        })
    
})

