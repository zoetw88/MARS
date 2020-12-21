axios.get(`/api/1.0/joblist`)
      .then((response) => {
    
        let myData = Object.values(response.data).map(item => item.title)
        console.log(myData)
        $( function() {
          var availableTags = myData
          $( "#title" ).autocomplete({
            source: availableTags
          });
        } );
      })

      axios.get(`/api/1.0/companylist`)
      .then((response) => {
      
        let myData = Object.values(response.data).map(item => item.company)
        console.log(myData)
        $( function() {
          var availableTags = myData
          $( "#company" ).autocomplete({
            source: availableTags
          });
        } );
      })

      verify_token()
    async function verify_token() {
     
        try {
          let result = axios.get("/api/1.0/user/logout", {
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer" + " " + localStorage.getItem("token")
              }
            })
            .then((response) => {
              let nickname = response.data.nickname
              document.querySelector("#login").innerHTML='logout'
              
            })
            .catch((error) => {
              console.log(error)
              return false
            })
        
        } catch (error) {
          return error
        }
      
      }
 
async function chart() {
    let company = document.querySelector("#company").value
    let title = document.querySelector("#title").value
    window.localStorage.setItem('company', company)
    window.localStorage.setItem('title', title)

   
     axios.get(`/api/1.0/workinghour?company=${company}&title=${title}`)
      .then((response) => {
   
        window.location.href="/search_result.html"
      })
      .catch((error) => {
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
