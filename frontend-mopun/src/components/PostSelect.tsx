import { Select } from "antd";
import './PostSelect.css';

interface PostSelectProps {
  selectedValue: string;
  onChange: (value: string) => void;
}
const onChange = (value: string) => {
  console.log(`selected ${value}`);
};

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
    showSearch
    bordered
    allowClear
    style={{ width: '81%'}}
    placeholder="Select Outpost"
    optionFilterProp="children"
    onChange={onChange}
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
