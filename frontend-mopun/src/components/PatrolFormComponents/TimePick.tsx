import React from "react";
import { TimePicker } from "antd";
import classes from "./MopForm.module.css";
import dayjs from "dayjs"; 

interface CustomTimeProps {
  name: string;
  //value: dayjs.Dayjs | null;
  onChange: (time: string | null) => void;
  //onBlur: (e: React.FocusEvent<HTMLInputElement> | null) => void;
  holder: string;
}

const TimePick: React.FC<CustomTimeProps> = (props) => {

  return (
    
    <TimePicker
      id={props.name}
      className={classes.timePicker}
      onChange={(time) => props.onChange(time ? dayjs(time).format("HH:mm") : null)} 
      //onBlur={props.onBlur}
      format="HH:mm"
      minuteStep={15}
      placeholder={props.holder}
      name={props.name}
      //value={props.value}
    />
  );
};

export default TimePick;
