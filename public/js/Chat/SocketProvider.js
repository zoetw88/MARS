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
            sender = res.data.data.nickname
            io = io('http://localhost:5000', {
                query: {
                    id: sender
                }
            })
        
            $('#profile').find('p').text(sender)
            
            function organize_talk(response, username) {
                for (let i = 0; i < response.data.length; i++) {
                    if (response.data[i].sender == username) {
                        $('<li class="sent"><img src="https://zoesandbox.s3-ap-southeast-1.amazonaws.com/img/fox.png" alt="" /><p>' + response.data[i].message + '</p></li>').appendTo($('.messages ul'));
                    } else {
                        $('<li class="replies"><img src="https://zoesandbox.s3-ap-southeast-1.amazonaws.com/img/fox.png" alt="" /><p>' + response.data[i].message + '</p></li>').appendTo($('.messages ul'));
                    }
                }

            }

            function organize_talker(response, username) {
                let talker=[]
                for (let i = 0; i < response.data.length; i++) {
                    if (response.data[i].sender == username) {
                        console.log('ok')
                        if(talker.indexOf(response.data[i].receiver)<0){
                        talker.push(response.data[i].receiver)
                        $('<li class="contact"><div class="wrap"><span class="contact-status online"></span><img src="https://zoesandbox.s3-ap-southeast-1.amazonaws.com/img/fox.png" alt="" /><div class="meta"><p class="name">' + response.data[i].receiver + '</p><p class="preview">' + response.data[i].message + '</p></div></div></li>').appendTo($('#contacts ul'));
                        }
                    } else {
                        if(talker.indexOf(response.data[i].sender)<0){
                        talker.push(response.data[i].sender)
                        console.log('yes')
                          $('<li class="contact"><div class="wrap"><span class="contact-status online"></span><img src="https://zoesandbox.s3-ap-southeast-1.amazonaws.com/img/fox.png" alt="" /><div class="meta"><p class="name">' + response.data[i].sender + '</p><p class="preview">' + response.data[i].message + '</p></div></div></li>').appendTo($('#contacts ul'));
                    
                        }
                }

            }
        }

            function getSideMessage(username) {
                axios.post(`http://localhost:5000/get_side_messages`, {
                        username: username
                    })
                    .then((response) => {
                        console.log(response)
                        organize_talker(response, username)
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

            function getMainMessage(username) {
                axios.post(`http://localhost:5000/get_main_messages`, {
                        username: username
                    })
                    .then((response) => {
                        console.log(response)
                        organize_talk(response, username)
                    })
                    .catch((error) => {
                        console.log(error)
                        window.location.href = "/index.html"
                        if (!error.response) {
                            // network error
                        } else {
                            // http status code
                            const code = error.response.status
                            // response data
                            const response = error.response.data
                            console.log(code)
                            console.log(response)

                        }
                      
                    })


            }


            getMainMessage(sender)
            getSideMessage(sender)

            function onUserSelected(chosenName, username) {
                axios.post(`http://localhost:5000/get_select_messages`, {
                        username: username,
                        chosenName: chosenName
                    })
                    .then((response) => {
                        console.log(response)
                        organize_talk(response, username)
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
                            console.log(code)
                            console.log(response)
                            window.location.href = "/login.html"
                        }
                        window.location.href = "/index.html"
                       
                    })

            }


            $(document).on('click', '.contact', function () {
                $(".contact.active").removeClass("active");
                $(this).addClass('active');
                $( "li" ).remove( ".sent" );
                $( "li" ).remove( ".replies" );
                
                let chosenName = $(this).find('.name').text();

                onUserSelected(chosenName,sender)
            })


            function newMessage() {
                receiver = $('.active').find('.name').text();
                if(receiver==""){
                    return false
                }
                console.log(receiver)
                message = $(".message-input input").val();
                if ($.trim(message) == '') {
                    return false;
                }
                $('<li class="sent"><img src="https://zoesandbox.s3-ap-southeast-1.amazonaws.com/img/fox.png" alt="" /><p>' + message + '</p></li>').appendTo($('.messages ul'));
                $('.message-input input').val(null);
                $('.contact.active .preview').html('<span>You: </span>' + message);
                $('.messages').stop ().animate ({
                    scrollTop: $('.messages')[0].scrollHeight
                  });
                io.emit("send_message", {
                    sender: sender,
                    receiver: receiver,
                    message: message
                });

            }
            $('.submit').click(function () {
                newMessage();
            });
            io.on("new_message", function (data) {
                $('<li class="replies"><img src="https://zoesandbox.s3-ap-southeast-1.amazonaws.com/img/fox.png" alt="" /><p>' + data.message + '</p></li>').appendTo($('.messages ul'));
            });

        })
        .catch(err => {
            console.log(err, err.response);
           
            window.location.href = "/index.html"
        });
} else {
    alert('尚未登入')
    window.location.href = "/login.html";
}
$(".messages").animate({ scrollTop: $(document).height() }, "fast");

$("#profile-img").click(function() {
	$("#status-options").toggleClass("active");
});



$("#status-options ul li").click(function() {
	$("#profile-img").removeClass();
	$("#status-online").removeClass("active");
	$("#status-away").removeClass("active");
	$("#status-busy").removeClass("active");
	$("#status-offline").removeClass("active");
	$(this).addClass("active");
	
	if($("#status-online").hasClass("active")) {
		$("#profile-img").addClass("online");
	} else if ($("#status-away").hasClass("active")) {
		$("#profile-img").addClass("away");
	} else if ($("#status-busy").hasClass("active")) {
		$("#profile-img").addClass("busy");
	} else if ($("#status-offline").hasClass("active")) {
		$("#profile-img").addClass("offline");
	} else {
		$("#profile-img").removeClass();
	};
	
	$("#status-options").removeClass("active");
});


$(window).on('keydown', function(e) {
  if (e.which == 13) {
    newMessage();
    return false;
  }
});