import React from "react";
import CommcenDate from "./CommcenDate";
import { DataType, DataTypeKeys} from "../../services/Types";


interface TripItemProps {
  item: DataType;
  color: string;
  onClick: () => void;
}

const TripItem: React.FC<TripItemProps> = ({ item, color, onClick }) => {
  
  return (
    <tr onClick={onClick} style={{ cursor: "pointer" }}>
      <td style={{ backgroundColor: color }}>{item[DataTypeKeys.CallSign]}</td>
      <td style={{ backgroundColor: color }}>{item[DataTypeKeys.Reason]}</td>
      <td style={{ backgroundColor: color }}>{item[DataTypeKeys.MotoId]}</td>
      <td style={{ backgroundColor: color }}>{item[DataTypeKeys.Location]}</td>
      <td style={{ backgroundColor: color }}>{item[DataTypeKeys.Priority]}</td>
      <td style={{ backgroundColor: color }}>{item[DataTypeKeys.LastTime].slice(0, 8)}</td>
      <td style={{ backgroundColor: color }}>
        <CommcenDate lastDateUpdate={item[DataTypeKeys.ActiveDate]}></CommcenDate>
      </td>
    </tr>
  );
};

export default TripItem;
