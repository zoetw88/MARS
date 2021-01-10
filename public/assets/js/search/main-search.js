axios.get(`/api/1.0/joblist`)
    .then((response) => {
     
      $(function() {
        const availableTags = response.data;
        $('#title').autocomplete({
          source: availableTags,
        });
      });
    });

axios.get(`/api/1.0/companylist`)
    .then((response) => {
      console.log(response)
      $(function() {
        const availableTags = response.data;
        $('#company').autocomplete({
          source: availableTags,
        });
      });
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

verify_token();

$('#logout').on('click', function() {
  logout(event);
});
async function chart() {
  const company = document.querySelector('#company').value;
  const title = document.querySelector('#title').value;
  window.localStorage.setItem('company', company);
  window.localStorage.setItem('title', title);
  axios.get(`/api/1.0/salary?company=${company}&title=${title}`);
  axios.get(`/api/1.0/workinghour?company=${company}&title=${title}`)

      .then(() => {
        window.location.href = '/search_result.html';
      })
      .catch((error) => {
        if (!error.response) {
        // network error
        } else {
        // http status code
          const code = error.response.status;
          // response data
          const response = error.response.data;
          console.loge(code);
          console.log(response);
        }
      });
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
