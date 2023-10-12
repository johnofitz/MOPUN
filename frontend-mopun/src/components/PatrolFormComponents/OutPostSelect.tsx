import React, { useState } from 'react';
import Select from 'react-select';
import classes from './MopForm.module.css';

interface OutPostSelectProps {
  name: string;
  onUpdate: (value: string | null) => void; // Update the prop type to accept a single string or null
}

const OPoptions = [
  {
    value: "2-45",
    label: "2-45",
    key: "2-45", // Add a key property
  },
  {
    value: "6-52",
    label: "6-52",
    key: "6-52", // Add a key property
  },
  {
    value: "6-50",
    label: "6-50",
    key: "6-50", // Add a key property
  },
];

const OPSelect = (props: OutPostSelectProps) => {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  const handleSelectChange = (selectedOption: any) => {
    const selectedValue = selectedOption ? selectedOption.value : null;
    setSelectedValue(selectedValue);
    props.onUpdate(selectedValue);
  };

  // Convert the options array to the format expected by React Select
  const selectOptions = OPoptions.map((option) => ({
    value: option.value,
    label: option.label,
  }));

  return (
    <Select
      className={classes.select}
      name={props.name}
      options={selectOptions}
      placeholder="Select Outpost"
      onChange={handleSelectChange}
      maxMenuHeight={80}
      value={selectOptions.find((option) => option.value === selectedValue)}
    />
  );
};

export default OPSelect;
