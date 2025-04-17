import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import { AuthProvider } from './context/AuthContext';
import { UserProvider } from './context/UserContext';
import ProtectedRoute from './components/ProtectedRoute';
import Sidebar from './components/Sidebar';
import TopNav from './components/TopNav';
import Home from './pages/Home';
import Search from './pages/Search';
import Library from './pages/Library';
import Player from './components/Player';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import ChatUI from './pages/ChatUI';
import './App.css';

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  background-color: #121212;
  color: white;
  overflow: hidden;
`;

const MainContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  background-color: #121212;
  background-image: linear-gradient(rgba(0, 0, 0, 0.6) 0, #121212 100%);
  padding-top: 80px;

  @media (max-width: 768px) {
    margin-left: 0;
    padding-top: 60px;
  }
`;

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <Router>
          <AppContainer>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/" element={<Login />} />
              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <>
                      <Sidebar />
                      <TopNav />
                      <MainContent>
                        <Home />
                      </MainContent>
                      <Player />
                    </>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/search"
                element={
                  <ProtectedRoute>
                    <>
                      <Sidebar />
                      <TopNav />
                      <MainContent>
                        <Search />
                      </MainContent>
                      <Player />
                    </>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/library"
                element={
                  <ProtectedRoute>
                    <>
                      <Sidebar />
                      <TopNav />
                      <MainContent>
                        <Library />
                      </MainContent>
                      <Player />
                    </>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/chat"
                element={
                  <ProtectedRoute>
                    <>
                      <Sidebar />
                      <TopNav />
                      <MainContent>
                        <ChatUI />
                      </MainContent>
                      <Player />
                    </>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </AppContainer>
        </Router>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
