import { Select } from "antd";
import './PostSelect.css';

interface PostSelectProps {
  name: string;
  onUpdate: (value: string) => void;
}


const onSearch = (value: string) => {
  console.log("search:", value);
};

const PostSelect = (props: PostSelectProps) => {
  const options = [
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

  return (
    <Select
  
    id="patrolStartPoint"
    showSearch
    bordered
    allowClear
    style={{ width: '81%'}}
    placeholder="Select Outpost"
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

export default PostSelect;
