// TripTable.tsx
import React from "react";
import classes from "../CommcenComponents/TripList.module.css";
import { DataType, DataTypeKeys } from "../../services/Types";
import TocItem from "./TocItems";

interface TripTableProps {
  data: DataType[]; // An array of data objects (assuming DataType is defined)
  columnColors: string[]; // An array of column colors
  onRowClick: (tripId: string) => void; // Function to handle row clicks
}

const TocTable: React.FC<TripTableProps> = ({
  data,
  columnColors,
  onRowClick,
}) => {
  const headers = [
    { key: DataTypeKeys.CallSign, label: "Call Sign" },
    {key:'PAX', label: 'PAX'},
    { key: DataTypeKeys.Reason, label: "Reason" },
    { key: DataTypeKeys.MotoId, label: "Moto ID" },
    { key: DataTypeKeys.LastLocation, label: "Location" },
    { key: DataTypeKeys.Priority, label: "Priority" },
    {key: 'Status', label: "Status"},
    { key: DataTypeKeys.LastTime, label: "Last Update" },
    { key: DataTypeKeys.ActiveDate, label: "Activated On" },
  ];

  if (data.length === 0) {
    return <p className={classes.p}>No Active Patrols</p>; // Display a "No Data" message
  }

  return (
    <>
    <h1>Active</h1>
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
      <TocItem
        key={key}
        item={item}
        colur={columnColors[key]}
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
    </>
  );
};

export default TocTable;
