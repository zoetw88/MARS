

let sender = '';

userToken = localStorage.getItem('token');
if (userToken != null || userToken != undefined) {
  console.log('yes');
  axios.get('/api/1.0/chat', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer' + ' ' + localStorage.getItem('token'),
    },
  })

      .then((res) => {
        if (res.data.name == 'JsonWebTokenError') {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: '你尚未正式踏入火星領地!',
          }).then(() => {
            window.location.href = '/login.html';
          });
        };

        sender = res.data.nickname;
        picture = res.data.picture;

        $('#profile').find('p').text(sender);

        $('#profile-img').attr('src', picture);
        io = io()

        io.emit('hello',{message:'thanks'})
        io.on('thanks',function(data){
          console.log(data)
        })
        io.on('offline', function(data) {
          const check = document.querySelectorAll('.username');
          check.forEach(function(item) {
            for (i = 0; i < data.onlineuser.length; i++) {
              if (item.textContent != data.onlineuser[i]) {
                const status = item.nextSibling;
                status.classList.remove('online');
              }
            }
          });
        });


        io.on('online', function(data) {
          const check = document.querySelectorAll('.username');
          check.forEach(function(item) {
            for (i = 0; i < data.onlineuser.length; i++) {
              if (item.textContent == data.onlineuser[i]) {
                const status = item.nextSibling;
                status.classList.add('online');
              }
            }
          });
        });
        io.emit('getMessages', {
          username: sender,
        });
        io.on('loadMessages', function(data) {
          organizeTalk(data.messages, sender);
          organizeTalker(data.side_messages, sender);

          const check = document.querySelectorAll('.username');
          check.forEach(function(item) {
            for (i = 0; i < data.onlineuser.length; i++) {
              if (item.textContent == data.onlineuser[i]) {
                const status = item.nextSibling;
                status.classList.add('online');
              }
            }
          });
        });
        io.on('reloadMessages', function(data) {
          organizeTalk(data.messages, sender);
        });
        io.on('reply_editor', function(data) {
          askCollaborate(data);
        });
        io.on('editor_alone', function(data) {
          edit_alone(data)
        });
        io.on('reply_no', function(data) {
          say_no(data)
        });

        io.on('reply_yes', function(data) {
          say_yes(data);
        });
        io.on('new_message', function(data) {
          $('<li class="sent"><img src=' + data.sender_picture + '><p>' + data.message + '</p></li>').appendTo($('.messages ul'));
        });


        $(document).on('click', '.contact', function() {
          $('.contact.active').removeClass('active');
          $(this).addClass('active');
          $('li').remove('.sent');
          $('li').remove('.replies');

          const chosenName = $(this).find('.name').text();

          io.emit('selectMessages', {
            chosenName: chosenName,
            sender: sender,
          });
        });

        $('.submit').on('click', function() {
          newMessages();
        });

        $('.editor').on('click', function() {
          editor();
        });

        $('.messages').animate({
          scrollTop: $(document).height(),
        }, 'fast');


        $(window).on('keydown', function(e) {
          if (e.which == 13) {
            newMessages();
            return false;
          }
        });
      })
      .catch((error) => {
        console.log(error.response);


        return error;
      });
} else {
  swal.fire('尚未登入');
  setTimeout(function() {
    window.location.href = '/login.html';
  }, 2000);
}
