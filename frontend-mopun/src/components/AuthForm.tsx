import { Field, Formik } from "formik";
import * as Yup from "yup";
import classes from "./AuthForm.module.css";
import { Form } from "react-router-dom";

const schema = Yup.object().shape({
  username: Yup.string().required("Username is a required field"),
  password: Yup.string().required("Password is a required field"),
});

const Auth = () => {
  return (
    <>
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        validationSchema={schema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ isSubmitting, touched, errors, handleBlur, handleChange }) => (
          <div className={classes.login}>
            <div className={classes.form}>
              <Form method="post">
                <div className={classes.heading}>
                  <img
                    src={require("../images/irishPoll.png")}
                    alt="profile-img"
                    className={classes.images}
                  />
                </div>

                <Field
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Username"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="form-control inp_text"
                />
                <p className={classes.error}>
                  {errors.username && touched.username && errors.username}
                </p>

                <Field
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="form-control"
                />
                <p className={classes.error}>
                  {errors.password && touched.password && errors.password}
                </p>

                <button
                  type="submit"
                  className={classes.logbutton}
                  disabled={
                    isSubmitting || !(touched.username && touched.password)
                  }
                >
                  Login
                </button>
              </Form>
            </div>
          </div>
        )}
      </Formik>
    </>
  );
};

export default Auth;
