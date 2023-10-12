import { useState, useEffect } from "react";
import Select from "react-select"
import { fetchData } from "../../hooks/Grequest";
import classes from './MopForm.module.css'


interface VehicleSelectProps {
  name: string;
  onUpdate: (values: string[]) => void; // Update the prop type to accept an array
}

type Vehicle = {
  registration: number;
  make: string;
  model: string;
};

const VSelect = (props: VehicleSelectProps) => {
  const [options, setOptions] = useState<Vehicle[]>([]);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  useEffect(() => {
    const fetchDataAndSetOptions = async () => {
      try {
        const data = await fetchData("https://localhost:7056/api/Vehicles");
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
    value: option.registration.toString(),
    label: `${option.registration} ${option.model}`,
  }));

  return (
    <Select 

      className={classes.select} 
      isMulti
      name={props.name}
      options={selectOptions}
      placeholder="Enter Registration"
      onChange={handleSelectChange}
      maxMenuHeight={80}
      value={selectOptions.filter((option) =>
        selectedValues.includes(option.value)
      )}
    />
  );
};

export default VSelect;
