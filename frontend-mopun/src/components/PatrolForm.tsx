import { Form } from "react-router-dom";
import useInput from "../hooks/input";
import classes from "./PatrolFormComponents/MopForm.module.css";
import DatePick from "./PatrolFormComponents/DatePick";
import { useEffect, useState } from "react";
import TimePick from "./PatrolFormComponents/TimePick";
import VSelect from "./PatrolFormComponents/VehicleSelect";
import BSelect from "./PatrolFormComponents/BunkerSelect";
import RadioButtons from "./PatrolFormComponents/RadioButtonComponent";
import OPSelect from "./PatrolFormComponents/OutPostSelect";

const PatrolForm = () => {
  // object destructuring to pull out the key values
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [dateError, setDateError] = useState<string>();

  const handleDateChange = (date: Date | null) => {
    // Replace this with your own validation logic
    if (!date) {
      setDateError("Please select a valid date.");
    } else {
      setDateError("");
    }
    setSelectedDate(date);
  };

  const {
    value: callsign,
    hasError: callSignHasError,
    isValid: callSignIsValid,
    inputChangeHandler: callSignChangeHandle,
    inputBlurHandler: callSignBlurHandle,
  } = useInput((value: any) => value.trim() !== "");

  const {
    value: patrolType,
    hasError: patrolTypeError,
    isValid: patrolTypeIsValid,
    inputChangeHandler: patrolTypeChangeHandle,
    inputBlurHandler: patrolTypeBlurHandle,
  } = useInput((value: any) => value.trim() !== "");

  const {
    value: patrolMobile,
    hasError: patrolMobileError,
    isValid: patrolMobileIsValid,
    inputChangeHandler: patrolMobileChangeHandle,
    inputBlurHandler: patrolMobileBlurHandle,
  } = useInput((value: any) => value.trim() !== "");

  const {
    value: patrolMoto,
    hasError: patrolMotoError,
    isValid: patrolMotoIsValid,
    inputChangeHandler: patrolMotoChangeHandle,
    inputBlurHandler: patrolMotoBlurHandle,
  } = useInput((value: any) => value.trim() !== "");

  const {
    value: selectedOption,
    hasError: selectedOptionError,
    isValid: selectedOptionIsValid,
    inputChangeHandler: selectedOptionChangeHandle,
    inputBlurHandler: selectedOptionBlurHandle,
  } = useInput((value: any) => value.trim() !== "");

  const { hasError: patrolTimeError } = useInput(
    (value: any) => value.trim() !== ""
  );

  const handleTimeChange = (time: string | null) => {
    console.log(time);
  };

  const handleVehicleSelectChange = (selectedValues: any) => {
    console.log(selectedValues);
  };

  const handlePersonSelectChange = (selectedValues: any) => {
    console.log(selectedValues);
  };

  // useState for overall form validation
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    if (
      callSignIsValid &&
      patrolMobileIsValid &&
      patrolMobileIsValid 
    ) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }, [
    callSignIsValid,
    patrolMobileIsValid,
    patrolMotoIsValid,
    patrolTypeIsValid,
  ]);

  return (
    <>
      <div className={classes.mop}>
        <div className={classes.mopForm}>
          <Form method="post">
            <div className={classes.heading}>
              <img
                src={require("../images/irishPoll.png")}
                alt="profile-img"
                className={classes.images}
              />
              <h1>Patrol Form</h1>
            </div>

            <input
              type="text"
              id="callSign"
              name="callSign"
              placeholder="Enter Call Sign"
              className="form-control inp_text"
              onChange={callSignChangeHandle}
              onBlur={callSignBlurHandle}
              value={callsign}
            />
            {callSignHasError && (
              <p className={classes.error}>Please enter a valid Call Sign.</p>
            )}

            <input
              type="text"
              id="patrolType"
              name="patrolType"
              placeholder="Enter Patrol Type"
              className="form-control inp_text"
              onChange={patrolTypeChangeHandle}
              onBlur={patrolTypeBlurHandle}
              value={patrolType}
            />

            {patrolTypeError && (
              <p className={classes.error}>Please enter a valid Patrol.</p>
            )}

            <input
              type="text"
              id="patrolMobile"
              name="patrolMobile"
              placeholder="Enter Mobile No"
              className="form-control inp_text"
              onChange={patrolMobileChangeHandle}
              onBlur={patrolMobileBlurHandle}
              value={patrolMobile}
            />
            {patrolMobileError && (
              <p className={classes.error}>Please enter a valid Mobile.</p>
            )}

            <input
              type="text"
              id="patrolMoto"
              name="patrolMoto"
              placeholder="Enter Motorolla Id"
              className="form-control inp_text"
              onChange={patrolMotoChangeHandle}
              onBlur={patrolMotoBlurHandle}
              value={patrolMoto}
            />
            {patrolMotoError && (
              <p className={classes.error}>Please enter a Motorolla Id.</p>
            )}

            <DatePick value={selectedDate} onChange={handleDateChange} />
            {dateError && <p className={classes.error}>{dateError}</p>}
            
            <div className={classes.timeContainer}>
              <TimePick
                name={"startTime"}
                onChange={handleTimeChange}
                holder={"Start Time"}
              />
              <TimePick
                name={"endTime"}
                onChange={handleTimeChange}
                holder={"End Time"}
              />

              {patrolTimeError && (
                <p className={classes.error}>Please enter a valid date.</p>
              )}
            </div>
            <OPSelect
              name={"postSelect"}
              onUpdate={handleVehicleSelectChange}
            />
            <VSelect
              name={"vehicleSelect"}
              onUpdate={handleVehicleSelectChange}
            />

            <BSelect
              name={"personnelSelect"}
              onUpdate={handlePersonSelectChange}
            />

            <RadioButtons
              name="selectedOption"
              value={selectedOption}
              onChange={selectedOptionChangeHandle}
              onBlur={selectedOptionBlurHandle}
            />
            {selectedOptionError && (
              <p className={classes.error}>Please select option.</p>
            )}

            <button
              disabled={!formIsValid}
              type="submit"
              className={classes.mopbutton}
            >
              {formIsValid ? (
                <>Submit Mop</>
              ) : (
                <>
                  <i className="fas fa-ban"></i> Disabled
                </>
              )}
            </button>
          </Form>
        </div>
      </div>
    </>
  );
};
export default PatrolForm;
