import { Select, SelectProps } from "antd";

const options: SelectProps['options'] = [];

options.push({ label: '2-45', value: '2-45' });
options.push({ label: '6-52', value: '6-52' });

const handleChange = (value: string[]) => {
    console.log(`selected ${value}`);
  };

const SelectPick =()=>{

    return(
        <Select
        mode="multiple"
        allowClear
        style={{ width: '100%' }}
        placeholder="Please select"
        onChange={handleChange}
        options={options}
      />
    )
}

export default SelectPick;