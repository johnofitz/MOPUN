import { Formik } from "formik";
import * as Yup from "yup";
import classes from "./MopForm.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
  // patrolStartPoint: Yup.string().required("Starting Location Required"),
  // patrolEndPoint: Yup.string().required("Starting Location Required"),
  // patrolMoto: Yup.string().required("Motorolla ID Required"),
  patrolMobile: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Phone Number required"),
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
          patrolMobile: "",
          patrolDate: null,
          selectedOption: "",
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
        }) => (
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
                  {errors.patrolType && touched.patrolType && errors.patrolType}
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

                <DatePicker
                  id="patrolDate"
                  selected={values.patrolDate}
                  onChange={(date) => setFieldValue("patrolDate", date)}
                  onBlur={handleBlur}
                  placeholderText="Patrol Date"
                  withPortal
                  dateFormat='dd/MM/yyyy'
                  className="form-control inp_text datepicker"
                />
                <p className={classes.error}>
                  {errors.patrolDate && touched.patrolDate && errors.patrolDate}
                </p>

                <div className={classes.radioContainer}>
                  <div className={classes.radioItem}>
                    <label>
                      <input
                        type="radio"
                        name="selectedOption"
                        value="Independant"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        checked={values.selectedOption === "Independant"}
                      />
                      Independant
                    </label>
                  </div>
                  <div className={classes.radioItem}>
                    <label>
                      <input
                        type="radio"
                        name="selectedOption"
                        value="L.A.F"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        checked={values.selectedOption === "L.A.F"}
                      />
                      L.A.F
                    </label>
                  </div>
                  <div className={classes.radioItem}>
                    <label>
                      <input
                        type="radio"
                        name="selectedOption"
                        value="RHIA"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        checked={values.selectedOption === "RHIA"}
                      />
                      RHIA
                    </label>
                  </div>
                  <p className={classes.error}>
                    {errors.selectedOption &&
                      touched.selectedOption &&
                      errors.selectedOption}
                  </p>
                </div>
                <button type="submit" className={classes.mopbutton}>
                  Submit Mop
                </button>
              </form>
            </div>
          </div>
        )}
      </Formik>
    </>
  );
};
export default MopForm;
