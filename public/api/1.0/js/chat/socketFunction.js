function organizeTalk(response, username) {
    for (let i = 0; i < response.length; i++) {
        if (response[i].sender == username) {
            localStorage.setItem('talker', response[i].receiver);
            $('.receiver-company').find("p").text(response[i].receivercompany)
            $('.receiver').find("p").text(response[i].receiver)
            $('<li class="sent"><p>' + response[i].message + '</p></li>').appendTo($('.messages ul'));
        } else {
            $('.receiver-company').find("p").text(response[i].sendercompany)
            $('.receiver').find("p").text(response[i].sender)
            $('<li class="replies"><p>' + response[i].message + '</p></li>').appendTo($('.messages ul'));
        }
    }

}

function organizeTalker(response, username) {
    let talker = []
    for (let i = 0; i < response.length; i++) {
        if (response[i].sender == username) {
            if (talker.indexOf(response[i].receiver) < 0) {
                talker.push(response[i].receiver)
                $('<li class="contact"><div class="wrap"><div class="meta"><p class="name">' + response[i].receiver + '</p>\
                <p class="company">' + response[i].receivercompany + '</p><p class="preview">' + response[i].message + '</p></div></div></li>').appendTo($('#contacts ul'));
            }
        } else {
            if (talker.indexOf(response[i].sender) < 0) {
                talker.push(response[i].sender)
                $('<li class="contact"><div class="wrap"><div class="meta"><p class="name">' + response[i].sender + '</p>\
                <p class="company">' + response[i].sendercompany + '</p><p class="preview">' + response[i].message + '</p></div></div></li>').appendTo($('#contacts ul'));

            }
        }
    }
}

function newMessages() {
    receiver = $('.active').find('.name').text();
    if (receiver == "") {
        return false
    }

    message = $(".message-input input").val();
    if ($.trim(message) == '') {
        return false;
    }
    $('<li class="sent"><p>' + message + '</p></li>').appendTo($('.messages ul'));
    $('.message-input input').val(null);
    $('.contact.active .preview').html('<span>You: </span>' + message);
    $('.messages').stop().animate({
        scrollTop: $('.messages')[0].scrollHeight
    });
    io.emit("send_message", {
        sender: sender,
        receiver: receiver,
        message: message
    });

}

async function askCollaborate(data) {
    swal.fire({
        title: `你想要和${data.info.sender}一起共同編輯嗎?`,
        icon:'question',
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '當然好!',
        cancelButtonText: '現在沒空',
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',
        buttonsStyling: false
    }).then((result) => {
        if (result.isConfirmed) {
            room = data.info.sender + data.info.receiver
            Swal.fire({
                icon: 'info',
                title: "請點開通往共同編輯的大門",
                html: `<a target='_blank' href=http://localhost:5000/api/1.0/editor?room=${room}&id=${data.info.sender}><b>傳送門</b></a>`,
                width: 600,
                padding: '3em',
                background: '#fff url(/images/trees.png)',
                backdrop: `
                rgba(0,0,123,0.4)
                url("https://zoesandbox.s3-ap-southeast-1.amazonaws.com/img/nyan-cat.gif")
                top left
                no-repeat`
            })
            io.emit("yes_collaborate", {
                receiver: data.info.receiver,
                sender: data.info.sender,
                room: room
            })

        } else if (result.isDenied) {
            swal.fire(`${data.info.sender}已哭哭!`);

            io.emit("no_collaborate", {
                receiver: data.info.receiver,
                sender: data.info.sender
            })
        }
    })

}

function editor() {
    receiver = $('.active').find('.name').text();
    if (receiver == "") {
        return false
    }
    io.emit("ask_to_editor", {
        receiver: receiver,
        sender: sender,
        message: '是否願意共同協作'
    })
};

function say_yes(){

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
        no-repeat`
    })
}


function say_no(){

    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `${data.sender}義正嚴辭地拒絕和你協作!`,
    })
}