

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
            sender='zoe'
            
            function organize_talk(response,username){
                for(let i =0;i<response.data.length;i++){
                    if(response.data[i].sender==username){
                        $('<li class="sent"><img src="https://zoesandbox.s3-ap-southeast-1.amazonaws.com/img/1604398861214-orange.jpg" alt="" /><p>' +response.data[i].message + '</p></li>').appendTo($('.messages ul'));
                    }else{
                        $('<li class="replies"><img src="https://zoesandbox.s3-ap-southeast-1.amazonaws.com/img/1604398861214-orange.jpg" alt="" /><p>' + response.data[i].message + '</p></li>').appendTo($('.messages ul'));
                    }
                }
                    
            }
            function organize_talker(response,username){
                $('<li class="contact active"><div class="wrap"><span class="contact-status online"></span><img src="https://zoesandbox.s3-ap-southeast-1.amazonaws.com/img/1604398861214-orange.jpg" alt="" /><div class="meta"><p class="name">' +response.data[0].receiver + '</p><p class="preview">' +response.data[0].message + '</p></div></div></li>').appendTo($('#contacts ul'));
                for(let i =1;i<response.data.length;i++){
                    
                        
                      
                    if(response.data[i].sender==username){
                        console.log('ok')
                        $('<li class="contact"><div class="wrap"><span class="contact-status online"></span><img src="https://zoesandbox.s3-ap-southeast-1.amazonaws.com/img/1604398861214-orange.jpg" alt="" /><div class="meta"><p class="name">' +response.data[i].receiver + '</p><p class="preview">' +response.data[i].message + '</p></div></div></li>').appendTo($('#contacts ul'));
                    }else{
                        console.log('yes')
                        $('<li class="contact"><div class="wrap"><span class="contact-status online"></span><img src="https://zoesandbox.s3-ap-southeast-1.amazonaws.com/img/1604398861214-orange.jpg" alt="" /><div class="meta"><p class="name">' +response.data[i].sender + '</p><p class="preview">' +response.data[i].message + '</p></div></div></li>').appendTo($('#contacts ul'));
                    }
                }
                    
            }
            function getSideMessage(username) {
                axios.post(`http://localhost:5000/get_side_messages`,{username:username})
                    .then((response) => {
                        console.log(response)
                        organize_talker(response,username)
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
                axios.post(`http://localhost:5000/get_main_messages`,{username:username})
                    .then((response) => {
                        console.log(response)
                        organize_talk(response,username)
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

            
            getMainMessage(sender)
            getSideMessage(sender)
            function onUserSelected(chosenName,username) {
                axios.post(`http://localhost:5000/get_select_messages`,{username:username,chosenName:chosenName})
                .then((response) => {
                    console.log(response)
                    organize_talk(response,username)
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
          

            function newMessage() {
               
                receiver = $('.active').find('.name').text();
                console.log(receiver)
                message = $(".message-input input").val();
                if ($.trim(message) == '') {
                    return false;
                }
                $('<li class="sent"><img src="https://zoesandbox.s3-ap-southeast-1.amazonaws.com/img/1604398861214-orange.jpg" alt="" /><p>' + message + '</p></li>').appendTo($('.messages ul'));
                $('.message-input input').val(null);
                $('.contact.active .preview').html('<span>You: </span>' + message);
                $(".messages").animate({
                    scrollTop: $(document).height()
                }, "fast");

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