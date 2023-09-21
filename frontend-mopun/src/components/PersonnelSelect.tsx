import { Select } from "antd";
import "./PostSelect.css";

interface PersonnelSelectProps {
  name: string;
  onUpdate: (value: string) => void;
}

const onSearch = (value: string) => {
  console.log("search:", value);
};

const PersonnelSelect = (props: PersonnelSelectProps) => {
  const options = [
    {
      key: "1",
      value: "HQ1",
      label: "HQ1",
      descrip: "Big dog",
    },
    {
      key: "2",
      value: "HQ2",
      label: "HQ2",
      descrip: "Person 1",
    },
    {
      key: "3",
      value: "B1",
      label: "B1",
      descrip: "Big Pol",
    },
    {
      key: "4",
      value: "B7",
      label: "B7",
      descrip: "Small Pol",
    },
    {
      key: "5",
      value: "A1",
      label: "A1",
      descrip: "Simple Jack",
    },
  ];

  return (
    <Select
      id="addPersonnel"
      mode="multiple"
      showSearch
      bordered
      style={{ width: "81%" }}
      placeholder="Add Personnel"
      optionFilterProp="children"
      onChange={(val) => props.onUpdate(val)}
      onSearch={onSearch}
    >
      {options.map((option) => (
        <Select.Option key={option.key} value={option.value}>
          {option.label} - {option.descrip}
        </Select.Option>
      ))}
    </Select>
  );
};

export default PersonnelSelect;
