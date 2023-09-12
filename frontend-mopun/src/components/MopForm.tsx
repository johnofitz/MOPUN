import { Formik } from "formik";
import * as Yup from "yup";
import classes from "./MopForm.module.css";
import DatePick from "./DatePick";
import RadioButtons from "./RadioButtonComponent";
import TimePick from "./TimePick";
import PostSelect from "./PostSelect";
import { useState } from "react";


const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
// Creating schema
const schema = Yup.object().shape({
  callSign: Yup.string().required("Call Sign Required"),
  patrolType: Yup.string().required("Patrol Reason Required"),
  selectedOption: Yup.string().required("Please select an option"),
  patrolDate: Yup.date()
    .default(() => new Date()) // Set the default value to the current date
    .required("Date is required"),
  patrolMobile: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Phone Number required"),
  startTimes: Yup.string().required("Start Time are required"),
  endTimes: Yup.string().required("End Time are required"),
  // patrolStartPoint: Yup.string().required("Starting Location Required"),
  // patrolMoto: Yup.string().required("Motorolla ID Required"),
});


const MopForm = () => {
  const [selectedOutpost, setSelectedOutpost] = useState<string>("")

  return (
    <>
      {/* Wrapping form inside formik tag and passing our schema to validationSchema prop */}
      <Formik
        validationSchema={schema}
        initialValues={{
          callSign: "",
          patrolType: "",
          patrolMobile: "",
          patrolDate: null,
          selectedOption: "",
          endTimes: null,
          startTimes: null,
          selectedOutpost:"",
          // patrolStartPoint: "",
        }}
        onSubmit={(values) => {
          console.log("Form submitted with values:", values); // Add this line
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
        }) => {
          return (
            <div className={classes.mop}>
              <div className={classes.mopForm}>
                <form noValidate onSubmit={handleSubmit}>
                  <div className={classes.heading}>
                    <img
                      src={require("../images/irishPoll.png")}
                      alt="profile-img"
                      className={classes.images}
                    />
                    <h1>Patrol Form</h1>
                  </div>
                  {/* passing formik parameters like handleChange, values, handleBlur to input */}
                  <input
                    id="callSign"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.callSign}
                    placeholder="Call Sign"
                    className="form-control inp_text"
                  />
                  {/* If validation is not passed show errors */}
                  <p className={classes.error}>
                    {errors.callSign && touched.callSign && errors.callSign}
                  </p>
                  <input
                    id="patrolType"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.patrolType}
                    placeholder="Patrol Type"
                    className="form-control inp_text"
                  />
                  <p className={classes.error}>
                    {errors.patrolType &&
                      touched.patrolType &&
                      errors.patrolType}
                  </p>

                  <input
                    id="patrolMobile"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.patrolMobile}
                    placeholder="Mobile Number"
                    className="form-control inp_text"
                  />

                  <p className={classes.error}>
                    {errors.patrolMobile &&
                      touched.patrolMobile &&
                      errors.patrolMobile}
                  </p>

                  <DatePick
                    name="patrolDate"
                    value={values.patrolDate}
                    onChange={(date) => setFieldValue("patrolDate", date)}
                    onBlur={handleBlur}
                  />
                  <p className={classes.error}>
                    {errors.patrolDate &&
                      touched.patrolDate &&
                      errors.patrolDate}
                  </p>
                  <div className={classes.timeContainer}>
                    <TimePick
                      name={"startTimes"}
                      value={values.startTimes}
                      onChange={(time) => setFieldValue("startTimes", time)}
                      onBlur={handleBlur}
                      holder={"Start Time"}
                    />
                    <TimePick
                      name={"endTimes"}
                      value={values.endTimes}
                      onChange={(time) => setFieldValue("endTimes", time)}
                      onBlur={handleBlur}
                      holder="End Time"
                    />
                  </div>
                  <p className={classes.error}>
                    {errors.startTimes &&
                      touched.startTimes &&
                      errors.startTimes}
                  </p>
                  <p className={classes.error}>
                    {errors.endTimes && touched.endTimes && errors.endTimes}
                  </p>

                  <PostSelect selectedValue={selectedOutpost} onChange={setSelectedOutpost} />
                  {/* <p className={classes.error}>
                    {errors.patrolStartPoint &&
                      touched.patrolStartPoint &&
                      errors.patrolStartPoint}
                  </p> */}
                  <RadioButtons
                    name="selectedOption"
                    value={values.selectedOption}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <p className={classes.error}>
                    {errors.selectedOption &&
                      touched.selectedOption &&
                      errors.selectedOption}
                  </p>
                  <button type="submit" className={classes.mopbutton}>
                    Submit Mop
                  </button>
                </form>
              </div>
            </div>
          );
        }}
      </Formik>
    </>
  );
};
export default MopForm;
