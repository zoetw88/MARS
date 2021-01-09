const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
  container.classList.add('right-panel-active');
});

signInButton.addEventListener('click', () => {
  container.classList.remove('right-panel-active');
});


async function verify_token() {
  try {
    axios.get('/api/1.0/user/logout', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer' + ' ' + localStorage.getItem('token'),
      },
    })
        .then((response) => {
          if (response.data.name == 'JsonWebTokenError') {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: '你尚未正式踏入火星領地!',
            }).then((result) => {
              window.location.href = '/login.html';
            });
          };
        })

        .catch((error) => {
          const error_message = error.response.data.result;
          console.log(error_message);
          return false;
        });
  } catch (error) {
    return error;
  }
}

async function signup(event) {
  event.preventDefault();
  try {
    const name = document.getElementById('sing_up_name').value;
    const email = document.getElementById('sing_up_email').value;
    const password = document.getElementById('sing_up_password').value;
    const nickname = document.getElementById('sing_up_nickname').value;
    const company = document.getElementById('sing_up_company').value;
    const title = document.getElementById('sing_up_title').value;
    const union = document.getElementById('sing_up_union').value;
    axios.post('/api/1.0/user/signup', {
      name: name,
      email: email,
      password: password,
      nickname: nickname,
      company: company,
      title: title,
      union: union,
    })
        .then((response) => {
          if (response.data.data.accessToken) {
            window.localStorage.setItem('nickname', nickname);
            window.localStorage.setItem('id', nickname);
            window.localStorage.setItem('token', response.data.data.accessToken);
            hello(nickname);
          }
        })
        .catch((error) => {
          const error_message = error.response.data.result;
          console.log(error_message);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error_message,
          }).then(() => {
            setTimeout(function() {
              window.location.reload();
            }, 1500);
          });
        });
  } catch (error) {
    return error;
  }
}

async function login(event) {
  event.preventDefault();
  try {
    const email = document.getElementById('login_email').value;
    const password = document.getElementById('login_password').value;
    axios.post('/api/1.0/user/signin', {
      email: email,
      password: password,
      provider: 'native',
    })
        .then((response) => {
          window.localStorage.setItem('nickname', response.data.data.nickname);
          window.localStorage.setItem('token', response.data.data.accessToken);
          window.localStorage.setItem('id', response.data.data.nickname);
          hello(response.data.data.nickname);
        })
        .catch((error) => {
          const error_message = error.response.data.result;
          console.log(error_message);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error_message,
          }).then(() => {
            setTimeout(function() {
              window.location.reload();
            }, 1500);
          });
        });
  } catch (error) {
    return error;
  }
}


function logout(event) {
  event.preventDefault();
  try {
    axios.get('/api/1.0/user/logout', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer' + ' ' + localStorage.getItem('token'),
      },
    })
        .then(() => {
          goodbody();
        })
        .catch((error) => {
          const error_message = error.response.data.result;
          console.log(error_message);
        });
  } catch (error) {
    return error;
  }
}

function hello(nickname) {
  Swal.fire({
    icon: 'success',
    title: `早安午安晚安 ${nickname}\r\n歡迎來到火星`,
    text: '你的一小步是改善台灣職場生態的一大步',

  })
      .then(() => {
        window.location.href = '/index.html';
      });
}


function goodbody() {
  const nickname = localStorage.getItem('nickname');
  window.localStorage.clear('token');
  Swal.fire(`${nickname}務必再次登入火星!`, '台灣的職場生態改變由你我做起', 'success')
      .then(() => {
        window.location.href = '/index.html';
      });
}
