// TripTable.tsx
import React from "react";
import classes from "./TripList.module.css";
import { DataType, DataTypeKeys } from "../../services/Types";
import TripItem from "./TripItems";

interface TripTableProps {
  data: DataType[]; // An array of data objects (assuming DataType is defined)
  columnColors: string[]; // An array of column colors
  onRowClick: (tripId: string) => void; // Function to handle row clicks
}

const TripTable: React.FC<TripTableProps> = ({
  data,
  columnColors,
  onRowClick,
}) => {
  const headers = [
    { key: DataTypeKeys.CallSign, label: "Call Sign" },
    { key: DataTypeKeys.Reason, label: "Reason" },
    { key: DataTypeKeys.MotoId, label: "Moto ID" },
    { key: DataTypeKeys.LastLocation, label: "Location" },
    { key: DataTypeKeys.Priority, label: "Priority" },
    { key: DataTypeKeys.LastTime, label: "Last Update" },
    { key: DataTypeKeys.ActiveDate, label: "Activated On" },
  ];

  if (data.length === 0) {
    return <p className={classes.p}>No Active Patrols</p>; // Display a "No Data" message
  }

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
      {data.map((item, key) => {
  if (item.active) {
    return (
      <TripItem
        key={key}
        item={item}
        color={columnColors[key]}
        onClick={() => onRowClick(item[DataTypeKeys.TripId])}
      />
    );
  } else {
    console.log(`Skipping item with key ${key} because Active is not true.`);
    return null;
  }
})}

      </tbody>
    </table>
  );
};

export default TripTable;
