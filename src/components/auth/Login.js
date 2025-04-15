import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import logo from '../../logo.svg'; // Update path to your SVG file

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a2e 0%, #2a2a3c 100%);
  color: white;
  padding: 20px;
  width: 100%;
  position: relative;
  overflow: hidden;
`;

const Logo = styled.img`
  width: 120px;
  height: 120px;
  margin-bottom: 2rem;
  animation: float 3s ease-in-out infinite;

  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  }
`;

const LoginForm = styled.form`
  background-color: rgba(42, 42, 60, 0.9);
  padding: 2.5rem;
  border-radius: 16px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  z-index: 1;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
  color: #8a4dff;
  font-size: 2.5rem;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  font-family: 'Poppins', sans-serif;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  margin-bottom: 1.5rem;
  border: none;
  border-radius: 8px;
  background-color: rgba(64, 64, 64, 0.8);
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;
  font-family: 'Poppins', sans-serif;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #8a4dff;
    background-color: rgba(64, 64, 64, 1);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #8a4dff 0%, #ff4081 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
  font-family: 'Poppins', sans-serif;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(138, 77, 255, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

const SignupLink = styled(Link)`
  display: block;
  text-align: center;
  margin-top: 1.5rem;
  color: #8a4dff;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  font-family: 'Poppins', sans-serif;

  &:hover {
    color: #ff4081;
    text-decoration: underline;
  }
`;

const ErrorMessage = styled.div`
  color: #ff4444;
  margin-bottom: 1rem;
  text-align: center;
  background-color: rgba(255, 68, 68, 0.1);
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 68, 68, 0.3);
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const userData = {
        email,
        name: email.split('@')[0],
      };
      
      login(userData);
      navigate('/home');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <LoginContainer>
      <Logo src={logo} alt="Music Connect Logo" />
      <LoginForm onSubmit={handleSubmit}>
        <Title>Welcome Back</Title>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit">Log In</Button>
        <SignupLink to="/signup">Don't have an account? Sign up</SignupLink>
      </LoginForm>

      {/* Background effects */}
      <div style={{
        position: 'absolute',
        top: '-50px',
        right: '-50px',
        width: '200px',
        height: '200px',
        borderRadius: '50%',
        background: 'linear-gradient(45deg, #8a4dff, #ff4081)',
        filter: 'blur(80px)',
        zIndex: 0,
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-50px',
        left: '-50px',
        width: '200px',
        height: '200px',
        borderRadius: '50%',
        background: 'linear-gradient(45deg, #ff4081, #8a4dff)',
        filter: 'blur(80px)',
        zIndex: 0,
      }} />
    </LoginContainer>
  );
};

export default Login;