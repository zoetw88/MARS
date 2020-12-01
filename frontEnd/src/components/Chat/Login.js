import React, { useRef,useState } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import { v4 as uuidV4 } from 'uuid'
import axios from "./axios";
import useLocalStorage from './hooks/useLocalStorage';


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

  return (
    <Container className="align-items-center d-flex" style={{ height: '100vh' }}>
      <Form onSubmit={signIN} className="w-100">
        <Form.Group>
        <Form.Label ref={resultRef}>Hello</Form.Label>
        <br></br>
          <Form.Label>Enter Your email</Form.Label>
          <Form.Control type="email" ref={idRef} required />
          <Form.Label>Enter Your password</Form.Label>
          <Form.Control type="password"ref={passwordRef} required />
        </Form.Group>   
        <Button type="submit" className="mr-2">Login</Button>
      </Form>
    </Container>
  )
}
