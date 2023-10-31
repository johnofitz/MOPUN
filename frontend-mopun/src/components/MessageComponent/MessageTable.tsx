import { Data } from "../../services/MessageType";
import classes from "../CommcenComponents/TripList.module.css"
import MessageItem from "./MessageItem";


interface TripTableProps {
    data: Data[]; // An array of data objects (assuming DataType is defined)
  }
  
  const MessageTable: React.FC<TripTableProps> = ({ data}) => {
    const headers = [
      { key: "CallSign", label: "Call Sign" },
      { key: 'Message', label: 'Message' },
      { key: "Time", label: "Time" },
      { key: "Date", label: "Date" }
    ];
  
    if (data.length === 0) {
      return <p className={classes.p}>No Recent Messages</p>; // Display a "No Data" message
    }
  
   
    return (
      <>
        <div>
          <h1 className={classes.h1}>Communication Log</h1>
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
                <MessageItem
                  key={key}
                  item={item}
                />
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  };
  
  export default MessageTable;
  