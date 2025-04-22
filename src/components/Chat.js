import axios from 'axios';
import React, { useEffect, useState } from 'react';
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [messages, setMessages] = useState(() => {
  
    const data = [
      {
        receiverLastMessage: "I'm sad today",
        senderLastMessage: "I'm so sorry to hear that you're feeling down today. Sometimes, all we need is a song that understands and validates our emotions. Based on your sadness, I'd like to recommend a song that might resonate with you.\n\nI'm going to predict that you might connect with \"Someone Like You\" by Adele. This heart-wrenching ballad is a classic example of a soulful, emotional song that captures the pain of lost love and longing. Adele's powerful, soaring vocals and the song's simple yet effective piano melody create a sense of intimacy and vulnerability that might help you process your feelings.\n\nThe genre of this song is a mix of soul, blues, and pop, which often deals with themes of love, heartbreak, and introspection. Adele's music, in particular, is known for its emotional depth and raw honesty, making her a great fit for when you're feeling sad or melancholic.\n\nThe song's themes of yearning, regret, and nostalgia might help you feel less alone in your emotions, and Adele's emotive delivery can be a cathartic way to release your feelings. Other artists like Sam Smith, Hozier, or Lana Del Rey might also be up your alley if you enjoy this type of music.\n\nWould you like to give \"Someone Like You\" a listen and see if it resonates with you?",
      },
      {
        receiverLastMessage: "I'm sad today",
        senderLastMessage: "I'm so sorry to hear that. It sounds like you're going through a tough time, and sometimes all we need is a song to match our emotions and help us process. \n\nFor a sad day like today, I'd recommend a song that's melancholic, introspective, and maybe even a little comforting. I think a great fit would be \"Someone Like You\" by Adele. This soulful, acoustic ballad is a classic heartbreak song that captures the pain and longing that can come with sadness. Adele's powerful, emotive voice has a way of validating our feelings and making us feel less alone.\n\nThe song's slow tempo and minor keys create a somber mood that acknowledges your sadness, while Adele's introspective lyrics offer a sense of reflection and self-awareness. This song is a beautiful example of how music can be a companion during difficult times, and I hope it provides you with some solace today.\n\nIf you're open to exploring more music, I'd also suggest checking out other artists like Sam Smith, Hozier, or Phoebe Bridgers, who are known for their emotive, introspective songwriting and soothing melodies. These artists often create music that's perfect for a quiet, reflective day like today.\n\nHow do you feel about giving \"Someone Like You\" a listen, or would you like me to suggest more songs based on your mood?",
      }
    ];

    return data.flatMap((msg, index) => [
      {
        id: index * 2 + 1,
        text: msg.receiverLastMessage,
        isUser: true,
        avatar: 'https://i.pravatar.cc/150?img=2'
      },
      {
        id: index * 2 + 2,
        text: msg.senderLastMessage,
        isUser: false,
        avatar: 'https://i.pravatar.cc/150?img=1' // Bot avatar
      }
    ]);
  });

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get( `${process.env.REACT_APP_API_URL}${process.env.REACT_APP_CHAT_ENDPOINT}`);
      if (response.data.success) {
        const transformedMessages = response.data.data.message.flatMap((msg, index) => [
          {
            id: `${index}-user`,
            text: msg.receiverLastMessage,
            isUser: true,
            avatar: 'https://i.pravatar.cc/150?img=2'
          },
          {
            id: `${index}-bot`,
            text: msg.senderLastMessage,
            isUser: false,
            avatar: 'https://i.pravatar.cc/150?img=1'
          }
        ]);

        setMessages(transformedMessages);
      }
    } catch (err) {
      setError('Failed to fetch messages');
      console.error('Error fetching messages:', err);
    } finally {
      setLoading(false);
    }
  };


  const [newMessage, setNewMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const handleSend = async () => {
    if (!newMessage.trim()) return;

    // Optimistically add user message
    const userMessage = {
      id: Date.now(),
      text: newMessage,
      isUser: true,
      avatar: 'https://i.pravatar.cc/150?img=2'
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}${process.env.REACT_APP_SEND_MESSAGE_ENDPOINT}`, {
        receiverMessage: newMessage
      });

      const botMessage = {
        id: Date.now() + 1,
        text: response.data.message.senderMessage, // Adjust according to your API response
        isUser: false,
        avatar: 'https://i.pravatar.cc/150?img=1'
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      // Rollback user message
      setMessages(prev => prev.filter(msg => msg.id !== userMessage.id));
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
    <ChatContainer isSidebar={isOpen}>
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