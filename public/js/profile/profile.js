
if ( localStorage.getItem("token")) {
  console.log("ok");

}
else {
  console.log("no token");
  window.location.href="/login.html";}

axios.get("/api/1.0/user/member.html",
  {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer" + " " + localStorage.getItem("token")
      }
    }
  )
  .then(res=> {
    window.location.href="/index2.html"
    console.log("Back to profile.html")
    console.log(res.data);
    let name = res.data.user.name;
    let email = res.data.user.email;
    // add user info to profile.html
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
 
  
