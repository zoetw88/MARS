
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
async function verify_token() {
  try {
    axios.get('/api/1.0/user/logout', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer' + ' ' + localStorage.getItem('token'),
      },
    })
        .then((response) => {
          
          if (response.data.name != 'JsonWebTokenError') {
            const nickname = response.data.nickname;
            document.querySelector('#login').innerHTML = `Hi ${nickname}`;
            document.querySelector('#logout').innerHTML = `logout`;
            document.querySelector('#login').removeAttribute('href');
          }
        })
        .catch((error) => {
          console.log(error);
          return false;
        });
  } catch (error) {
    return error;
  }
}

function logout(event) {
  try {
    event.preventDefault(event);
    const nickname = localStorage.getItem('nickname');
    window.localStorage.removeItem('token');
    Swal.fire(`${nickname}務必再次登入火星!`, '台灣的職場生態改變由你我做起', 'success')
        .then(() => {
          window.location.reload();
        });
  } catch (error) {
    return error;
  }
}

verify_token();
$('#logout').on('click', function() {
  logout(event);
});
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
