import React, { useState } from 'react';
import styled from 'styled-components';

const ChatContainer = styled.div`
  position: fixed;
  bottom: 100px;
  right: 20px;
  width: 300px;
  background: #2a2a3c;
  border-radius: 8px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(138, 77, 255, 0.2);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  max-height: 400px;
  left: ${props => props.isSidebar ? '280px' : 'auto'};
  right: ${props => props.isSidebar ? 'auto' : '20px'};

  @media (max-width: 768px) {
    left: 0;
    right: 0;
    width: 100%;
    max-height: 50vh;
  }
`;

const ChatHeader = styled.div`
  padding: 12px 16px;
  border-bottom: 1px solid rgba(138, 77, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  h3 {
    margin: 0;
    color: white;
    font-size: 14px;
    font-weight: 600;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #b3b3b3;
  cursor: pointer;
  font-size: 16px;
  
  &:hover {
    color: white;
  }
`;

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Message = styled.div`
  display: flex;
  gap: 8px;
  align-items: flex-start;
  
  img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }
`;

const MessageContent = styled.div`
  background: ${props => props.isUser ? '#8a4dff' : '#3a3a4c'};
  color: white;
  padding: 8px 12px;
  border-radius: 16px;
  font-size: 14px;
  max-width: 80%;
`;

const InputContainer = styled.div`
  padding: 12px;
  border-top: 1px solid rgba(138, 77, 255, 0.1);
  display: flex;
  gap: 8px;
`;

const Input = styled.input`
  flex: 1;
  background: #3a3a4c;
  border: none;
  border-radius: 20px;
  padding: 8px 16px;
  color: white;
  font-size: 14px;
  
  &:focus {
    outline: none;
  }
`;

const SendButton = styled.button`
  background: #8a4dff;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  
  &:hover {
    background: #9a5dff;
  }
`;

const Chat = ({ isSidebar = false }) => {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hey there!', isUser: false, avatar: 'https://i.pravatar.cc/150?img=1' },
    { id: 2, text: 'Hi! How are you?', isUser: true, avatar: 'https://i.pravatar.cc/150?img=2' },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleSend = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          text: newMessage,
          isUser: true,
          avatar: 'https://i.pravatar.cc/150?img=2'
        }
      ]);
      setNewMessage('');
    }
  };

  if (!isOpen && !isSidebar) {
    return (
      <ChatButton onClick={() => setIsOpen(true)}>
        💬
      </ChatButton>
    );
  }

  return (
    <ChatContainer isSidebar={isSidebar}>
      <ChatHeader>
        <h3>Chat</h3>
        <CloseButton onClick={() => setIsOpen(false)}>×</CloseButton>
      </ChatHeader>
      <MessagesContainer>
        {messages.map(message => (
          <Message key={message.id}>
            <img src={message.avatar} alt="Avatar" />
            <MessageContent isUser={message.isUser}>
              {message.text}
            </MessageContent>
          </Message>
        ))}
      </MessagesContainer>
      <InputContainer>
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <SendButton onClick={handleSend}>→</SendButton>
      </InputContainer>
    </ChatContainer>
  );
};

const ChatButton = styled.button`
  position: fixed;
  bottom: 100px;
  right: 20px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #8a4dff;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 16px rgba(138, 77, 255, 0.3);
  
  &:hover {
    background: #9a5dff;
  }
`;

export default Chat; 