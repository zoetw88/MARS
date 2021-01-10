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









$(document).ready(function() {
  $('.counter-value').each(function() {
    $(this).prop('Counter', 0).animate({
      Counter: $(this).text(),
    }, {
      duration: 3500,
      easing: 'swing',
      step: function(now) {
        $(this).text(Math.ceil(now));
      },
    });
  });
});
