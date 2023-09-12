import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface CustomDateProps{ 
    name: string;
    value: Date | null;
    onChange: (date: Date | null) => void;
    onBlur: (e: React.FocusEvent<any, Element> | null) => void;
}
const CustomeDatePicker  = (props: CustomDateProps) =>{
    return(
        <DatePicker
        id="patrolDate"
        selected={props.value}
        onChange={(date) => props.onChange(date)}
        onBlur={props.onBlur}
        placeholderText="Patrol Date"
        withPortal
        dateFormat='dd/MM/yyyy'
        className="form-control inp_text datepicker"
      />
    )
}
export default CustomeDatePicker;