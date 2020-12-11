const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

function signup() {
  console.log('ok')
  let name = document.getElementById("sing_up_name").value
  let email = document.getElementById("sing_up_email").value
  let password = document.getElementById("sing_up_password").value
  let nickname = document.getElementById("sing_up_nickname").value
  console.log(name)
  // fetch data from a url endpoint
  axios.post("/api/1.0/user/signup", {
      name: name,
      email: email,
      password: password,
      nickname: nickname
    })
    .then((response)=> {
      console.log(response.data.data.accessToken)
      if(response.data.data.accessToken){
         window.localStorage.setItem('token', response.data.data.accessToken);
        setTimeout(function (){ window.location.href="/index2.html"},1000)
      }
      else{
      setTimeout(function(){ window.location.reload();},1500)
      }
    })
}

function login() {
let email = document.getElementById("login_email").value
  let password = document.getElementById("login_password").value

  axios.post("/api/1.0/user/signin", {
      email: email,
      password: password,
      provider:'native'
    })

    .then((response) => {
      console.log(response)
      if (response.data.data.accessToken) {
        window.localStorage.setItem('token',response.data.data.accessToken);
        setTimeout(function () {
          window.location.href = "/index2.html"
        }, 1000)
      } else {
  
        setTimeout(function () {
          window.location.reload();
        }, 1500)
      }

    })


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

