
let company = window.localStorage.getItem('company')
let nickname= window.localStorage.getItem('id')
document.getElementById('companyname').innerHTML=company
document.getElementById('username').innerHTML="Hi，"+nickname

function ask(event){
  event.preventDefault()
  let message=document.getElementById('askquestion').value
  
    axios.post("/api/1.0/question",
      {
        company:company,
        nickname:nickname,
        question:message

        }
      )
      .then(res=> {
        swal("Good job! 已成功送出問題", "敬請期待", "success");
        setTimeout((()=>window.location.href="/index.html"),3000)
      })
      .catch(err => {
        console.log(err, err.response);
      });
     
    
    
    }
    
    