import React, { ChangeEvent } from "react";
import classes from "./MopForm.module.css";

interface RadioButtonsProps {
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<any, Element> | null) => void;
}

const RadioButtons: React.FC<RadioButtonsProps> = (props) => {
  return (
    <div className={classes.radioContainer}>
      <div className={classes.radioItem}>
        <label>
          <input
            id={props.name}
            type="radio"
            name={props.name}
            value="Independant"
            onChange={props.onChange}
            onBlur={props.onBlur}
            checked={props.value === "Independant"}
          />
          Independant
        </label>
      </div>
      <div className={classes.radioItem}>
        <label>
          <input
            type="radio"
            name={props.name}
            value="L.A.F"
            onChange={props.onChange}
            onBlur={props.onBlur}
            checked={props.value === "L.A.F"}
          />
          L.A.F
        </label>
      </div>
      <div className={classes.radioItem}>
        <label>
          <input
            type="radio"
            name={props.name}
            value="RHIA"
            onChange={props.onChange}
            onBlur={props.onBlur}
            checked={props.value === "RHIA"}
          />
          RHIA
        </label>
      </div>
    </div>
  );
};

export default RadioButtons;
