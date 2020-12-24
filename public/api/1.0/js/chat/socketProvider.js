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
            
                say_no(data)
            });

            io.on("reply_yes", function (data) {
                say_yes(data)
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