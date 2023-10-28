import { useEffect, useState } from "react";
import classes from "./AuthForm.module.css";
import { Form, useActionData } from "react-router-dom";
import useInput from "../../hooks/input";
import { FaUserAlt, FaEye, FaEyeSlash } from "react-icons/fa";

interface Data {
  errorType?: string;
  message?: string;
  // Add other properties as needed
}


const Auth = () => {
  const data = useActionData() as Data;

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // object destructuring to pull out the key values
  const {
    value: enteredUser,
    hasError: inputHasError,
    isValid: userIsValid,
    inputChangeHandler: userChangeHandle,
    inputBlurHandler: userBlurHandle,
  } = useInput((value: any) => value.trim() !== "");

  const {
    value: enteredPassword,
    hasError: passwordError,
    isValid: passwordValid,
    inputChangeHandler: passwordChangeHandle,
    inputBlurHandler: passwordBlurHandle,
  } = useInput((value: any) => value.trim() !== "");

  // useState for overall form validation
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    if (userIsValid && passwordValid) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }, [userIsValid, passwordValid]);

  return (
    <>
      <Form method="post">
        <div className={classes.login}>
          <div className={classes.form}>
            <div className={classes.formInputs}>
              <div className={classes.wrapper}>
                <FaUserAlt className={classes.icon}></FaUserAlt>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Username"
                  className="form-control inp_text"
                  onChange={userChangeHandle}
                  onBlur={userBlurHandle}
                  value={enteredUser}
                />
              </div>
              {inputHasError && (
                <p className={classes.error}>Please enter a valid name.</p>
              )}
               {data?.errorType === "Username" && (
                <p className={classes.error}>{data.message}</p>
              )}
              <div className={classes.wrapper}>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Password"
                  className="form-control"
                  onChange={passwordChangeHandle}
                  onBlur={passwordBlurHandle}
                  value={enteredPassword}
                />
                <span
                  className="password-toggle"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <FaEye className={classes.icon} />
                  ) : (
                    <FaEyeSlash className={classes.icon} />
                  )}
                </span>
              </div>
              {passwordError && (
                <p className={classes.error}>Please enter a valid Password</p>
              )}
              {data?.errorType === "Password" && (
                <p className={classes.error}>{data.message}</p>
              )}
              {/* {data?.errors && (
                <ul>
                  {Object.keys(data.errors).map((err) => (
                    <li key={err}>{err}</li>
                  ))}
                </ul>
              )} */}

              <div className={classes.buttoncontain}>
                <div className="form-actions">
                  <button
                    type="submit"
                    className={classes.logbutton}
                    disabled={!formIsValid}
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>
            <div className={classes.images}>
              <img
                src={require("../../images/irishPoll.png")}
                alt="profile-img"
                className={classes.images}
              />
            </div>
          </div>
        </div>
      </Form>
    </>
  );
};

export default Auth;
