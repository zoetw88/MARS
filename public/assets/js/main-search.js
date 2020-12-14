async function chart() {
    let company = document.querySelector("#company").value
    let title = document.querySelector("#title").value
    await axios.get(`/api/1.0/workinghour?company=${company}&title=${title}`)
      .then((response) => {


        console.log('ok')
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
    await axios.get(`/api/1.0/salary?company=${company}&title=${title}`)
        .then((response) => {
           
            
           window.location.href="/index4.html"
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
