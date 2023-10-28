import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TocTable from "./TocTable";
import { DataType, DataTypeKeys } from "../../services/Types";
import { fetchData } from "../../hooks/Grequest";

const TocList = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<DataType[]>([]);
  const [columnColors, setColumnColors] = useState<string[]>([]);

  useEffect(() => {
    const fetchDataAndUpdate = async () => {
      try {
        const result = await fetchData("https://localhost:7056/api/Trip/getTrips");
        setData(result);

        const currentTime = new Date();
        const colors = result.map((item: any) => {
          const timeString = item[DataTypeKeys.LastTime];
          const [hours, minutes, seconds] = timeString.split(":");
          const fractionalSeconds = parseFloat(seconds);

          const isActive = item[DataTypeKeys.Active];
          console.log("Hi" + isActive);

          const lastUpdateTime = new Date(
            currentTime.getFullYear(),
            currentTime.getMonth(),
            currentTime.getDate(),
            parseInt(hours),
            parseInt(minutes),
            Math.floor(fractionalSeconds),
            (fractionalSeconds - Math.floor(fractionalSeconds)) * 1000
          );

          let timeDifference: number = currentTime.getTime() - lastUpdateTime.getTime();

          if (timeDifference < 0) {
            const millisecondsInADay = 24 * 60 * 60 * 1000;
            timeDifference += millisecondsInADay;
          }

          const timeDifferenceInMinutes: number = timeDifference / (1000 * 60);
     

          console.log("Time: " + timeDifferenceInMinutes);

          if (!item[DataTypeKeys.InCamp]) {

            if(timeDifferenceInMinutes < 15){
              return "#08a04b"
            }
            else if(timeDifferenceInMinutes >15 && timeDifferenceInMinutes < 30 ){
              return "yellow"
            }
            else if(timeDifferenceInMinutes >= 30){
              return "red";
            }

            else{
              return "slategrey";
            }
          }
        });

        setColumnColors(colors);
      } catch (error) {
        console.error("An error occurred while fetching data:", error);
      }
    };

    fetchDataAndUpdate();

    const intervalId = setInterval(fetchDataAndUpdate, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const handleRowClick = (tripId: string) => {
    navigate(`/tripDetails/${tripId}`);
  };

  return (
    <TocTable
      data={data}
      columnColors={columnColors}
      onRowClick={handleRowClick}
    />
  );
};

export default TocList;
