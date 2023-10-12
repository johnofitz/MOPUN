import { useEffect, useState } from "react";
import { fetchData } from "../../hooks/Grequest";
import Select from "react-select"
import classes from './MopForm.module.css'

interface BunkerSelectProps {
    name: string;
    onUpdate: (values: string[]) => void; // Update the prop type to accept an array
  }
  
  type Bunkers = {
    miNumber: number,
    bunkerNum: string,
    firstName: string,
    lastName: string,
    rank: string,
    bloodGp: string,
    gender: string
  };

const BSelect =(props: BunkerSelectProps)=>{

    const [options, setOptions] = useState<Bunkers[]>([]);
    const [selectedValues, setSelectedValues] = useState<string[]>([]);
  
    useEffect(() => {
      const fetchDataAndSetOptions = async () => {
        try {
          const data = await fetchData("https://localhost:7056/api/Personnels");
          setOptions(data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      fetchDataAndSetOptions();
    }, []);
  
    const handleSelectChange = (selectedOptions: any) => {
      const selectedValues = selectedOptions.map((option: any) => option.value);
      setSelectedValues(selectedValues);
      props.onUpdate(selectedValues);
    };
  
    // Convert the options array to the format expected by React Select
    const selectOptions = options.map((option) => ({
      value: option.bunkerNum.toString(),
      label: `${option.bunkerNum}: ${option.firstName} ${option.lastName}`,
    }));

    return (
        <Select 
    
          className={classes.select} 
          isMulti
          name={props.name}
          options={selectOptions}
          placeholder="Add Personnel"
          onChange={handleSelectChange}
          maxMenuHeight={80}
          value={selectOptions.filter((option) =>
            selectedValues.includes(option.value)
          )}
        />
      );

}
export default BSelect;