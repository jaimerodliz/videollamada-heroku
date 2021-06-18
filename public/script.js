const socket = io('/');

const videoGrid = document.getElementById('video-grid');

/*const myPeer = new Peer(undefined,{
    host: '/',
    port: '9000'
});*/
const myPeer = new Peer();

const myVideo =  document.createElement('video');
//myVideo.muted = true;
myVideo.setAttribute("tipo", "cero");

const peers = {};
let peers2 ={};
let duplicated={};


let myVideoStream;

let currentPeer;

let myId;

var myUserId = "";

myPeer.on('open', id => {
    //myId=id;
    socket.emit('join-room', ROOM_ID, id,user_type);
    myVideo.classList.add(id)
    myVideo.setAttribute("tipo", "cuatro");
});

//conectar video
navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then( stream => {
    //guardar stream para usar controles
    myVideoStream = stream

    addVideoStream( myVideo, stream);

    //enviar stream actual al usuario que haga conexion al stream actual
    myPeer.on('call', call => {
        //console.log(call.peer);
        call.answer(stream);
        const video = document.createElement('video');
        video.setAttribute("tipo", "uno");
        video.classList.add(call.peer);
        //video.classList.add('dos')

        call.on('stream', userVideoStream=>{
            addVideoStream(video,userVideoStream);
        })
        // when press enter send message
    })

    //conectar usuarios al stream
    //aqui se genera el duplicado validar si ya existe en el arreglo
    socket.on('user-connected',userId => {
        myUserId = userId;
        connectToNewUser(userId, stream)
        //deleteDuplicate()
    })
})

$('#chat_message').on('keydown',function (e) {
    if (e.which == 13 && $(this).val().length !== 0) {
        socket.emit('message', $(this).val(),user_name)
        $(this).val('')
    }
});

socket.on("createMessage", (message,usuId) => {
    $(".messages").append(`<li class="message"><b>${usuId}</b><br/>${message}</li>`);
    scrollToBottom();
})

const scrollToBottom = () => {
    var d = $('.content_chat');
    d.scrollTop(d.prop("scrollHeight"));
  }

function deleteDuplicate(){
    //const duplicated=[];

    $('#video-grid video').each(function(){
        //console.log($(this).attr("class"))
        if(duplicated[$(this).attr("class")]){
            duplicated[$(this).attr("class")][0] = duplicated[$(this).attr("class")][0] + 1
            //$(this).remove();
        }else{
            duplicated[$(this).attr("class")] = [1]
        }
    });

    //console.log(duplicated)
}

function repeatVideo(id){
    var res=0;
    $('#video-grid video').each(function(){
        //console.log($(this).attr("class"))
        //console.log(id, $(this).attr("class"));
        if(id == $(this).attr("class")){
            res=1;
        }
    })
    return res
}

/*function shareScreen(){
    navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: false
    }).then(stream => {
        let videoTrack = stream.getVideoTracks()[0];
        console.log(videoTrack);
        console.log(myVideoStream.getVideoTracks()[0]);
        let sender = currentPeer.getSenders().find(function(s){
            return s.track.kind == videoTrack.kind
        })

        sender.replaceTrack(videoTrack)

    })
}*/

const shareScreen = async () => {
    //const videoGrid = document.getElementById('video-grid')
    let captureStream = null;
    const myVideo2 = document.createElement('video')
    myVideo2.setAttribute("tipo", "share")
    try {
      captureStream = await navigator.mediaDevices.getDisplayMedia()
      //.then(stream => {
       // addVideoStream2(myVideo2, stream)
      //});
    } catch (err) {
      console.error("Error: " + err);
    }

   /* myPeer.on('open', id => {
        socket.emit('join-room', ROOM_ID, id)
        myVideo2.classList.add(id)
        myVideo2.setAttribute("tipo", "tres");

    })

    socket.on('user-connected', userId => {
        connectToNewUser(userId, captureStream)
        //deleteDuplicate()
    })*/
    //connectToNewUser(myUserId, captureStream);
    myPeer.call(myUserId, captureStream);

   // addVideoStream(myVideo2,captureStream);

};

