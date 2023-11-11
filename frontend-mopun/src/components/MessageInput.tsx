import React, { useState } from 'react';
import classes from '../components/TripDetail.module.css'
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
   <>
    <div>
      <textarea
        placeholder="Type your message..."
        value={message}
        onChange={handleInputChange}
        className={classes.messageInput}
      />
    
    </div>
  <button onClick={handleSendMessage} className={classes.messbutton}>Send</button>
  </>
  );
};

export default MessageInput;
