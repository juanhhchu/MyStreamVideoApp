const socket = io('/');
const videoGrid = document.getElementById('video-grid');
const myVideo = document.createElement('video');
myVideo.muted = true;
var peer = new Peer(undefined, {
    path: '/peerjs',
    host: '/',
    port: '3030'
});

navigator.mediaDevices.getUserMedia({ audio: false, video: true }).then(function(stream){
    addVideoStream(myVideo, stream);
    //agregamos nuevo videoUsuario a la sala con una peticion de llamada con peer
    peer.on('call', call => {
        call.answer(stream)
        const video = document.createElement('video')
        call.on('stream', userVideoStream => {
            addVideoStream(video, userVideoStream)
        })
    })

    //controlamos los usuarios que se conectan
    socket.on('user-connected', (userId) => {
        connectToNewUser(userId, stream);
    })

})

peer.on('open', id => {
    socket.emit('join-room', ROOM_ID, id);

})


//cuando se conecte un usuario new,llamamos a ese user se le enviara el stream principal y se agregara un nuevo video a la ventana
const connectToNewUser = (userId,stream) => {
    const call = peer.call(userId, stream)
    const video = document.getElementById('video')
    call.on('stream', userVideoStream => {
        addVideoStream(video, userVideoStream)
    })
}


const addVideoStream = (video , stream) => {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
        video.play();
    })
    videoGrid.append(video);
}