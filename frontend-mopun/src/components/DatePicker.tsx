import React from "react";
import DatePicker, { ReactDatePickerProps } from "react-datepicker";
import './DatePicker.css'
interface CustomDatePickerProps extends ReactDatePickerProps {
  name: string;
  placeholderText: string;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  name,
  placeholderText,
  ...rest
}) => {
  return (
    <DatePicker className="react-calendar"
      name={name}
      placeholderText={placeholderText}
      {...rest}
      dateFormat="dd/MM/yyyy" // You can adjust the date format as needed
      
    />
  );
};

export default CustomDatePicker;
