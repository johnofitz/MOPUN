import { Formik } from "formik";
import * as Yup from "yup";
import './MopForm.css';

// Creating schema
const schema = Yup.object().shape({
  callSign: Yup.string().required("Call Sign Required"),
  patrolType: Yup.string().required("Patrol Reason Required"),
  patrolTime: Yup.object().shape({
    hours: Yup.number().integer().min(0).required("Hours Required"),
    minutes: Yup.number().integer().min(0).max(59).required("Minutes Required"),
  }),
  patrolDate: Yup.date().required("Date is required"),
  patrolStartPoint: Yup.string().required("Starting Location Required"),
  patrolEndPoint: Yup.string().required("Starting Location Required"),
  patrolMoto: Yup.string().required("Motorolla ID Required"),
  patrolMobile: Yup.string().required("Mobile Number Required"),
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
        }}
        onSubmit={(values) => {
          console.log(values.callSign);
          console.log(values.patrolType);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <div className="mop">
            <div className="mopForm">
              {/* Passing handleSubmit parameter tohtml form onSubmit property */}
              <form noValidate onSubmit={handleSubmit}>
                <div className="mop-heading">
                  <span>Patrol Form</span>
                  <img
                    src={require("../images/irishPoll.png")}
                    alt="profile-img"
                    className="profile-img-card"
                  />
                </div>
                {/* passing formik parameters like handleChange, values, handleBlur to input */}
                <input
                  type="text"
                  name="callSign"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.callSign}
                  placeholder="Enter Call Sign"
                  className="mopForm-control inp_text"
                  id="callSign"
                  // Update aria-label for accessibility
                  aria-label="callSign"
                  aria-describedby="callSign-error" // Update the aria-describedby if needed
                />
                {/* If validation is not passed show errors */}
                <p className="error">
                  {errors.callSign && touched.callSign && errors.callSign}
                </p>
                {/* passing formik parameters like handleChange, values, handleBlur to input */}
                <input
                  type="text"
                  name="patrolType"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.patrolType}
                  placeholder="Enter Patrol Type"
                  className="mopForm-control"
                />
                {/* If validation is not passed show errors */}
                <p className="error">
                  {errors.patrolType && touched.patrolType && errors.patrolType}
                </p>
                <button type="submit">mop</button>
              </form>
            </div>
          </div>
        )}
      </Formik>
    </>
  );
};
export default MopForm;
