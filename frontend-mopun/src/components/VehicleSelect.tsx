import { Select } from "antd";
import "./PostSelect.css";

interface VehicleSelectProps {
  name: string;
  onUpdate: (value: string) => void;
}

const onSearch = (value: string) => {
  console.log("search:", value);
};

const VehicleSelect = (props: VehicleSelectProps) => {
  const options = [
    {
      key: "1",
      value: "12345",
      label: "12345 - Water Truck",
    },
    {
      key: "2",
      value: "34567",
      label: "34567 - Toyota",
    },
    {
      key: "3",
      value: "45678",
      label: "45678 - Ford",
    },
  ];
  

  return (
    <Select
      id="patrolVehicle"
      mode="multiple"
      showSearch
      bordered
      style={{ width: "81%" }}
      placeholder="Enter Registration"
      optionFilterProp="children"
      onChange={(val) => props.onUpdate(val)}
      onSearch={onSearch}
    >
      {options.map((option) => (
        <Select.Option key={option.key} value={option.value}>
          {option.label} 
        </Select.Option>
      ))}
    </Select>
  );
};

export default VehicleSelect;
