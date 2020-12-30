function organizeTalk(response, username) {
  for (let i = 0; i < response.length; i++) {
    if (response[i].sender != username) {
      localStorage.setItem('talker', response[i].receiver);
      $('.receiver-company').find('p').text(response[i].receiver_company);
      $('.receiver').find('p').text(response[i].receiver);
      $('<li class="sent"><img src='+response[i].sender_picture+'><p>' + response[i].message + '</p></li>').appendTo($('.messages ul'));
    } else {
      $('.receiver-company').find('p').text(response[i].sender_company);
      $('.receiver').find('p').text(response[i].sender);
      $('<li class="replies"><img src='+response[i].sender_picture+'><p>' + response[i].message + '</p></li>').appendTo($('.messages ul'));
    }
  }
}
let talker = [];
function organizeTalker(response, username) {
  for (let i = 0; i < response.length; i++) {
    if (response[i].sender == username) {
      if (talker.indexOf(response[i].receiver) < 0) {
        talker.push(response[i].receiver);
        $('<li class="contact"><div class="wrap">\
                <img src='+response[i].receiver_picture+'  ><div class="meta contact-name"  id="talkername"><p class="name username" >' + response[i].receiver + '</p><span class="contact-status"></span>\
                <p class="company">' + response[i].receiver_company + '</p><p class="preview">' + response[i].message + '</p></div></div></li>').appendTo($('#contacts ul'));
      }
    } else {
      if (talker.indexOf(response[i].sender) < 0) {
        talker.push(response[i].sender);
        $('<li class="contact"><div class="wrap">\
                <img src="'+response[i].sender_picture+'"><div class="meta contact-name"  id="talkername"><p class="name username" >' + response[i].sender + '</p><span class="contact-status"></span>\
                <p class="company">' + response[i].sender_company + '</p><p class="preview">' + response[i].message + '</p></div></div></li>').appendTo($('#contacts ul'));
      }
    }
  }
}

function newMessages() {
  receiver = $('.active').find('.name').text();
  if (receiver == '') {
    return false;
  }
  user_pic = $('#profile-img').attr('src');
  if (user_pic == '') {
    return false;
  }
  message = $('.message-input input').val();
  if ($.trim(message) == '') {
    return false;
  }
  $('<li class="replies"><img src='+user_pic+'><p>' + message + '</p></li>').appendTo($('.messages ul'));
  $('.message-input input').val(null);
  $('.contact.active .preview').html('<span>You: </span>' + message);
  $('.messages').stop().animate({
    scrollTop: $('.messages')[0].scrollHeight,
  });
  io.emit('send_message', {
    sender: sender,
    receiver: receiver,
    message: message,
    sender_picture: user_pic,
  });
}


async function askCollaborate(data) {
  swal.fire({
    title: `你想要和${data.info.sender}一起使用\r\n線上白板嗎?`,
    icon: 'question',
    showDenyButton: true,

    confirmButtonColor: '#3085d6',
    denyButtonColor: '#d33',
    confirmButtonText: '當然好!',
    denyButtonText: '現在沒空',
  }).then((result) => {
    if (result.isConfirmed) {
      room = data.info.sender + data.info.receiver;
      Swal.fire({
        icon: 'info',
        title: '請點開通往線上白板的大門',
        html: `<a target='_blank' href=http://localhost:5000/api/1.0/editor?room=${room}&id=${data.info.sender}><b>傳送門</b></a>`,
        width: 600,
        padding: '3em',
        background: '#fff url(/images/trees.png)',
        backdrop: `
                rgba(0,0,123,0.4)
                url("https://zoesandbox.s3-ap-southeast-1.amazonaws.com/img/nyan-cat.gif")
                top left
                no-repeat`,
      });
      io.emit('yes_collaborate', {
        receiver: data.info.receiver,
        sender: data.info.sender,
        room: room,
      });
    } else if (result.isDenied) {
      swal.fire(`${data.info.sender}已哭哭!`);

      io.emit('no_collaborate', {
        receiver: data.info.receiver,
        sender: data.info.sender,
      });
    }
  });
}

function editor() {
  receiver = $('.active').find('.name').text();
  if (receiver == '') {
    return false;
  }
  io.emit('ask_to_editor', {
    receiver: receiver,
    sender: sender,
    message: '是否願意使用線上白板討論',
  });
};

function say_yes(data) {
  Swal.fire({
    icon: 'info',
    title: `太棒了${data.sender}接受你的邀請了!`,
    text: `請按下面的傳送門`,
    html: `<a target='_blank' href=http://localhost:5000/api/1.0/editor?room=${data.room}&id=${data.sender}><b>傳送門</b></a>`,
    width: 600,
    padding: '3em',
    background: '#fff url(/images/trees.png)',
    backdrop: `
        rgba(0,0,123,0.4)
        url("https://zoesandbox.s3-ap-southeast-1.amazonaws.com/img/nyan-cat.gif")
        top left
        no-repeat`,
  });
}


function say_no(data) {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: `${data.sender}義正嚴辭地拒絕和你協作!`,
  });
}
