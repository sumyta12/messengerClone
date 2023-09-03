import { ToastContainer } from "react-toastify";
import Loader from "../CssComponent/Loader";
import React, { useState } from "react";
import { auth } from "../dbCollection/FireBaseConfig";
import { sendPasswordResetEmail } from "firebase/auth";
import { Link } from "react-router-dom";

const ForgetPassword = () => {
  const [loading, setloading] = useState(false);

  const [FormData, setFormData] = React.useState({
    email: "",
    error: "",
  });

  function handlerChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
        error: "",
      };
    });
  }

  function handleSubmit(event) {
    setloading(true);
    event.preventDefault();
    if (FormData.email) {
      sendPasswordResetEmail(auth, FormData.email)
        .then(() => {
          setFormData((prev) => {
            return {
              ...prev,
              error: "Check your email",
            };
          });

          setTimeout(() => {
            setFormData((prev) => {
              return {
                ...prev,
                name: "",
                error: "",
              };
            });
          }, 2500);

          setloading(false);
        })
        .catch((error) => {
          const errorCode = error.code;
          setFormData((prev) => {
            return {
              ...prev,
              error:
                errorCode === "auth/user-not-found"
                  ? "This user is not registered"
                  : errorCode,
            };
          });

          setloading(false);
        });
    }
  }

  return (
    <div className="form-container">
      <ToastContainer />

      <form className="form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Write Your Email address"
          className="form--input"
          name="email"
          value={FormData.email}
          onChange={handlerChange}
          autoComplete="username"
        />

        {FormData.error && <p>{FormData.error}</p>}

        {!FormData.error && (
          <p className="p_link">
            <Link to="..">Go to Login Page?</Link>
          </p>
        )}

        {loading ? (
          <button className="form--submit login-button" disabled>
            <Loader />
          </button>
        ) : (
          <button className="form--submit login-button">Reset Password</button>
        )}
      </form>
    </div>
  );
};

export default ForgetPassword;
