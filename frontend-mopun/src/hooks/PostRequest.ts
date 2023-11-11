

export const handleMessagePost = async (callsign:string, message:string ) =>{
    const response = await fetch('https://localhost:7056/api/MessageLogs/AddMessage', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          callSign: callsign,
          message: message
        }),
      });
}
