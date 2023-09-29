import { Form, Formik } from "formik";
import * as Yup from "yup";
import classes from "./MopForm.module.css";
import DatePick from "./DatePick";
import RadioButtons from "./RadioButtonComponent";
import TimePick from "./TimePick";
import PostSelect from "./PostSelect";
import VehicleSelect from "./VehicleSelect";
import PersonnelSelect from "./PersonnelSelect";
import { redirect } from "react-router-dom";


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
  patrolMoto: Yup.string().required("Motorolla ID Required"),
  patrolStartPoint: Yup.string().required("Starting Location Required"),
  patrolVehicle: Yup.array().required("Vehicle Registration Required"),
  addPersonnel: Yup.array().required("Bunker Numbers Are Required"),
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
          endTimes: null,
          startTimes: null,
          patrolStartPoint: "",
          patrolMoto: "",
          patrolVehicle:[],
          addPersonnel: []
        }}
        onSubmit={async (values,  { resetForm ,setFieldValue}) => {
          const API_URL = "https://localhost:7056/api/Trip/AddTrip";
          console.log(values);
          try {
            const response = await fetch(API_URL, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(values),
            });
        
            if (response.status === 422 || response.status === 402) {
              // Handle validation error
              console.error("Validation error");
            } else if (!response.ok) {
              // Handle server error
              console.error("Server error");
            } else {
              // Request was successful, you can handle the success case here
              console.log("Request successful");
            }
          } catch (error) {
            // Handle any other errors that may occur during the request
            console.error("An error occurred:", error);
          }
          resetForm();
          // setFieldValue("patrolDate", null);
          // setFieldValue("startTimes", null);
          // setFieldValue("endTimes", null);
          // setFieldValue("addPersonnel", []);
          // setFieldValue("patrolVehicle", []);
          // setIsSubmitted(true);
          // setRedirectPath("/toc")
          //redirect("/toc")
        
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
                <Form noValidate onSubmit={handleSubmit}>
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
                    name="callSign"
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
                    name="patrolType"
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
                    name="patrolMobile"
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

                  <input
                    id="patrolMoto"
                    type="text"
                    name="patrolMoto"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.patrolMoto}
                    placeholder="Motorolla ID"
                    className="form-control inp_text"
                  />

                  <p className={classes.error}>
                    {errors.patrolMoto &&
                      touched.patrolMoto &&
                      errors.patrolMoto}
                  </p>

                  <DatePick
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
                      name="startTimes"
                      value={values.startTimes}
                      onChange={(time) => setFieldValue("startTimes", time)}
                      onBlur={handleBlur}
                      holder={"Start Time"}
                    />
                   
                    <TimePick
                      name="endTimes"
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
                  <div className={classes.postselect}>
                   
                  <PostSelect  
                    name={"patrolStartPoint"}
                    onUpdate={(val) => setFieldValue("patrolStartPoint", val)}
                  />
                  <p className={classes.error}>
                    {errors.patrolStartPoint &&
                      touched.patrolStartPoint &&
                      errors.patrolStartPoint}
                  </p>
                  </div>
                  <div className={classes.postselect}>
                   
                   
                  <VehicleSelect
                    name={"patrolVehicle"}
                    onUpdate={(val) => setFieldValue("patrolVehicle", val)}
                  />
                   
                  <p className={classes.error}>
                    {errors.patrolVehicle &&
                      touched.patrolVehicle &&
                      errors.patrolVehicle}
                  </p>
                  </div>
                  <div className={classes.postselect}>
                  <PersonnelSelect
                    onUpdate={(val) => setFieldValue("addPersonnel", val)}
                  />
                  <p className={classes.error}>
                    {errors.addPersonnel &&
                      touched.addPersonnel &&
                      errors.addPersonnel}
                  </p>
                 </div>
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
                </Form>
              </div>
            </div>
          );
        }}
      </Formik>
    </>
  );
};
export default MopForm;
