let receiver = "";
let sender = "";

if (localStorage.getItem("token")) {
    axios.get("/api/1.0/chat", {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer" + " " + localStorage.getItem("token")
            }
        })
        .then(res => {
            sender = res.data.nickname

            $('#profile').find('p').text(sender)

            io = io('http://localhost:5000', {
                query: {
                    id: sender
                }
            })

            io.emit("getMessages", {
                username: sender
            })
            io.on("loadMessages", function (data) {
                organizeTalk(data.messages, sender)
                organizeTalker(data.side_messages, sender)
            });
            io.on("reloadMessages", function (data) {
                organizeTalk(data.messages, sender)

            });
            io.on("reply_editor", function (data) {
                askCollaborate(data)
            });

            io.on("reply_no", function (data) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${data.sender}義正嚴辭地拒絕和你協作!`,
                })

            });

            io.on("reply_yes", function (data) {

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

            });
            io.on("new_message", function (data) {
                $('<li class="replies"><p>' + data.message + '</p></li>').appendTo($('.messages ul'));
            });


            $(document).on('click', '.contact', function () {
                $(".contact.active").removeClass("active");
                $(this).addClass('active');
                $("li").remove(".sent");
                $("li").remove(".replies");

                let chosenName = $(this).find('.name').text();

                io.emit("selectMessages", {
                    chosenName: chosenName,
                    sender: sender,
                });
            })

            $('.submit').on('click', function () {
                newMessages();
            });

            $('.editor').on('click', function () {
                editor();
            });

            $(".messages").animate({
                scrollTop: $(document).height()
            }, "fast");


            $(window).on('keydown', function (e) {
                if (e.which == 13) {
                    newMessages();
                    return false;
                }
            });

        })
        .catch(err => {
            console.log(err, err.response);
        });

} else {
    swal("尚未登入")
    setTimeout(function () {
        window.location.href = "/login.html"
    }, 2000)

}