const shareScreen2 = () => {
    const socket = io('/')
    const videoGrid = document.getElementById('video-grid')
    const myPeer2 = new Peer()
    const myVideo2 = document.createElement('video')
    myVideo2.setAttribute("tipo", "dos");
    myVideo2.muted = true

    myPeer2.on('open', id => {
        socket.emit('join-room', ROOM_ID, id,user_type)
        myVideo2.classList.add(id)
        myVideo2.setAttribute("tipo", "tres");

    })
   
    navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: false
    }).then(stream => {
        //myVideoStream = stream;
        addVideoStream(myVideo2, stream)
        myPeer2.on('call', call => {
            call.answer(stream)
            var repetido = repeatVideo(call.peer);
            console.log('repetido '+ repetido)
            const video2 = document.createElement('video')
            video2.classList.add(call.peer)
            video2.setAttribute("tipo", "siete");
            if(repetido==0){
                call.on('stream', userVideoStream => {
                    addVideoStream(video2, stream)
                    //deleteDuplicate()
                })
            }
            
            
        })

        socket.on('user-connected', userId => {
            connectToNewUser(userId, stream)
            //deleteDuplicate()
        })

        
  

    })

    socket.on('user-disconnected', userId => {
        //if (peers2[userId]) peers2[userId].close()
    })

    function repeatVideo(id){
        var res=0;
        $('#video-grid video').each(function(){
            //console.log($(this).attr("class"))
            console.log(id, $(this).attr("class"));
            if(id == $(this).attr("class")){
                res=1;
                
            }
        })
        return res
    }

    function connectToNewUser(userId, stream) {
    
        const call = myPeer2.call(userId, stream)
        const video2 = document.createElement('video')
        video2.classList.add(userId)
        video2.setAttribute("tipo", "seis");
        var repetido = repeatVideo(userId);
        console.log('repetido2 '+ repetido)
        if(repetido == 0){
            call.on('stream', userVideoStream => {
                addVideoStream2(video2,userVideoStream,userId);
            })
        }
        
        call.on('close', () => {
            video2.remove()
        })

        peers2[userId] = call
        
        //console.log('share');
        //console.log(peers);
        //console.log('peer2');
        //console.log(peers2);
    }

    function addVideoStream(video2, stream) {
        video2.srcObject = stream
        video2.addEventListener('loadedmetadata', () => {
            video2.play()
        })
        videoGrid.append(video2)
    }

    function addVideoStream2(video2, stream,id) {
        video2.srcObject = stream
        video2.addEventListener('loadedmetadata', () => {
            video2.play()
        })
        videoGrid.append(video2)

        var repetido = repeatVideo(id);
        console.log('repetido4 '+ repetido)
    }

}

socket.on('user-disconnected', userId =>{
    console.log('peer2');
    console.log(peers);
   if(peers[userId]) peers[userId].close();
   //console.log('desconectado');
   
   
   //console.log(peers2);
});

socket.on('end-call', function(destination) {
    console.log("aca")
    window.location.href = destination;
})



//crear stream
function addVideoStream(video, stream) { 
    //console.log(stream)
    video.srcObject = stream;
    //cargar el video en el navegador
    video.addEventListener('loadedmetadata', () =>{
        video.play();
    });
    
    //console.log(video)
    videoGrid.append(video);

    change_video();
}

/*function addVideoStream2(video, stream) {
    myPeer.on('open', id => {
        myId=id;
        console.log(myId);
        video.classList.add(myId)
        console.log(duplicated[myId]);
        if(duplicated[myId]){
            video.classList.add('repetido');
        }
        video.srcObject = stream;
        //cargar el video en el navegador
        video.addEventListener('loadedmetadata', () =>{
            video.play();
        });
        
        //console.log(video)
        videoGrid.append(video)
        //socket.emit('join-room', ROOM_ID, id);
    });

    
}*/

//conectar usuarios al stream
function connectToNewUser(userId, stream){
    //obtener streams 
    const call = myPeer.call(userId,stream);

    const video = document.createElement('video')
    video.classList.add(userId)
    video.setAttribute("tipo", "cinco");
    //var repetido = repeatVideo(userId);
    //console.log('repetido3 '+ repetido)
    /*console.log(duplicated[userId]);
    if(duplicated[userId]){
        video.classList.add('repetido');
    }*/
    
    //obtener stream del otro usuario y añadirlo al actual
    call.on('stream', userVideoStream =>{
        addVideoStream(video,userVideoStream);
    });

    //al salirse un usuario del stream cerrar su video en otros usuarios
    call.on('close', () =>{
        video.remove();
    });

    peers[userId] = call;
    //console.log('normal');
    //console.log(peers);
    //console.log('-peer2');
    //console.log(peers2);
}

const videoAction = () => {
    //console.log('object')
    let activo = myVideoStream.getVideoTracks()[0].enabled;
    if (activo) {
        //pausar envio de datos de video
        myVideoStream.getVideoTracks()[0].enabled = false;
        //cambiar icono video
        setPlayVideo()
    } else {
        //cambiar icono video
        setStopVideo()
        //activar envio de datos de video
        myVideoStream.getVideoTracks()[0].enabled = true;
    }
}

const muteAction = () => {
    const enabled = myVideoStream.getAudioTracks()[0].enabled;
    if (enabled) {
        //desactivar envio de datos de audio
         myVideoStream.getAudioTracks()[0].enabled = false;
        //cambiar icono audio
        setUnmuteButton();
    }else{
        //cambiar icono audio
        setMuteButton();
        //activar envio de datos de audio
        myVideoStream.getAudioTracks()[0].enabled = true;
    }
}

