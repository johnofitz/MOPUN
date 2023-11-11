import axios from "axios";

export const handleSendMessage = async ( id: string) => {
    try {
      const response = await axios.put(`https://localhost:7056/api/Trip/Active/${id}`);
      console.log(response.headers)
      // Check the response status and handle it as needed
      if (response.status === 204) {
        // Request successful, handle the response accordingly
        console.log('Trip Ticket updated successfully.');
      } else {
        // Handle other status codes if needed
        console.error('Failed to update Trip Ticket.');
      }
    } catch (error) {
      // Handle errors from the request
      console.error('Error updating Trip Ticket:', error);
    
    } 
}
