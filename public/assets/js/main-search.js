function search() {
    let company = document.querySelector("#company").value
    let title = document.querySelector("#title").value
   if (company == null || title==null){
     alert("請輸入公司及職稱")
   }
else{
    axios.get(`/api/1.0/salary?company=${company}&title=${title}`)
        .then((response) => {
            alert('test ok')
            
            setTimeout(function (){window.location.href="/chart2.html"},1000)
        })
        .catch((error) => {
            console.log(error)
                if (!error.response) {
                  // network error
                } else {
                  // http status code
                  const code = error.response.status
                  // response data
                  const response = error.response.data
                  console.loge(code)
                  console.log(response)
                }

        })
      }
}