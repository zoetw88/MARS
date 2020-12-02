


export default function Login({ onIdSubmit }) {
  const idRef = useRef()
  const passwordRef = useRef()
  const resultRef = useRef()

 
  async function signIN(e){
    e.preventDefault()
    const result = await axios.post("/api/1.0/user/signin",{
      'provider': 'native',
      'email': idRef.current.value,
      "password":passwordRef.current.value})
      .then((response) => {
        console.log(response.data.data.access_token)
        if(response.data)
          localStorage.setItem('wenchange', JSON.stringify(response.data.data.access_token),onIdSubmit(idRef.current.value))

      })
      .catch((error) => {resultRef.current.innerText='登入錯誤'  })
    
  }

