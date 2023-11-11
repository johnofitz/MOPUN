import { useState, useEffect } from 'react';
import { fetchData } from '../../hooks/Grequest';
import { Data } from '../../services/MessageType';
import MessageTable from './MessageTable';

const MessageList = () => {
  const [data, setData] = useState<Data[]>([]);

  useEffect(() => {
    const fetchDataAndUpdate = async () => {
      try {
        const result = await fetchData('https://localhost:7056/api/MessageLogs');

        // Filter messages from the last 24 hours
        const currentTime = Date.now();
        const twentyFourHoursAgo = currentTime - 24 * 60 * 60 * 1000; // 24 hours in milliseconds

        const messagesWithin24Hours = result.filter((message: Data) => {
          const messageTime = new Date(message.dateOF).getTime();

          // Check if messageTime is a valid date and falls within the last 24 hours
          if (!isNaN(messageTime) && messageTime > twentyFourHoursAgo) {
            return true;
          } else {
            // Handle the case where message.dateOF is not a valid date or not within the last 24 hours
            console.error('Invalid date format or not within the last 24 hours:', message.dateOF);
            return false; // Exclude this message
          }
        });

        setData(messagesWithin24Hours);
      } catch (error) {
        console.error('An error occurred while fetching data:', error);
      }
    };

    fetchDataAndUpdate(); // Initial fetch

    const intervalId = setInterval(fetchDataAndUpdate, 5000);

    return () => {
      clearInterval(intervalId); // Clean up interval on unmount
    };
  }, []); // Empty dependency array runs the effect only once

  return <MessageTable data={data} />;
};

export default MessageList;
