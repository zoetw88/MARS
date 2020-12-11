let test = document.getElementById('user-profile-name')
test.value="test"
alert('ok')
if ( localStorage.getItem("token")) {
axios.get("/api/1.0/member",
  {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer" + " " + localStorage.getItem("token")
      }
    }
  )
  .then(res=> {
    let name = res.data.data.nickname;
    let email = res.data.data.email;
    addUserProfile(name, email);
  })
  .catch(err => {
    console.log(err, err.response);
  });
  function addUserProfile(name, email) {
    let userName = document.getElementById("user-profile-name");
    let userEmail = document.getElementById("user-profile-email");
    userName.textContent = `Welcome, ${name}!`;
    userEmail.textContent = `E-mail: ${email}`;
  }
 
  

}
else {
  alert('尚未登入')
  window.location.href="/login.html";}
