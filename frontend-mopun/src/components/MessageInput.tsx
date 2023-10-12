import React, { useState } from 'react';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault(); // Prevent newline on Enter key press
      handleSendMessage();
    }
  };

  return (
   
    <div className="message-input">
      <textarea
        placeholder="Type your message..."
        value={message}
        onChange={handleInputChange}
      
        style={{ height: '80px' ,width: '300px'}} // Set the height to your desired value
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>

  );
};

export default MessageInput;
