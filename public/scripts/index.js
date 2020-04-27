Object.defineProperty(HTMLMediaElement.prototype, 'playing', {
    get: function () {
        return !!(
            this.currentTime > 0 &&
            !this.paused &&
            !this.ended &&
            this.readyState > 2
        );
    },
});

let isAlreadyCalling = false;
let getCalled = false;

const existingCalls = [];

const { RTCPeerConnection, RTCSessionDescription } = window;

const peerConnection = new RTCPeerConnection();

function unselectUsersFromList() {
    const alreadySelectedUser = document.querySelectorAll(
        '.active-user.active-user--selected'
    );

    alreadySelectedUser.forEach((el) => {
        el.setAttribute('class', 'active-user');
    });
}

function createUserItemContainer(socketId) {
    const userContainerEl = document.createElement('div');

    const usernameEl = document.createElement('p');

    userContainerEl.setAttribute('class', 'active-user');
    userContainerEl.setAttribute('id', socketId);
    usernameEl.setAttribute('class', 'username');
    usernameEl.innerHTML = `Socket: ${socketId}`;

    // userContainerEl.appendChild(usernameEl);

    userContainerEl.addEventListener('click', () => {
        unselectUsersFromList();
        userContainerEl.setAttribute(
            'class',
            'active-user active-user--selected'
        );
        const talkingWithInfo = document.getElementById('talking-with-info');
        talkingWithInfo.innerHTML = `Talking with: "Socket: ${socketId}"`;
        callUser(socketId);
    });

    return userContainerEl;
}

async function callUser(socketId) {
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(new RTCSessionDescription(offer));

    socket.emit('call-user', {
        offer,
        to: socketId,
    });
}

function updateUserList(socketIds) {
    const activeUserContainer = document.getElementById(
        'active-user-container'
    );
    console.log('fefre', socketIds);
    // var isUserConnectedToVideo = false;
    if (socketIds.length > 1) {
        callUser(socketIds[0]);
    }
    // socketIds.forEach((socketId) => {
    //     const alreadyExistingUser = document.getElementById(socketId);
    //     if (!alreadyExistingUser) {
    //         // const userContainerEl = createUserItemContainer(socketId);
    //         // activeUserContainer.appendChild(userContainerEl);
    //     }
    // });
}

const socket = io.connect('localhost:5000');

socket.on('update-user-list', ({ users }) => {
    console.log('usersss', users);
    updateUserList(users);
});

socket.on('remove-user', ({ socketId }) => {
    const elToRemove = document.getElementById(socketId);

    if (elToRemove) {
        elToRemove.remove();
    }
});

socket.on('call-made', async (data) => {
    if (getCalled) {
        const confirmed = confirm(
            `User "Socket: ${data.socket}" wants to call you. Do accept this call?`
        );

        if (!confirmed) {
            socket.emit('reject-call', {
                from: data.socket,
            });

            return;
        }
    }

    await peerConnection.setRemoteDescription(
        new RTCSessionDescription(data.offer)
    );
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(new RTCSessionDescription(answer));

    socket.emit('make-answer', {
        answer,
        to: data.socket,
    });
    getCalled = true;
});

socket.on('answer-made', async (data) => {
    await peerConnection.setRemoteDescription(
        new RTCSessionDescription(data.answer)
    );

    if (!isAlreadyCalling) {
        callUser(data.socket);
        isAlreadyCalling = true;
    }
});

socket.on('call-rejected', (data) => {
    alert(`User: "Socket: ${data.socket}" rejected your call.`);
    unselectUsersFromList();
});

peerConnection.ontrack = function ({ streams: [stream] }) {
    const remoteVideo = document.getElementById('remote-video');
    if (remoteVideo) {
        remoteVideo.srcObject = stream;
    }
};
navigator.getUserMedia =
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia;

navigator.getUserMedia(
    { video: true, audio: true },
    (stream) => {
        const localVideo = document.getElementById('local-video');
        if (localVideo) {
            localVideo.srcObject = stream;
        }

        stream
            .getTracks()
            .forEach((track) => peerConnection.addTrack(track, stream));
    },
    (error) => {
        console.warn(error.message);
    }
);

var canvas = document.getElementsByClassName('whiteboard')[0];
var colors = document.getElementsByClassName('color');
var context = canvas.getContext('2d');

var current = {
    color: 'black',
};
var drawing = false;

canvas.addEventListener('mousedown', onMouseDown, false);
canvas.addEventListener('mouseup', onMouseUp, false);
canvas.addEventListener('mouseout', onMouseUp, false);
canvas.addEventListener('mousemove', throttle(onMouseMove, 10), false);

//Touch support for mobile devices
canvas.addEventListener('touchstart', onMouseDown, false);
canvas.addEventListener('touchend', onMouseUp, false);
canvas.addEventListener('touchcancel', onMouseUp, false);
canvas.addEventListener('touchmove', throttle(onMouseMove, 10), false);

for (var i = 0; i < colors.length; i++) {
    colors[i].addEventListener('click', onColorUpdate, false);
}

socket.on('drawing', onDrawingEvent);

window.addEventListener('resize', onResize, false);
onResize();

function drawLine(x0, y0, x1, y1, color, emit) {
    context.beginPath();
    context.moveTo(x0, y0);
    context.lineTo(x1, y1);
    context.strokeStyle = color;
    context.lineWidth = 2;
    context.stroke();
    context.closePath();

    if (!emit) {
        return;
    }
    var w = canvas.width;
    var h = canvas.height;

    socket.emit('drawing', {
        x0: x0 / w,
        y0: y0 / h,
        x1: x1 / w,
        y1: y1 / h,
        color: color,
    });
}

function onMouseDown(e) {
    drawing = true;
    current.x = e.clientX || e.touches[0].clientX;
    current.y = e.clientY || e.touches[0].clientY;
}

function onMouseUp(e) {
    if (!drawing) {
        return;
    }
    drawing = false;
    drawLine(
        current.x,
        current.y,
        e.clientX || e.touches[0].clientX,
        e.clientY || e.touches[0].clientY,
        current.color,
        true
    );
}

function onMouseMove(e) {
    if (!drawing) {
        return;
    }
    drawLine(
        current.x,
        current.y,
        e.clientX || e.touches[0].clientX,
        e.clientY || e.touches[0].clientY,
        current.color,
        true
    );
    current.x = e.clientX || e.touches[0].clientX;
    current.y = e.clientY || e.touches[0].clientY;
}

function onColorUpdate(e) {
    current.color = e.target.className.split(' ')[1];
}

// limit the number of events per second
function throttle(callback, delay) {
    var previousCall = new Date().getTime();
    return function () {
        var time = new Date().getTime();

        if (time - previousCall >= delay) {
            previousCall = time;
            callback.apply(null, arguments);
        }
    };
}

function onDrawingEvent(data) {
    var w = canvas.width;
    var h = canvas.height;
    drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color);
}

// make the canvas fill its parent
function onResize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
