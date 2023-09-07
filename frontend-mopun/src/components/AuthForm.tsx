import { Formik } from "formik";
import * as Yup from "yup";
import "./AuthForm.css";
// Creating schema
const schema = Yup.object().shape({
  user: Yup.string().required("Username is a required field"),
  // .email("Invalid email format"),
  password: Yup.string()
    .required("Password is a required field")
    .min(8, "Password must be at least 8 characters"),
});

const Auth = () => {
  return (
    <>
      {/* Wrapping form inside formik tag and passing our schema to validationSchema prop */}
      <Formik
        validationSchema={schema}
        initialValues={{ user: "", password: "" }}
        onSubmit={(values) => {
          // Alert the input values of the form that we filled
          // alert(JSON.stringify(values));
          console.log(values.user);
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
          <div className="login">
            <div className="form">
              {/* Passing handleSubmit parameter tohtml form onSubmit property */}
              <form noValidate onSubmit={handleSubmit}>
                <div className="login-heading">
                  <span>Login</span>
                  <img
                    src={require("../images/irishPoll.png")}
                    alt="profile-img"
                    className="profile-img-card"
                  />
                </div>
                {/* passing formik parameters like handleChange, values, handleBlur to input */}
                <input
                  type="text" 
                  name="user" 
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.user} 
                  placeholder="Enter Username" 
                  className="form-control inp_text"
                  id="user" 
                  // Update aria-label for accessibility
                  aria-label="Username"
                  aria-describedby="username-error" // Update the aria-describedby if needed
                />
                {/* If validation is not passed show errors */}
                <p className="error">
                  {errors.user && touched.user && errors.user}
                </p>
                {/* passing formik parameters like handleChange, values, handleBlur to input */}
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  placeholder="Enter password"
                  className="form-control"
                />
                {/* If validation is not passed show errors */}
                <p className="error">
                  {errors.password && touched.password && errors.password}
                </p>
                <button type="submit">Login</button>
              </form>
            </div>
          </div>
        )}
      </Formik>
    </>
  );
};
export default Auth;
