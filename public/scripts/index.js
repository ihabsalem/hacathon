let isAlreadyCalling = false;
let getCalled = false;

const existingCalls = [];

const { RTCPeerConnection, RTCSessionDescription } = window;

const peerConnection = new RTCPeerConnection();

function unselectUsersFromList() {
  const alreadySelectedUser = document.querySelectorAll(
    ".active-user.active-user--selected"
  );

  alreadySelectedUser.forEach(el => {
    el.setAttribute("class", "active-user");
  });
}

function createUserItemContainer(socketId) {
  const userContainerEl = document.createElement("div");

  const usernameEl = document.createElement("p");

  userContainerEl.setAttribute("class", "active-user");
  userContainerEl.setAttribute("id", socketId);
  usernameEl.setAttribute("class", "username");
  usernameEl.innerHTML = `Socket: ${socketId}`;

  userContainerEl.appendChild(usernameEl);

  userContainerEl.addEventListener("click", () => {
    unselectUsersFromList();
    userContainerEl.setAttribute("class", "active-user active-user--selected");
    const talkingWithInfo = document.getElementById("talking-with-info");
    talkingWithInfo.innerHTML = `Talking with: "Socket: ${socketId}"`;
    callUser(socketId);
  });

  return userContainerEl;
}

async function callUser(socketId) {
  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(new RTCSessionDescription(offer));

  socket.emit("call-user", {
    offer,
    to: socketId
  });
}

function updateUserList(socketIds) {
  const activeUserContainer = document.getElementById("active-user-container");

  socketIds.forEach(socketId => {
    const alreadyExistingUser = document.getElementById(socketId);
    if (!alreadyExistingUser) {
      const userContainerEl = createUserItemContainer(socketId);

      activeUserContainer.appendChild(userContainerEl);
    }
  });
}

const socket = io.connect("localhost:5000");

socket.on("update-user-list", ({ users }) => {
  updateUserList(users);
});

socket.on("remove-user", ({ socketId }) => {
  const elToRemove = document.getElementById(socketId);

  if (elToRemove) {
    elToRemove.remove();
  }
});

socket.on("call-made", async data => {
  if (getCalled) {
    const confirmed = confirm(
      `User "Socket: ${data.socket}" wants to call you. Do accept this call?`
    );

    if (!confirmed) {
      socket.emit("reject-call", {
        from: data.socket
      });

      return;
    }
  }

  await peerConnection.setRemoteDescription(
    new RTCSessionDescription(data.offer)
  );
  const answer = await peerConnection.createAnswer();
  await peerConnection.setLocalDescription(new RTCSessionDescription(answer));

  socket.emit("make-answer", {
    answer,
    to: data.socket
  });
  getCalled = true;
});

socket.on("answer-made", async data => {
  await peerConnection.setRemoteDescription(
    new RTCSessionDescription(data.answer)
  );

  if (!isAlreadyCalling) {
    callUser(data.socket);
    isAlreadyCalling = true;
  }
});

socket.on("call-rejected", data => {
  alert(`User: "Socket: ${data.socket}" rejected your call.`);
  unselectUsersFromList();
});

peerConnection.ontrack = function({ streams: [stream] }) {
  const remoteVideo = document.getElementById("remote-video");
  if (remoteVideo) {
    remoteVideo.srcObject = stream;
  }
};

navigator.getUserMedia(
  { video: true, audio: true },
  stream => {
    const localVideo = document.getElementById("local-video");
    if (localVideo) {
      localVideo.srcObject = stream;
    }

    stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));
  },
  error => {
    console.warn(error.message);
  }
);



