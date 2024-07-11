import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const nav = useNavigate()

  const url = "http://localhost:5000"


  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post(`${url}/login`, {
        email,
        username,
        password
      })

      const token = response.data.token

      localStorage.setItem('token', token)
      console.log('Berhasil')
      // nav("/course")
    } catch (err) {
      console.error('Login error:', err)
      setError('Invalid credentials. Please try again.')
    }
  }

  return (
    <Form onSubmit={handleLoginSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>

      {error && <p className="text-danger">{error}</p>}

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  )
}

export default Login
