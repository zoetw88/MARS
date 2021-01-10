
if (localStorage.getItem("token")) {
  axios.get("/api/1.0/chat", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer" + " " + localStorage.getItem("token")
      }
    })
    .then(res => {
      if (res.data.name == "JsonWebTokenError") {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: '你尚未正式踏入火星領地!',
        }).then((result) => {
          window.location.href = "/login.html"
        })
      };
    })
    .catch(err => {
      console.log(error.response);
      return error

    })

} else {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: '你尚未正式踏入火星領地!',
  }).then((result) => {
    window.location.href = '/login.html';
  });
}


const company = window.localStorage.getItem('company');
const nickname = window.localStorage.getItem('id');
document.getElementById('companyname').innerHTML = company;
document.getElementById('username').innerHTML = 'Hi，' + nickname;

function ask(event) {

  event.preventDefault()
  let message = document.getElementById('askquestion').value

  axios.post("/api/1.0/question", {
      company: company,
      nickname: nickname,
      question: message
    })
    .then(res => {
      Swal.fire("Good job! 已成功送出問題", "敬請期待", "success");
      setTimeout((() => window.location.href = "/index.html"), 3000)
    })
    .catch(err => {
      console.log(err, err.response);
    });
}