window.addEventListener('load', function () {

  // JavaScript Document
  $(function () {
      $('#showall').click(function () {
          $('.targetDiv').show();
      });
      $('.showSingle').click(function () {
          $('.targetDiv').hide();
          $('#div' + $(this).attr('target'))
              .show()
              .addClass('animated fadeIn');
      });
  });
  
  $(function () {
      var parent1 = $('#shuffle1');
      var divs1 = parent1.children();
      while (divs1.length) {
          parent1.append(
              divs1.splice(Math.floor(Math.random() * divs1.length), 1)[0]
          );
      }
  });
  
  $(function () {
      var parent2 = $('#shuffle2');
      var divs2 = parent2.children();
      while (divs2.length) {
          parent2.append(
              divs2.splice(Math.floor(Math.random() * divs2.length), 1)[0]
          );
      }
  });
  
  $(function () {
      var parent3 = $('#shuffle3');
      var divs3 = parent3.children();
      while (divs3.length) {
          parent3.append(
              divs3.splice(Math.floor(Math.random() * divs3.length), 1)[0]
          );
      }
  });
  
  $(function () {
      var parent4 = $('#shuffle4');
      var divs4 = parent4.children();
      while (divs4.length) {
          parent4.append(
              divs4.splice(Math.floor(Math.random() * divs4.length), 1)[0]
          );
      }
  });
  
  $(function () {
      var parent5 = $('#shuffle5');
      var divs5 = parent5.children();
      while (divs5.length) {
          parent5.append(
              divs5.splice(Math.floor(Math.random() * divs5.length), 1)[0]
          );
      }
  });
  
  $(function () {
      var parent6 = $('#shuffle6');
      var divs6 = parent6.children();
      while (divs6.length) {
          parent6.append(
              divs6.splice(Math.floor(Math.random() * divs6.length), 1)[0]
          );
      }
  });
  
  $(function () {
      var parent7 = $('#shuffle7');
      var divs7 = parent7.children();
      while (divs7.length) {
          parent7.append(
              divs7.splice(Math.floor(Math.random() * divs7.length), 1)[0]
          );
      }
  });
  
  $(function () {
      var parent8 = $('#shuffle8');
      var divs8 = parent8.children();
      while (divs8.length) {
          parent8.append(
              divs8.splice(Math.floor(Math.random() * divs8.length), 1)[0]
          );
      }
  });
  
  $(function () {
      var parent9 = $('#shuffle9');
      var divs9 = parent9.children();
      while (divs9.length) {
          parent9.append(
              divs9.splice(Math.floor(Math.random() * divs9.length), 1)[0]
          );
      }
  });
  
  $(function () {
      var parent10 = $('#shuffle10');
      var divs10 = parent10.children();
      while (divs10.length) {
          parent10.append(
              divs10.splice(Math.floor(Math.random() * divs10.length), 1)[0]
          );
      }
  });
  
  $(function () {
      var parent11 = $('#shuffle11');
      var divs11 = parent11.children();
      while (divs11.length) {
          parent11.append(
              divs11.splice(Math.floor(Math.random() * divs11.length), 1)[0]
          );
      }
  });
  
  $(function () {
      var parent12 = $('#shuffle12');
      var divs12 = parent12.children();
      while (divs12.length) {
          parent12.append(
              divs12.splice(Math.floor(Math.random() * divs12.length), 1)[0]
          );
      }
  });
  
  $('#taskButton1').click(function () {
      $('#taskButton1').addClass('taskButtonActive');
      $(
          '#taskButton2, #taskButton3, #taskButton4, #taskButton5, #taskButton6, #taskButton7, #taskButton8, #taskButton9, #taskButton10, #taskButton11, #taskButton12'
      ).removeClass('taskButtonActive');
      var audio = $('#openTask')[0];
      audio.play();
  });
  
  $('#taskButton2').click(function () {
      $('#taskButton2').addClass('taskButtonActive');
      $(
          '#taskButton1, #taskButton3, #taskButton4, #taskButton5, #taskButton6, #taskButton7, #taskButton8, #taskButton9, #taskButton10, #taskButton11, #taskButton12'
      ).removeClass('taskButtonActive');
      var audio = $('#openTask')[0];
      audio.play();
  });
  
  $('#taskButton3').click(function () {
      $('#taskButton3').addClass('taskButtonActive');
      $(
          '#taskButton1, #taskButton2, #taskButton4, #taskButton5, #taskButton6, #taskButton7, #taskButton8, #taskButton9, #taskButton10, #taskButton11, #taskButton12'
      ).removeClass('taskButtonActive');
      var audio = $('#openTask')[0];
      audio.play();
  });
  
  $('#taskButton4').click(function () {
      $('#taskButton4').addClass('taskButtonActive');
      $(
          '#taskButton1, #taskButton2, #taskButton3, #taskButton5, #taskButton6, #taskButton7, #taskButton8, #taskButton9, #taskButton10, #taskButton11, #taskButton12'
      ).removeClass('taskButtonActive');
      var audio = $('#openTask')[0];
      audio.play();
  });
  
  $('#taskButton5').click(function () {
      $('#taskButton5').addClass('taskButtonActive');
      $(
          '#taskButton1, #taskButton2, #taskButton3, #taskButton4, #taskButton6, #taskButton7, #taskButton8, #taskButton9, #taskButton10, #taskButton11, #taskButton12'
      ).removeClass('taskButtonActive');
      var audio = $('#openTask')[0];
      audio.play();
  });
  
  $('#taskButton6').click(function () {
      $('#taskButton6').addClass('taskButtonActive');
      $(
          '#taskButton1, #taskButton2, #taskButton3, #taskButton4, #taskButton5, #taskButton7, #taskButton8, #taskButton9, #taskButton10, #taskButton11, #taskButton12'
      ).removeClass('taskButtonActive');
      var audio = $('#openTask')[0];
      audio.play();
  });
  
  $('#taskButton7').click(function () {
      $('#taskButton7').addClass('taskButtonActive');
      $(
          '#taskButton1, #taskButton2, #taskButton3, #taskButton4, #taskButton5, #taskButton6, #taskButton8, #taskButton9, #taskButton10, #taskButton11, #taskButton12'
      ).removeClass('taskButtonActive');
      var audio = $('#openTask')[0];
      audio.play();
  });
  
  $('#taskButton8').click(function () {
      $('#taskButton8').addClass('taskButtonActive');
      $(
          '#taskButton1, #taskButton2, #taskButton3, #taskButton4, #taskButton5, #taskButton6, #taskButton7, #taskButton9, #taskButton10, #taskButton11, #taskButton12'
      ).removeClass('taskButtonActive');
      var audio = $('#openTask')[0];
      audio.play();
  });
  
  $('#taskButton9').click(function () {
      $('#taskButton9').addClass('taskButtonActive');
      $(
          '#taskButton1, #taskButton2, #taskButton3, #taskButton4, #taskButton5, #taskButton6, #taskButton7, #taskButton8, #taskButton10, #taskButton11, #taskButton12'
      ).removeClass('taskButtonActive');
      var audio = $('#openTask')[0];
      audio.play();
  });
  
  $('#taskButton10').click(function () {
      $('#taskButton10').addClass('taskButtonActive');
      $(
          '#taskButton1, #taskButton2, #taskButton3, #taskButton4, #taskButton5, #taskButton6, #taskButton7, #taskButton8, #taskButton9, #taskButton11, #taskButton12'
      ).removeClass('taskButtonActive');
      var audio = $('#openTask')[0];
      audio.play();
  });
  
  $('#taskButton11').click(function () {
      $('#taskButton11').addClass('taskButtonActive');
      $(
          '#taskButton1, #taskButton2, #taskButton3, #taskButton4, #taskButton5, #taskButton6, #taskButton7, #taskButton8, #taskButton9, #taskButton10, #taskButton12'
      ).removeClass('taskButtonActive');
      var audio = $('#openTask')[0];
      audio.play();
  });
  
  $('#taskButton12').click(function () {
      $('#taskButton12').addClass('taskButtonActive');
      $(
          '#taskButton1, #taskButton2, #taskButton3, #taskButton4, #taskButton5, #taskButton6, #taskButton7, #taskButton8, #taskButton9, #taskButton10, #taskButton11'
      ).removeClass('taskButtonActive');
      var audio = $('#openTask')[0];
      audio.play();
  });
  
  $('#nie1_1').click(function () {
      $('#nie1_1').fadeTo('slow', 0.5).removeClass('cp');
      var audio = $('#error')[0];
      audio.play();
  });
  
  $('#nie1_2').click(function () {
      $('#nie1_2').fadeTo('slow', 0.5).removeClass('cp');
      var audio = $('#error')[0];
      audio.play();
  });
  
  $('#nie1_3').click(function () {
      $('#nie1_3').fadeTo('slow', 0.5).removeClass('cp');
      var audio = $('#error')[0];
      audio.play();
  });
  
  $('#tak1_1').click(function () {
      $('#nie1_1').fadeTo('slow', 0.5).removeClass('cp');
      $('#nie1_2').fadeTo('slow', 0.5).removeClass('cp');
      $('#nie1_3').fadeTo('slow', 0.5).removeClass('cp');
      $('#word1').attr('src', img1Correct.src).addClass('animated rotateIn');
      $('#tak1_1').addClass('correctButton');
      $('#taskButton1').attr('src', 'https://www.anglomaniacy.pl/img/a-one.png');
      var audio = $('#sound_one')[0];
      audio.play();
  });
  
  $('#nie2_1').click(function () {
      $('#nie2_1').fadeTo('slow', 0.5).removeClass('cp');
      var audio = $('#error')[0];
      audio.play();
  });
  
  $('#nie2_2').click(function () {
      $('#nie2_2').fadeTo('slow', 0.5).removeClass('cp');
      var audio = $('#error')[0];
      audio.play();
  });
  
  $('#nie2_3').click(function () {
      $('#nie2_3').fadeTo('slow', 0.5).removeClass('cp');
      var audio = $('#error')[0];
      audio.play();
  });
  
  $('#tak2_1').click(function () {
      $('#nie2_1').fadeTo('slow', 0.5).removeClass('cp');
      $('#nie2_2').fadeTo('slow', 0.5).removeClass('cp');
      $('#nie2_3').fadeTo('slow', 0.5).removeClass('cp');
      $('#word2').attr('src', img2Correct.src).addClass('animated rotateIn');
      $('#tak2_1').addClass('correctButton');
      $('#taskButton2').attr('src', 'https://www.anglomaniacy.pl/img/a-two.png');
      var audio = $('#sound_two')[0];
      audio.play();
  });
  $('#nie3_1').click(function () {
      $('#nie3_1').fadeTo('slow', 0.5).removeClass('cp');
      var audio = $('#error')[0];
      audio.play();
  });
  
  $('#nie3_2').click(function () {
      $('#nie3_2').fadeTo('slow', 0.5).removeClass('cp');
      var audio = $('#error')[0];
      audio.play();
  });
  
  $('#nie3_3').click(function () {
      $('#nie3_3').fadeTo('slow', 0.5).removeClass('cp');
      var audio = $('#error')[0];
      audio.play();
  });
  
  $('#tak3_1').click(function () {
      $('#nie3_1').fadeTo('slow', 0.5).removeClass('cp');
      $('#nie3_2').fadeTo('slow', 0.5).removeClass('cp');
      $('#nie3_3').fadeTo('slow', 0.5).removeClass('cp');
      $('#word3').attr('src', img3Correct.src).addClass('animated rotateIn');
      $('#tak3_1').addClass('correctButton');
      $('#taskButton3').attr('src', 'https://www.anglomaniacy.pl/img/a-three.png');
      var audio = $('#sound_three')[0];
      audio.play();
  });
  
  $('#nie4_1').click(function () {
      $('#nie4_1').fadeTo('slow', 0.5).removeClass('cp');
      var audio = $('#error')[0];
      audio.play();
  });
  
  $('#nie4_2').click(function () {
      $('#nie4_2').fadeTo('slow', 0.5).removeClass('cp');
      var audio = $('#error')[0];
      audio.play();
  });
  
  $('#nie4_3').click(function () {
      $('#nie4_3').fadeTo('slow', 0.5).removeClass('cp');
      var audio = $('#error')[0];
      audio.play();
  });
  
  $('#tak4_1').click(function () {
      $('#nie4_1').fadeTo('slow', 0.5).removeClass('cp');
      $('#nie4_2').fadeTo('slow', 0.5).removeClass('cp');
      $('#nie4_3').fadeTo('slow', 0.5).removeClass('cp');
      $('#word4').attr('src', img4Correct.src).addClass('animated rotateIn');
      $('#tak4_1').addClass('correctButton');
      $('#taskButton4').attr('src', 'https://www.anglomaniacy.pl/img/a-four.png');
      var audio = $('#sound_four')[0];
      audio.play();
  });
  
  $('#nie5_1').click(function () {
      $('#nie5_1').fadeTo('slow', 0.5).removeClass('cp');
      var audio = $('#error')[0];
      audio.play();
  });
  
  $('#nie5_2').click(function () {
      $('#nie5_2').fadeTo('slow', 0.5).removeClass('cp');
      var audio = $('#error')[0];
      audio.play();
  });
  
  $('#nie5_3').click(function () {
      $('#nie5_3').fadeTo('slow', 0.5).removeClass('cp');
      var audio = $('#error')[0];
      audio.play();
  });
  
  $('#tak5_1').click(function () {
      $('#nie5_1').fadeTo('slow', 0.5).removeClass('cp');
      $('#nie5_2').fadeTo('slow', 0.5).removeClass('cp');
      $('#nie5_3').fadeTo('slow', 0.5).removeClass('cp');
      $('#word5').attr('src', img5Correct.src).addClass('animated rotateIn');
      $('#tak5_1').addClass('correctButton');
      $('#taskButton5').attr('src', 'https://www.anglomaniacy.pl/img/a-five.png');
      var audio = $('#sound_five')[0];
      audio.play();
  });
  
  $('#nie6_1').click(function () {
      $('#nie6_1').fadeTo('slow', 0.5).removeClass('cp');
      var audio = $('#error')[0];
      audio.play();
  });
  
  $('#nie6_2').click(function () {
      $('#nie6_2').fadeTo('slow', 0.5).removeClass('cp');
      var audio = $('#error')[0];
      audio.play();
  });
  
  $('#nie6_3').click(function () {
      $('#nie6_3').fadeTo('slow', 0.5).removeClass('cp');
      var audio = $('#error')[0];
      audio.play();
  });
  
  $('#tak6_1').click(function () {
      $('#nie6_1').fadeTo('slow', 0.5).removeClass('cp');
      $('#nie6_2').fadeTo('slow', 0.5).removeClass('cp');
      $('#nie6_3').fadeTo('slow', 0.5).removeClass('cp');
      $('#word6').attr('src', img6Correct.src).addClass('animated rotateIn');
      $('#tak6_1').addClass('correctButton');
      $('#taskButton6').attr('src', 'https://www.anglomaniacy.pl/img/a-six.png');
      var audio = $('#sound_six')[0];
      audio.play();
  });
  
  $('#nie7_1').click(function () {
      $('#nie7_1').fadeTo('slow', 0.5).removeClass('cp');
      var audio = $('#error')[0];
      audio.play();
  });
  
  $('#nie7_2').click(function () {
      $('#nie7_2').fadeTo('slow', 0.5).removeClass('cp');
      var audio = $('#error')[0];
      audio.play();
  });
  
  $('#nie7_3').click(function () {
      $('#nie7_3').fadeTo('slow', 0.5).removeClass('cp');
      var audio = $('#error')[0];
      audio.play();
  });
  
  $('#tak7_1').click(function () {
      $('#nie7_1').fadeTo('slow', 0.5).removeClass('cp');
      $('#nie7_2').fadeTo('slow', 0.5).removeClass('cp');
      $('#nie7_3').fadeTo('slow', 0.5).removeClass('cp');
      $('#word7').attr('src', img7Correct.src).addClass('animated rotateIn');
      $('#tak7_1').addClass('correctButton');
      $('#taskButton7').attr('src', 'https://www.anglomaniacy.pl/img/a-seven.png');
      var audio = $('#sound_seven')[0];
      audio.play();
  });
  
  $('#nie8_1').click(function () {
      $('#nie8_1').fadeTo('slow', 0.5).removeClass('cp');
      var audio = $('#error')[0];
      audio.play();
  });
  
  $('#nie8_2').click(function () {
      $('#nie8_2').fadeTo('slow', 0.5).removeClass('cp');
      var audio = $('#error')[0];
      audio.play();
  });
  
  $('#nie8_3').click(function () {
      $('#nie8_3').fadeTo('slow', 0.5).removeClass('cp');
      var audio = $('#error')[0];
      audio.play();
  });
  
  $('#tak8_1').click(function () {
      $('#nie8_1').fadeTo('slow', 0.5).removeClass('cp');
      $('#nie8_2').fadeTo('slow', 0.5).removeClass('cp');
      $('#nie8_3').fadeTo('slow', 0.5).removeClass('cp');
      $('#word8').attr('src', img8Correct.src).addClass('animated rotateIn');
      $('#tak8_1').addClass('correctButton');
      $('#taskButton8').attr('src', 'https://www.anglomaniacy.pl/img/a-eight.png');
      var audio = $('#sound_eight')[0];
      audio.play();
  });
  
  $('#nie9_1').click(function () {
      $('#nie9_1').fadeTo('slow', 0.5).removeClass('cp');
      var audio = $('#error')[0];
      audio.play();
  });
  
  $('#nie9_2').click(function () {
      $('#nie9_2').fadeTo('slow', 0.5).removeClass('cp');
      var audio = $('#error')[0];
      audio.play();
  });
  
  $('#nie9_3').click(function () {
      $('#nie9_3').fadeTo('slow', 0.5).removeClass('cp');
      var audio = $('#error')[0];
      audio.play();
  });
  
  $('#tak9_1').click(function () {
      $('#nie9_1').fadeTo('slow', 0.5).removeClass('cp');
      $('#nie9_2').fadeTo('slow', 0.5).removeClass('cp');
      $('#nie9_3').fadeTo('slow', 0.5).removeClass('cp');
      $('#word9').attr('src', img9Correct.src).addClass('animated rotateIn');
      $('#tak9_1').addClass('correctButton');
      $('#taskButton9').attr('src', 'https://www.anglomaniacy.pl/img/a-nine.png');
      var audio = $('#sound_nine')[0];
      audio.play();
  });
  
  $('#nie10_1').click(function () {
      $('#nie10_1').fadeTo('slow', 0.5).removeClass('cp');
      var audio = $('#error')[0];
      audio.play();
  });
  
  $('#nie10_2').click(function () {
      $('#nie10_2').fadeTo('slow', 0.5).removeClass('cp');
      var audio = $('#error')[0];
      audio.play();
  });
  
  $('#nie10_3').click(function () {
      $('#nie10_3').fadeTo('slow', 0.5).removeClass('cp');
      var audio = $('#error')[0];
      audio.play();
  });
  
  $('#tak10_1').click(function () {
      $('#nie10_1').fadeTo('slow', 0.5).removeClass('cp');
      $('#nie10_2').fadeTo('slow', 0.5).removeClass('cp');
      $('#nie10_3').fadeTo('slow', 0.5).removeClass('cp');
      $('#word10').attr('src', img10Correct.src).addClass('animated rotateIn');
      $('#tak10_1').addClass('correctButton');
      $('#taskButton10').attr('src', 'https://www.anglomaniacy.pl/img/a-ten.png');
      var audio = $('#sound_ten')[0];
      audio.play();
  });
  
  $('#nie11_1').click(function () {
      $('#nie11_1').fadeTo('slow', 0.5).removeClass('cp');
      var audio = $('#error')[0];
      audio.play();
  });
  
  $('#nie11_2').click(function () {
      $('#nie11_2').fadeTo('slow', 0.5).removeClass('cp');
      var audio = $('#error')[0];
      audio.play();
  });
  
  $('#nie11_3').click(function () {
      $('#nie11_3').fadeTo('slow', 0.5).removeClass('cp');
      var audio = $('#error')[0];
      audio.play();
  });
  
  $('#tak11_1').click(function () {
      $('#nie11_1').fadeTo('slow', 0.5).removeClass('cp');
      $('#nie11_2').fadeTo('slow', 0.5).removeClass('cp');
      $('#nie11_3').fadeTo('slow', 0.5).removeClass('cp');
      $('#word11').attr('src', img11Correct.src).addClass('animated rotateIn');
      $('#tak11_1').addClass('correctButton');
      $('#taskButton11').attr('src', 'https://www.anglomaniacy.pl/img/a-eleven.png');
      var audio = $('#sound_eleven')[0];
      audio.play();
  });
  
  $('#nie12_1').click(function () {
      $('#nie12_1').fadeTo('slow', 0.5).removeClass('cp');
      var audio = $('#error')[0];
      audio.play();
  });
  
  $('#nie12_2').click(function () {
      $('#nie12_2').fadeTo('slow', 0.5).removeClass('cp');
      var audio = $('#error')[0];
      audio.play();
  });
  
  $('#nie12_3').click(function () {
      $('#nie12_3').fadeTo('slow', 0.5).removeClass('cp');
      var audio = $('#error')[0];
      audio.play();
  });
  
  $('#tak12_1').click(function () {
      $('#nie12_1').fadeTo('slow', 0.5).removeClass('cp');
      $('#nie12_2').fadeTo('slow', 0.5).removeClass('cp');
      $('#nie12_3').fadeTo('slow', 0.5).removeClass('cp');
      $('#word12').attr('src', img12Correct.src).addClass('animated rotateIn');
      $('#tak12_1').addClass('correctButton');
      $('#taskButton12').attr('src', 'https://www.anglomaniacy.pl/img/a-twelve.png');
      var audio = $('#sound_twelve')[0];
      audio.play();
  });
  })