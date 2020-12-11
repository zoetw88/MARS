const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
  container.classList.remove("right-panel-active");
});


async function verify_token() {
  event.preventDefault()
  try {
    let result = axios.get("/api/1.0/user/logout", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer" + " " + localStorage.getItem("token")
        }
      })
      .then((response) => {
        let nickname = response.data.nickname
        return result = nickname
      })
      .catch((error) => {
        console.log(error.response)
        return result = false
      })
    return result
  } catch (error) {
    return error
  }

}

async function signup() {
 try{ 
   let result = await verify_token()
  if (result) {
    let message = document.getElementById("message");
    message.textContent = `阿囉哈, ${result},你已經登入過了!`;

  } else {
    let name = document.getElementById("sing_up_name").value
    let email = document.getElementById("sing_up_email").value
    let password = document.getElementById("sing_up_password").value
    let nickname = document.getElementById("sing_up_nickname").value

    axios.post("/api/1.0/user/signup", {
        name: name,
        email: email,
        password: password,
        nickname: nickname
      })
      .then((response) => {

        if (response.data.data.accessToken) {
          window.localStorage.setItem('token', response.data.data.accessToken);
          setTimeout(function () {
            window.location.href = "/index2.html"
          }, 1000)
        } 
      })
      .catch((error) => {
        console.log(error)
        let error_message = error.response.data.result
        let message = document.getElementById("message");
        message.textContent = `看過來, ${error_message}!`;
      })
    
    }
  }catch(error){
    return error
  }
}

async function login() {
  let result = await verify_token()
  if (result) {
    let message = document.getElementById("message");
    message.textContent = `阿囉哈, ${result},你已經登入過了!`;

  } else {
    try {
      let email = document.getElementById("login_email").value
      let password = document.getElementById("login_password").value
      axios.post("/api/1.0/user/signin", {
          email: email,
          password: password,
          provider: 'native'
        })
        .then((response) => {
          if (response.data.data.accessToken) {
            window.localStorage.setItem('token', response.data.data.accessToken);
            setTimeout(function () {
              window.location.href = "/index2.html"
            }, 1000)
          } else {
            setTimeout(function () {
              window.location.reload();
            }, 1500)
          }
        })
        .catch((error) => {
          let error_message = error.response.data.result
          let message = document.getElementById("message");
          message.textContent = `看過來, ${error_message}!`;
          setTimeout(function () {
            window.location.reload();
          }, 1500)
        })
    } catch (error) {
      return error
    }

  }
}


function logout() {
  event.preventDefault()
  try {
    axios.get("/api/1.0/user/logout", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer" + " " + localStorage.getItem("token")
        }
      })

      .then((response) => {
        window.localStorage.clear('token');
        let message = document.getElementById("message");
        message.textContent = `務必再次登入火星!`;
        setTimeout(function () {
          window.location.reload();
        }, 800)
      })
      .catch((error) => {
        console.log(error.response.data)


      })
  } catch (error) {
    return error
  }


}
  // async function signIN(e){
  //   e.preventDefault()
  //   const result = await axios.post("/api/1.0/user/signin",{
  //     'provider': 'native',
  //     'email': idRef.current.value,
  //     "password":passwordRef.current.value})
  //     .then((response) => {
  //       console.log(response.data.data.access_token)
  //       if(response.data)
  //         localStorage.setItem('wenchange', JSON.stringify(response.data.data.access_token),onIdSubmit(idRef.current.value))

  //     })
  //     .catch((error) => {resultRef.current.innerText='登入錯誤'  })
    
  // }

