import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


import classes from "./TripList.module.css";
import CommcenDate from "./CommcenComponents/CommcenDate";


enum DataTypeKeys {
  TripId = "tripId",
  CallSign = "callSign",
  Location = "location",
  Reason = "reason",
  LastLocation = "lastlocation",
  MotoId = "motoId",
  LastTime = "lastTimeUpdate",
  ActiveDate= "lastDateUpdate",
  Priority = "priority"
}

type DataType = {
  [DataTypeKeys.TripId]: string;
  [DataTypeKeys.CallSign]: string;
  [DataTypeKeys.Location]: string;
  [DataTypeKeys.Reason]: string;
  [DataTypeKeys.LastLocation]: string;
  [DataTypeKeys.MotoId]: string;
  [DataTypeKeys.LastTime]: string;
  [DataTypeKeys.Priority]: string;
  [DataTypeKeys.ActiveDate]:Date;
};

const TripList = () => {

  const navigate = useNavigate();
  const [data, setData] = useState<DataType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://localhost:7056/api/Trip/getTrips");
        if (response.ok) {
          const data = await response.json();
          setData(data);
        }
      } catch (error) {
        // Handle errors
      }
    };
  
    // Fetch data immediately when the component mounts
    fetchData();
  
    // Set up the interval to fetch data every minute
    const intervalId = setInterval(fetchData, 60000);
  
    return () => {
      clearInterval(intervalId); // Clear the interval on unmount
    };
  }, []);
  
  

  const headers = [
    { key: DataTypeKeys.CallSign, label: "Call Sign" },
    { key: DataTypeKeys.Reason, label: "Reason" },
    { key: DataTypeKeys.MotoId, label: "Moto ID" },
    { key: DataTypeKeys.Priority, label: "Priority" },
    { key: DataTypeKeys.LastTime, label: "Last Update" },
    { key: DataTypeKeys.ActiveDate, label: "Activated On" },
  ];

 // Navigate to the tripDetails page for the clicked trip
 const handleRowClick = (tripId: string) => {
  navigate(`/tripDetails/${tripId}`); // Updated path
};

  return (
    <table className={classes.table}>
    <thead>
      <tr>
        {headers.map((header, index) => (
          <th key={index}>{header.label}</th>
        ))}
      </tr>
    </thead>

    <tbody>
      {data.map((item, key) => (
        <tr
          key={key}
          onClick={() => handleRowClick(item[DataTypeKeys.TripId])}
          style={{ cursor: "pointer" }}
      
        >
          <td>{item[DataTypeKeys.CallSign]}</td>
          <td>{item[DataTypeKeys.Reason]}</td>
          <td>{item[DataTypeKeys.MotoId]}</td>
          <td>{item[DataTypeKeys.Priority]}</td>
          <td>{item[DataTypeKeys.LastTime].slice(0,8)}</td>
          <td><CommcenDate lastDateUpdate={item[DataTypeKeys.ActiveDate]}></CommcenDate></td>
        </tr>
      ))}
    </tbody>
  </table>
  );
};

export default TripList;

