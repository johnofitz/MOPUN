import { Formik } from "formik";
import * as Yup from "yup";
import classes from "./AuthForm.module.css";
import { useNavigate } from "react-router-dom";
import { action } from "../pages/LoginPage";
// Creating schema
const schema = Yup.object().shape({
  username: Yup.string().required("Username is a required field"),
  password: Yup.string().required("Password is a required field"),
});

const Auth = () => {
  const navigate = useNavigate();
  

  return (
    <>
      {/* Wrapping form inside formik tag and passing our schema to validationSchema prop */}
    
      <Formik
        validationSchema={schema}
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values) => {
          console.log(values.username);
         
          const response =await action(values.username, values.password);
          //if(response?.ok)
          navigate("/mop");
          
        
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
        
          <div className={classes.login}>
            <div className={classes.form}>
              {/* Passing handleSubmit parameter to html form onSubmit property */}
              <form noValidate onSubmit={handleSubmit}>
                <div className={classes.heading}>
                  <img
                    src={require("../images/irishPoll.png")}
                    alt="profile-img"
                    className={classes.images}
                  />
                </div>
                {/* passing formik parameters like handleChange, values, handleBlur to input */}
                <input
                  type="text"
                  name="username"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                  placeholder="Username"
                  className="form-control inp_text"
                  id="username"
                  // Update aria-label for accessibility
                  aria-label="Username"
                  aria-describedby="username-error" // Update the aria-describedby if needed
                />
                {/* If validation is not passed show errors */}
                <p className={classes.error}>
                  {errors.username && touched.username && errors.username}
                </p>
                {/* passing formik parameters like handleChange, values, handleBlur to input */}
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  placeholder="Password"
                  className="form-control"
                />
                {/* If validation is not passed show errors */}
                <p className={classes.error}>
                  {errors.password && touched.password && errors.password}
                </p>
                <button type="submit" className={classes.logbutton}
                >
                  Login
                </button>
              </form>
            </div>
          </div>
         
        )}
       
      </Formik>
     
    </>
  );
};
export default Auth;
