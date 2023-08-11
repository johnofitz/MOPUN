import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import AuthService from "../services/AuthService";

const Login = (props: any) => {
  const [redirect, setRedirect] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const initialValues = {
    username: "",
    password: "",
  };

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();

    if (currentUser) {
      const userRoles = currentUser.roles; // Assuming roles is an array of roles

      if (userRoles.includes("admin")) {
        setRedirect("/admin");
      } else if (userRoles.includes("user")) {
        setRedirect("/profile");
      }
    }
  }, []);

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("This field is required!"),
    password: Yup.string().required("This field is required!"),
  });

  const handleLogin = async (formValues: any) => {
    const { username, password } = formValues;

    setMessage("");
    setLoading(true);

    try {
      await AuthService.login(username, password);

      const currentUser = AuthService.getCurrentUser();
      if (currentUser && currentUser.roles) {
        const userRoles = currentUser.roles;

        if (userRoles.includes("admin")) {
          setRedirect("/admin");
        } else if (userRoles.includes("user")) {
          setRedirect("/profile");
        }
      }
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setMessage(error.response.data.message);
      } else {
        setMessage(error.message || error.toString());
      }
    } finally {
      setLoading(false);
    }
  };

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src={require("../test/irishPoll.png")}
          alt="profile-img"
          className="profile-img-card"
        />

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          <Form>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <Field name="username" type="text" className="form-control" />
              <ErrorMessage
                name="username"
                component="div"
                className="alert alert-danger"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field name="password" type="password" className="form-control" />
              <ErrorMessage
                name="password"
                component="div"
                className="alert alert-danger"
              />
            </div>

            <div className="form-group">
              <button
                type="submit"
                className="btn btn-primary btn-block"
                disabled={loading}
              >
                {loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Login</span>
              </button>
            </div>

            {message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {message}
                </div>
              </div>
            )}
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Login;
