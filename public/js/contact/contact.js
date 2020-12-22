if (localStorage.getItem("token")) {
  axios.get("/api/1.0/chat", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer" + " " + localStorage.getItem("token")
      }
    })
    .then(res => {})

    .catch(err => {
      swal('尚未登入')
    setTimeout(function () {
      window.location.href = "/login.html"
    }, 2000)
    });

   } else {
    swal('尚未登入')
    setTimeout(function () {
      window.location.href = "/login.html"
    }, 2000)
  
  }


  let company = window.localStorage.getItem('company')
  let nickname = window.localStorage.getItem('id')
  document.getElementById('companyname').innerHTML = company
  document.getElementById('username').innerHTML = "Hi，" + nickname

  function ask(event) {
    event.preventDefault()
    let message = document.getElementById('askquestion').value

    axios.post("/api/1.0/question", {
        company: company,
        nickname: nickname,
        question: message

      })
      .then(res => {
        swal("Good job! 已成功送出問題", "敬請期待", "success");
        setTimeout((() => window.location.href = "/index.html"), 3000)
      })
      .catch(err => {
        console.log(err, err.response);
      });



  }