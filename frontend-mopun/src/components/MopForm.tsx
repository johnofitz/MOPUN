import { Formik } from "formik";
import * as Yup from "yup";
import classes from "./MopForm.module.css";
import "react-datepicker/dist/react-datepicker.css";
import CustomDatePicker from "./DatePicker";
// Creating schema
const schema = Yup.object().shape({
  callSign: Yup.string().required("Call Sign Required"),
  patrolType: Yup.string().required("Patrol Reason Required"),
  // patrolTime: Yup.object().shape({
  //   hours: Yup.number().integer().min(0).required("Hours Required"),
  //   minutes: Yup.number().integer().min(0).max(59).required("Minutes Required"),
  // }),
  patrolDate: Yup.date().required("Date is required"),
  // patrolStartPoint: Yup.string().required("Starting Location Required"),
  // patrolEndPoint: Yup.string().required("Starting Location Required"),
  // patrolMoto: Yup.string().required("Motorolla ID Required"),
  // patrolMobile: Yup.string().required("Mobile Number Required"),
});

const MopForm = () => {
  return (
    <>
      {/* Wrapping form inside formik tag and passing our schema to validationSchema prop */}
      <Formik
        validationSchema={schema}
        initialValues={{
          callSign: "",
          patrolType: "",
          patrolStartPoint: "",
          patrolEndPoint: "",
          patrolMoto: "",
          patrolMobile: "",
          patrolDate: null, // Initialize patrolDate with null or a valid date
        }}
        onSubmit={(values) => {
          console.log(values);
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
        }) => (
          <div className={classes.mop}>
            <div className={classes.mopForm}>
              {/* Passing handleSubmit parameter tohtml form onSubmit property */}
              <form noValidate onSubmit={handleSubmit}>
                <div className={classes.heading}>
                  <img
                    src={require("../images/irishPoll.png")}
                    alt="profile-img"
                    className={classes.images}
                  />
                  <span>Patrol Form</span>
                </div>
                {/* passing formik parameters like handleChange, values, handleBlur to input */}
                <input
                  type="text"
                  name="callSign"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.callSign}
                  placeholder="Call Sign"
                  className="form-control inp_text"
                  id="callSign"
                  // Update aria-label for accessibility
                  aria-label="callSign"
                  aria-describedby="callSign-error" // Update the aria-describedby if needed
                />
                {/* If validation is not passed show errors */}
                <p className={classes.error}>
                  {errors.callSign && touched.callSign && errors.callSign}
                </p>
                {/* passing formik parameters like handleChange, values, handleBlur to input */}
                <input
                  type="text"
                  name="patrolType"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.patrolType}
                  placeholder="Patrol Type"
                  className="form-control inp_text"
                  id="patrolType"
                />
                {/* If validation is not passed show errors */}
                <p className={classes.error}>
                  {errors.patrolType && touched.patrolType && errors.patrolType}
                </p>

                <CustomDatePicker
                name="patrolDate"
                placeholderText="Select Date"
                selected={values.patrolDate}
                onChange={(date) => {
                  setFieldValue("patrolDate", date);
                }}
                onBlur={handleBlur}
              />
                {/* If validation is not passed show errors */}
                <p className={classes.error}>
                  {errors.patrolDate && touched.patrolDate && errors.patrolDate}
                </p>

                <button type="submit" className={classes.mopbutton}>Submit Mop</button>
              </form>
            </div>
          </div>
        )}
      </Formik>
    </>
  );
};
export default MopForm;
