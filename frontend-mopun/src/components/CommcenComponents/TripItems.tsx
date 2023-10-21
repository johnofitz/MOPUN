import React from "react";
import CommcenDate from "./CommcenDate";
import { DataType, DataTypeKeys } from "../../services/Types";
import { BiCircle } from "react-icons/bi";

interface TripItemProps {
  item: DataType;
  colur: string;
  onClick: () => void;
}
const TripItem: React.FC<TripItemProps> = ({ item, colur, onClick }) => {
 
  return (
    <tr onClick={onClick} style={{ cursor: "pointer" }}>
      <td>{item[DataTypeKeys.CallSign]}</td>
      <td>{item[DataTypeKeys.Reason]}</td>
      <td>{item[DataTypeKeys.MotoId]}</td>
      <td>{item[DataTypeKeys.Location]}</td>
      <td>{item[DataTypeKeys.Priority]}</td>
      <td>
        <svg width="40" height="40">
          <circle cx="20" cy="20" r="18" fill={colur} />
        </svg>
      </td>
      <td>{item[DataTypeKeys.LastTime].slice(0, 8)}</td>
      <td>
        <CommcenDate
          lastDateUpdate={item[DataTypeKeys.ActiveDate]}
        ></CommcenDate>
      </td>
    </tr>
  );
};
export default TripItem;
