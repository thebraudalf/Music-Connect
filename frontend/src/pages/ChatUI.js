import React, { useState } from 'react';
import styled from 'styled-components';

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: linear-gradient(135deg, #1a1a2e, #2a2a3c);
  color: white;
  padding: 20px;
  font-family: 'Poppins', sans-serif;
`;

const ChatBox = styled.div`
  flex: 1;
  overflow-y: auto;
  margin-bottom: 1rem;
  padding-right: 10px;
`;

const Message = styled.div`
  margin: 10px 0;
  align-self: ${props => (props.isUser ? 'flex-end' : 'flex-start')};
  background: ${props => (props.isUser ? '#8a4dff' : '#33344f')};
  color: white;
  padding: 12px 16px;
  border-radius: 16px;
  max-width: 75%;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
`;

const InputWrapper = styled.div`
  display: flex;
  background-color: rgba(42, 42, 60, 0.9);
  padding: 1rem;
  border-radius: 12px;
`;

const Input = styled.input`
  flex: 1;
  padding: 1rem;
  background: rgba(64, 64, 64, 0.8);
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 1rem;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #8a4dff;
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
`;

const SendButton = styled.button`
  background: linear-gradient(135deg, #8a4dff, #ff4081);
  color: white;
  border: none;
  margin-left: 10px;
  border-radius: 8px;
  padding: 0 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(138, 77, 255, 0.3);
  }
`;

const ChatUI = () => {
  const [messages, setMessages] = useState([
    { text: 'Hey! What mood are you in today? 🎵', isUser: false },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { text: input, isUser: true };
    const aiReply = { text: `Got it! Finding songs for your "${input}" mood.`, isUser: false };

    setMessages(prev => [...prev, userMessage, aiReply]);
    setInput('');
  };

  return (
    <ChatContainer>
      <ChatBox>
        {messages.map((msg, i) => (
          <Message key={i} isUser={msg.isUser}>{msg.text}</Message>
        ))}
      </ChatBox>
      <InputWrapper>
        <Input
          type="text"
          placeholder="Type how you're feeling..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <SendButton onClick={handleSend}>Send</SendButton>
      </InputWrapper>
    </ChatContainer>
  );
};

export default ChatUI;
