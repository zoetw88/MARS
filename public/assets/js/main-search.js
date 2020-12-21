axios.get(`/api/1.0/joblist`)
      .then((response) => {
        console.log(response)
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
        console.log(response)
        let myData = Object.values(response.data).map(item => item.company)
        console.log(myData)
        $( function() {
          var availableTags = myData
          $( "#company" ).autocomplete({
            source: availableTags
          });
        } );
      })
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
    axios.get(`/api/1.0/salary?company=${company}&title=${title}`)
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
