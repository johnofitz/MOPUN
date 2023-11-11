import React from "react";
import classes from "../CommcenComponents/TripList.module.css";
import { DataType, DataTypeKeys } from "../../services/Types";
import TocItem from "./TocItems";

interface TripTableProps {
  data: DataType[]; // An array of data objects (assuming DataType is defined)
  columnColors: string[]; // An array of column colors
  onRowClick: (tripId: string) => void; // Function to handle row clicks
}

const TocTable: React.FC<TripTableProps> = ({ data, columnColors, onRowClick }) => {
  const headers = [
    { key: DataTypeKeys.CallSign, label: "Call Sign" },
    { key: "PAX", label: "PAX"},
    { key: DataTypeKeys.Reason, label: "Reason" },
    { key: DataTypeKeys.MotoId, label: "Moto ID" },
    { key: DataTypeKeys.LastLocation, label: "Location" },
    { key: DataTypeKeys.Priority, label: "Priority" },
    { key: 'Status', label: "Status" },
    { key: DataTypeKeys.startTime, label: "Start Time" },
    {key: DataTypeKeys.LastTime, label: "Last Update"},
    { key: DataTypeKeys.ActiveDate, label: "Activated On" },
  ];

  if (data.length === 0) {
    return <p className={classes.p}>No Active Patrols</p>; // Display a "No Data" message
  }

  // Group indices by colors
  const colorIndices: { [key: string]: number[] } = {};
  columnColors.forEach((color, index) => {
    if (!colorIndices[color]) {
      colorIndices[color] = [];
    }
    colorIndices[color].push(index);
  });

  const blueIndices = colorIndices["orange"] || [];
  const activeIndices: number[] = [];

  // Retrieve indices for colors other than "blue"
  Object.keys(colorIndices).forEach((color) => {
    if (color !== "orange") {
      activeIndices.push(...colorIndices[color]);
    }
  });

  return (
    <>
   
       
    
        <table className={classes.table}>
          <thead>
            <tr>
            <h1 className={classes.h1}>Active</h1>
            </tr>
            <tr>
              {headers.map((header, index) => (
                <th key={index}>{header.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {activeIndices.map((index) => (
              <TocItem
                key={index}
                item={data[index]}
                colur={columnColors[index]}
                onClick={() => onRowClick(data[index][DataTypeKeys.TripId])}
              />
            ))}
          </tbody>
        </table>
     
        <h1 className={classes.h1}>PENDING</h1>
        <table className={classes.table}>
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th key={index}>{header.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {blueIndices.map((index) => (
              <TocItem
                key={index}
                item={data[index]}
                colur={columnColors[index]}
                onClick={() => onRowClick(data[index][DataTypeKeys.TripId])}
              />
            ))}
          </tbody>
        </table>

    </>
  );
};

export default TocTable;
