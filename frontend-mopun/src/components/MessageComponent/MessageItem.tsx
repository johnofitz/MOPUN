import { Data } from '../../services/MessageType'
import CommcenDate from '../CommcenComponents/CommcenDate';

interface TripItemProps {
    item: Data;
  }
  
  const TripItem: React.FC<TripItemProps> = ({ item}) => {
   
    return (
  
     
      <>
      
      <tr style={{ cursor: "pointer" }}>
        <td >{item.callSign}</td>
        <td >{item.message}</td>
        <td >{item.timeOF.slice(0, 8)}</td>
    
        <td>
          <CommcenDate
            lastDateUpdate={item.dateOF}
          ></CommcenDate>
        </td>
      </tr>
      </>
  
    );
  };
  export default TripItem;
  