function comment_extract(response, username) {
    let talker=[]
    for (let i = 0; i < response.data.length; i++) {
        if (response.data[i].sender == username) {
            console.log('ok')
            if(talker.indexOf(response.data[i].receiver)<0){
            talker.push(response.data[i].receiver)
            $('<li class="contact"><div class="wrap"><img src="https://zoesandbox.s3-ap-southeast-1.amazonaws.com/img/fox.png" alt="" /><div class="meta"><p class="name">' + response.data[i].receiver + '</p><p class="company">'+'廣達電腦股份有限公司' +'</p><p class="preview">' + response.data[i].message + '</p></div></div></li>').appendTo($('#contacts ul'));
            }
        } else {
            if(talker.indexOf(response.data[i].sender)<0){
            talker.push(response.data[i].sender)
            console.log('yes')
              $('<li class="contact"><div class="wrap"><img src="https://zoesandbox.s3-ap-southeast-1.amazonaws.com/img/fox.png" alt="" /><div class="meta"><p class="name">' + response.data[i].sender + '</p><p class="company">'+ '廣達電腦股份有限公司' + '</p><p class="preview">' + response.data[i].message + '</p></div></div></li>').appendTo($('#contacts ul'));
        
            }
    }
}
}

axios.get("/api/1.0/chat", {
    headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer" + " " + localStorage.getItem("token")
    }
})
.then(res => {