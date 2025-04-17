import React from 'react';
import styled from 'styled-components';
import { useUser } from '../context/UserContext';

const AccountContainer = styled.div`
  padding: 32px 48px;
  background: linear-gradient(180deg, #1a1a2e 0%, #2a2a3c 100%);
  min-height: 100vh;
  color: white;

  h1 {
    font-size: 2rem;
    margin-bottom: 32px;
  }

  .form-group {
    margin-bottom: 24px;
    max-width: 500px;

    label {
      display: block;
      margin-bottom: 8px;
      color: #b3b3b3;
    }

    input {
      width: 100%;
      padding: 12px;
      background: rgba(64, 64, 64, 0.8);
      border: 1px solid rgba(138, 77, 255, 0.2);
      border-radius: 8px;
      color: white;
      font-family: 'Poppins', sans-serif;
    }
  }
`;

const AccountSettings = () => {
  const { user } = useUser();

  if (!user) return null;

  return (
    <AccountContainer>
      <h1>Account Settings</h1>
      
      <div className="form-group">
        <label>Name</label>
        <input type="text" defaultValue={user.name} />
      </div>

      <div className="form-group">
        <label>Email</label>
        <input type="email" defaultValue={user.email} />
      </div>

      {/* Add more account settings fields as needed */}
    </AccountContainer>
  );
};

export default AccountSettings;