const setPlayVideo = () => {
    const html = `
    <i class="stop fas fa-video-slash"></i>
      <span>Activar</span>
    `
    document.querySelector('#btn_video').innerHTML = html;
}

const setStopVideo = () => {
    const html = `
      <i class="fas fa-video"></i>
      <span>Desactivar</span>
    `
    document.querySelector('#btn_video').innerHTML = html;
}

const setMuteButton = () => {
    const html = `
      <i class="fas fa-microphone"></i>
      <span>Silenciar</span>
    `
    document.querySelector('#btn_mute').innerHTML = html;
}
  
const setUnmuteButton = () => {
    const html = `
      <i class="fas fa-microphone-slash"></i>
      <span>Reactivar</span>
    `
    document.querySelector('#btn_mute').innerHTML = html;
}

const joinRoom = () =>{
    $("#div_emails span").remove()
    $("#inp_email").val("")
    $("#modal_invitar").modal("show")
}

function validaEmail(email){
    var regex = /[\w-\.]{2,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;
    if (regex.test(email)) {
        return true
    } else {
        return false
    }
}

const remove_email = (e) =>{
    e.parent().parent().remove();
    $("#inp_email").val("");
}

const addEmail = () =>{
    //console.log("hola");
    if(validaEmail($("#inp_email").val().trim())){
        var html="<div class='lblemail'><span><em>"+$("#inp_email").val().trim()+"</em> <i onclick='remove_email($(this))' class='remove-email fas fa-trash-alt'></i></span></div>"; 
        $("#div_emails").append(html);
        $("#inp_email").val("");
    }else{
        alertify.error("Ingrese el correo electrónico correctamente");
    }
}

const getCorreos_v = () =>{
    var correos=[];
    if($("#inp_email").val().trim()!=""){
        if(validaEmail($("#inp_email").val().trim())){
            correos.push($("#inp_email").val().trim());
        }else{
            alertify.error("Ingrese el correo electrónico correctamente");
        }
    }
	$("#div_emails em").each(function(){
		correos.push($(this).text());
	});
	return correos;
}

const sendMail = () =>{
    var obj = getCorreos_v();
    var myJSON = JSON.stringify(obj);
    if(obj.length>0){
        $.ajax({
            type:'POST',
            url:"/send-email",
            data:{ correo: myJSON, ruta: ROOM_ID},
            success: function(json){
                $("#div_emails span").remove();
                $("#inp_email").val("");
                $("#modal_invitar").modal("hide");
                alertify.success("Invitación enviada correctamente");
            }
        });
    }else{
        alertify.error("Ingrese al menos un correo electrónico");
    }
    
}



/*$("#div_emails").on("click",".remove-email",function(){
    $(this).parent().parent().remove();
    $("#inp_email").val("");
})*/


const del_mail = () =>{
    $("#div_emails span").remove();
    $("#inp_email").val("");
}

socket.on('redirect', function(destination) {
    window.location.href = destination;
})

const leaveRoom = () =>{
    alertify.confirm('Salir', '¿Esta seguro(a) que desea salir de la viodellamada?', 
    function(){ 
        socket.emit('leave-room', ROOM_ID,user_type);
    }, function(){}).set('labels', {ok:'Si', cancel:'No'})

    
}

const openChat = () =>{
    if($("#mySidebar").hasClass("open_sidebar")){
        $("#mySidebar").removeClass("open_sidebar")
        $("#main").removeClass("open_main")
        $("#mySidebar").addClass("close_sidebar")
        $("#main").addClass("close_main")
    }else{
        $("#mySidebar").removeClass("close_sidebar")
        $("#main").removeClass("close_main")
        $("#mySidebar").addClass("open_sidebar")
        $("#main").addClass("open_main")
    }
    
}
  
const closeNav = () =>{
    $("#mySidebar").removeClass("open_sidebar")
    $("#main").removeClass("open_main")
    $("#mySidebar").addClass("close_sidebar")
    $("#main").addClass("close_main")
}


function change_video(){
    var list = document.getElementsByTagName("video");
    var cont=list.length;
    console.log("elementos",cont);
    if(cont==2){
        $("video").css("height", "100%");
        $("video").css("width", "50%");
    }else if(cont==3){
        $("video").css("height", "100%");
        $("video").css("width", "33%");
    }else if(cont >=4 && cont<=6){
        $("video").css("height", "300px");
        $("video").css("width", "400px");
    }else if(cont >=7 && cont<=8){
        $("video").css("height", "100%");
        $("video").css("width", "25%");
    }else if(cont >=9){
        $("video").css("height", "100%");
        $("video").css("width", "20%");
    }

}

