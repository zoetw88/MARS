let receiver = "";
let sender = "";


if (localStorage.getItem("token")) {
    axios.get("/api/1.0/contact", {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer" + " " + localStorage.getItem("token")
            }
        })
        .then(res => {
        
            sender = res.data.data.email
            io = io('http://localhost:5000', {
                query: {
                    id: sender
                }
            
            })
            $('#profile').find('p').text(sender)
            io.on("user_connected", function (sender) {
                console.log(sender)
            });

            function onUserSelected(username) {
                event.preventDefault();
                receiver  = username;
                axios.post(`http://localhost:5000/get_messages`)
                    .then((response) => {
                        
                    })
                    .catch((error) => {
                        console.log(error)
                        if (!error.response) {
                            // network error
                        } else {
                            // http status code
                            const code = error.response.status
                            // response data
                            const response = error.response.data
                            console.loge(code)
                            console.log(response)
                        }
                    })
            }
            $(".contact").click(function() {
                $(".contact.active").removeClass("active");
                $(this).addClass('active');
                onUserSelected()
              });
           
            function newMessage() {
                event.preventDefault();
                receiver =$('.active').find('.name').text();
                console.log(receiver)
                message = $(".message-input input").val();
                if($.trim(message) == '') {
                    return false;
                }
                $('<li class="sent"><img src="https://zoesandbox.s3-ap-southeast-1.amazonaws.com/img/1604398861214-orange.jpg" alt="" /><p>' + message + '</p></li>').appendTo($('.messages ul'));
                $('.message-input input').val(null);
                $('.contact.active .preview').html('<span>You: </span>' + message);
                $(".messages").animate({ scrollTop: $(document).height() }, "fast");
               
                io.emit("send_message", {
                    sender: sender,
                    receiver:receiver,
                    message: message
                });
                // var html = "";
                // html += "<li>You said: " + message + "</li>";
                // document.getElementById("write_msg").innerHTML += html;
                // return false;
            }
            $('.submit').click(function() {
                newMessage();
              });
            io.on("new_message", function (data) {
                $('<li class="replies"><img src="https://zoesandbox.s3-ap-southeast-1.amazonaws.com/img/1604398861214-orange.jpg" alt="" /><p>' + message + '</p></li>').appendTo($('.messages ul'));
            });

        })
        .catch(err => {
            console.log(err, err.response);
        });
} else {
    alert('尚未登入')
    window.location.href = "/login.html";
}